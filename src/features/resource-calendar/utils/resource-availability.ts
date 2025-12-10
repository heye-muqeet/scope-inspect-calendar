import type dayjs from '@/lib/configs/dayjs-config'
import dayjsInstance from '@/lib/configs/dayjs-config'
import type { BlockedSlot, TimeOff, AvailableSlots } from '@/features/calendar/types'
import { safeDate } from '@/lib'
import { RRule } from 'rrule'
import type { RRuleOptions } from '@/features/recurrence/types'
import { isTimeAvailable, isDayAvailable } from './available-slots-transformer'

/**
 * Options for checking if a time slot is available for a team member
 */
export interface IsResourceAvailableOptions {
  /** The date to check */
  date: dayjs.Dayjs
  /** The hour to check (0-23) */
  hour?: number
  /** The minute to check (0-59) */
  minute?: number
  /** Blocked slots for the team member (e.g., meetings, breaks) */
  blockedSlots?: BlockedSlot[]
  /** Business hours configuration (used as fallback) */
  businessHours?: {
    daysOfWeek?: string[]
    startTime?: number
    endTime?: number
  }
}

/**
 * Checks if a specific time slot is blocked for a team member.
 * Blocked slots override business hours (e.g., scheduled meetings, breaks, training).
 * Supports both one-time and recurring blocked slots.
 *
 * @param options The options for checking availability
 * @returns true if the slot is blocked (unavailable), false if available
 */
export const isBlockedSlot = ({
  date,
  hour,
  minute = 0,
  blockedSlots,
}: IsResourceAvailableOptions): boolean => {
  if (!blockedSlots || blockedSlots.length === 0) {
    return false
  }

  const checkTime = hour !== undefined
    ? date.hour(hour).minute(minute).second(0).millisecond(0)
    : date.startOf('day')

  // Check if the time falls within any blocked slot
  for (const block of blockedSlots) {
    const blockStart = safeDate(block.start).startOf('minute')
    const blockEnd = safeDate(block.end).startOf('minute')
    const blockDuration = blockEnd.diff(blockStart)

    // Handle recurring blocked slots
    if (block.rrule) {
      try {
        const ruleOptions: RRuleOptions = {
          ...block.rrule,
          dtstart: block.rrule.dtstart || blockStart.toDate(),
        }
        const rule = new RRule(ruleOptions)

        // Calculate a reasonable range to check for recurring occurrences
        // Check from 30 days before to 30 days after the check time
        const searchStart = checkTime.subtract(30, 'days').toDate()
        const searchEnd = checkTime.add(30, 'days').toDate()

        // Get all occurrences in the search range
        const occurrences = rule.between(searchStart, searchEnd, true)

        // Check if checkTime falls within any recurring occurrence
        for (const occurrence of occurrences) {
          // Skip if this occurrence is in exdates
          if (block.exdates && block.exdates.includes(occurrence.toISOString())) {
            continue
          }

          const occurrenceStart = dayjsInstance(occurrence)
          const occurrenceEnd = occurrenceStart.add(blockDuration, 'millisecond')

          if (hour === undefined) {
            // Day-level check
            if (
              checkTime.isSameOrAfter(occurrenceStart, 'day') &&
              checkTime.isSameOrBefore(occurrenceEnd, 'day')
            ) {
              return true
            }
          } else {
            // Time-level check
            if (checkTime.isSameOrAfter(occurrenceStart) && checkTime.isBefore(occurrenceEnd)) {
              return true
            }
          }
        }
      } catch {
        // If RRULE parsing fails, fall back to one-time check
        
      }
    }

    // Handle one-time blocked slots (or fallback for recurring if rrule fails)
    if (!block.rrule) {
      // For day-level checks (no hour), check if the entire day overlaps
      if (hour === undefined) {
        if (
          checkTime.isSameOrAfter(blockStart, 'day') &&
          checkTime.isSameOrBefore(blockEnd, 'day')
        ) {
          return true
        }
      } else {
        // For time-level checks, check if the time falls within the block
        if (checkTime.isSameOrAfter(blockStart) && checkTime.isBefore(blockEnd)) {
          return true
        }
      }
    }
  }

  return false
}

/**
 * Options for checking team member availability including time-offs
 */
export interface IsResourceAvailableWithTimeOffOptions
  extends IsResourceAvailableOptions {
  /** Time-off requests for the team member (vacation, sick leave, etc.) */
  timeOffs?: {
    start: dayjs.Dayjs | Date | string
    end: dayjs.Dayjs | Date | string
    status: 'pending' | 'approved' | 'rejected'
  }[]
  /** Available slots configuration (inverted logic: only defined slots are available) */
  availableSlots?: AvailableSlots
}

