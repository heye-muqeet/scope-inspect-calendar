import type dayjs from '@/lib/configs/dayjs-config'
import type {
  BlockedSlots,
  TimeOff,
  AvailableSlots,
} from '@/features/calendar/types'
import { safeDate } from '@/lib'
import {
  isTimeAvailable,
  isDayAvailable,
  isTimeBlocked,
  isDayBlocked,
} from './available-slots-transformer'

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
  blockedSlots?: BlockedSlots
  /** Business hours configuration (used as fallback) */
  businessHours?: {
    daysOfWeek?: string[]
    startTime?: number
    endTime?: number
  }
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
    } else if (!isDayAvailable(date, availableSlots)) {
      // Day-level check
      return false
    }
  } else if (hour !== undefined) {
    // Priority 2: Check blocked slots (if availableSlots not provided)
    // Time-level check
    if (isTimeBlocked(date, hour, minute, blockedSlots)) {
      return false
    }
  } else if (isDayBlocked(date, blockedSlots)) {
    // Priority 2: Check blocked slots (if availableSlots not provided)
    // Day-level check
    return false
  }

  // Check if there's a time-off (pending or approved) - both block availability
  if (timeOffs && timeOffs.length > 0) {
    const checkTime =
      hour === undefined
        ? date.startOf('day')
        : date.hour(hour).minute(minute).second(0).millisecond(0)

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
      } else if (
        checkTime.isSameOrAfter(timeOffStart) &&
        checkTime.isBefore(timeOffEnd)
      ) {
        // Time-level check
        return false
      }
    }
  }

  // If no business hours configured, assume available (unless blocked or time-off)
  if (!businessHours) {
    return true
  }

  // Check business hours
  const dayName = date.format('dddd').toLowerCase()
  const businessDays =
    businessHours.daysOfWeek?.map((d) => d.toLowerCase()) || []

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
    hour === undefined
      ? date.startOf('day')
      : date
          .hour(hour)
          .minute(minute ?? 0)
          .second(0)
          .millisecond(0)

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
    } else if (
      checkTime.isSameOrAfter(timeOffStart) &&
      checkTime.isBefore(timeOffEnd)
    ) {
      // Time-level check
      overlapping.push(timeOff)
    }
  }

  return overlapping
}