/**
 * Checks if a team member is available at a specific time.
 * Blocked slots and time-offs (pending/approved) override business hours and make the team member unavailable.
 * Only rejected time-offs do not block availability.
 *
 * @param options The options for checking availability
 * @returns true if available, false if unavailable
 */
export const isResourceAvailable = ({
  date,
  hour,
  minute = 0,
  blockedSlots,
  businessHours,
  timeOffs,
  availableSlots,
}: IsResourceAvailableWithTimeOffOptions): boolean => {
  // Priority 1: Check available slots (inverted logic - only defined slots are available)
  if (availableSlots) {
    if (hour !== undefined) {
      // Time-level check
      if (!isTimeAvailable(date, hour, minute, availableSlots)) {
        return false
      }
    } else {
      // Day-level check
      if (!isDayAvailable(date, availableSlots)) {
        return false
      }
    }
  } else {
    // Priority 2: Check blocked slots (if availableSlots not provided)
    if (isBlockedSlot({ date, hour, minute, blockedSlots })) {
      return false
    }
  }

  // Check if there's a time-off (pending or approved) - both block availability
  if (timeOffs && timeOffs.length > 0) {
    const checkTime =
      hour !== undefined
        ? date.hour(hour).minute(minute).second(0).millisecond(0)
        : date.startOf('day')

    for (const timeOff of timeOffs) {
      // Only rejected time-offs don't block availability
      if (timeOff.status === 'rejected') {
        continue
      }

      const timeOffStart = safeDate(timeOff.start).startOf('minute')
      const timeOffEnd = safeDate(timeOff.end).startOf('minute')

      if (hour === undefined) {
        // Day-level check
        if (
          checkTime.isSameOrAfter(timeOffStart, 'day') &&
          checkTime.isSameOrBefore(timeOffEnd, 'day')
        ) {
          return false
        }
      } else {
        // Time-level check
        if (checkTime.isSameOrAfter(timeOffStart) && checkTime.isBefore(timeOffEnd)) {
          return false
        }
      }
    }
  }

  // If no business hours configured, assume available (unless blocked or time-off)
  if (!businessHours) {
    return true
  }

  // Check business hours
  const dayName = date.format('dddd').toLowerCase()
  const businessDays = businessHours.daysOfWeek?.map((d) => d.toLowerCase()) || []

  // Check if it's a business day
  if (!businessDays.includes(dayName)) {
    return false
  }

  // If hour is not provided, we only check the day
  if (hour === undefined) {
    return true
  }

  // Check business hours range
  const startTime = businessHours.startTime ?? 9
  const endTime = businessHours.endTime ?? 17

  const currentMinutes = hour * 60 + minute
  const startMinutes = startTime * 60
  const endMinutes = endTime * 60

  return currentMinutes >= startMinutes && currentMinutes < endMinutes
}

/**
 * Finds time-off requests that overlap with a specific time slot for a team member
 *
 * @param date The date to check
 * @param hour Optional hour to check
 * @param minute Optional minute to check
 * @param timeOffs Array of time-off requests (vacation, sick leave, etc.)
 * @returns Array of overlapping time-off requests
 */
export const getTimeOffsForSlot = (
  date: dayjs.Dayjs,
  hour: number | undefined,
  minute: number | undefined,
  timeOffs?: TimeOff[]
): TimeOff[] => {
  if (!timeOffs || timeOffs.length === 0) {
    return []
  }

  const checkTime =
    hour !== undefined
      ? date.hour(hour).minute(minute ?? 0).second(0).millisecond(0)
      : date.startOf('day')

  const overlapping: TimeOff[] = []

  for (const timeOff of timeOffs) {
    const timeOffStart = safeDate(timeOff.start).startOf('minute')
    const timeOffEnd = safeDate(timeOff.end).startOf('minute')

    // Check if the time overlaps with the time-off period
    if (hour === undefined) {
      // Day-level check
      if (
        checkTime.isSameOrAfter(timeOffStart, 'day') &&
        checkTime.isSameOrBefore(timeOffEnd, 'day')
      ) {
        overlapping.push(timeOff)
      }
    } else {
      // Time-level check
      if (checkTime.isSameOrAfter(timeOffStart) && checkTime.isBefore(timeOffEnd)) {
        overlapping.push(timeOff)
      }
    }
  }

  return overlapping
}

