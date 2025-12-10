import type dayjs from '@/lib/configs/dayjs-config'
import dayjsInstance from '@/lib/configs/dayjs-config'
import type { AvailableSlots, BlockedSlot } from '@/features/calendar/types'

/**
 * Parses a time string (e.g., '12:00 AM', '11:30 PM', '09:00', '17:30')
 * Returns hour and minute
 */
function parseTime(timeStr: string): { hour: number; minute: number } {
  const trimmed = timeStr.trim().toUpperCase()

  // Handle 12-hour format with AM/PM
  if (trimmed.includes('AM') || trimmed.includes('PM')) {
    const [time, period] = trimmed.split(/\s*(AM|PM)/)
    const [hourStr, minuteStr = '0'] = time.split(':')
    let hour = Number.parseInt(hourStr, 10)
    const minute = Number.parseInt(minuteStr, 10)

    if (period === 'PM' && hour !== 12) {
      hour += 12
    } else if (period === 'AM' && hour === 12) {
      hour = 0
    }

    return { hour, minute }
  }

  // Handle 24-hour format
  const [hourStr, minuteStr = '0'] = trimmed.split(':')
  return {
    hour: Number.parseInt(hourStr, 10),
    minute: Number.parseInt(minuteStr, 10),
  }
}

/**
 * Parses a date string in format 'DD-MM-YYYY' (e.g., '24-04-2024')
 */
function parseDate(dateStr: string): dayjs.Dayjs {
  const [day, month, year] = dateStr.split('-').map(Number)
  return dayjsInstance()
    .year(year)
    .month(month - 1)
    .date(day)
    .startOf('day')
}

/**
 * Checks if a time falls within any of the available schedules
 */
function isTimeInSchedules(
  date: dayjs.Dayjs,
  hour: number,
  minute: number,
  schedules: { start: string; end: string }[]
): boolean {
  const checkTime = date.hour(hour).minute(minute).second(0).millisecond(0)

  for (const schedule of schedules) {
    const startTime = parseTime(schedule.start)
    const endTime = parseTime(schedule.end)

    const scheduleStart = date
      .hour(startTime.hour)
      .minute(startTime.minute)
      .second(0)
      .millisecond(0)

    let scheduleEnd = date
      .hour(endTime.hour)
      .minute(endTime.minute)
      .second(0)
      .millisecond(0)

    // Handle case where end time is before start time (spans midnight)
    if (scheduleEnd.isBefore(scheduleStart)) {
      scheduleEnd = scheduleEnd.add(1, 'day')
    }

    // Check if checkTime falls within this schedule
    if (
      checkTime.isSameOrAfter(scheduleStart) &&
      checkTime.isBefore(scheduleEnd)
    ) {
      return true
    }
  }

  return false
}

/**
 * Transforms available slots into blocked slots (inverted logic).
 * Only times defined in available slots are available; everything else becomes blocked.
 *
 * Note: This function is kept for potential future use, but currently we check
 * available slots directly in isTimeAvailable/isDayAvailable functions.
 */
export function transformAvailableSlotsToBlocked(
  _availableSlots: AvailableSlots,
  _baseDate: dayjs.Dayjs = dayjsInstance()
): BlockedSlot[] {
  // Return empty array - we check available slots directly in availability logic
  // instead of converting to blocked slots
  return []
}

/**
 * Checks if a time slot is available based on available slots configuration.
 * One-time slots have higher priority and override recurring slots.
 */
export function isTimeAvailable(
  date: dayjs.Dayjs,
  hour: number,
  minute: number,
  availableSlots?: AvailableSlots
): boolean {
  if (!availableSlots) {
    return true // No restrictions if no available slots defined
  }

  // Priority 1: Check one-time slots first (they override recurring)
  if (availableSlots.one_time) {
    for (const oneTimeSlot of availableSlots.one_time) {
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        if (oneTimeSlot.enabled) {
          // If enabled, check if time is in the schedule
          if (isTimeInSchedules(date, hour, minute, oneTimeSlot.schedule)) {
            return true // Time is in available schedule
          }
          return false // Time is not in available schedule, so it's blocked
        }
        // If disabled (enabled: false), block this date completely
        return false
      }
    }
  }

  // Priority 2: Check recurring slots (only if no one-time slot matches this date)
  const dayOfWeek = date.day() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const dayNameMap: Record<number, keyof AvailableSlots['recurring']> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun',
  }
  const dayName = dayNameMap[dayOfWeek]

  if (availableSlots.recurring && dayName) {
    const dayConfig = availableSlots.recurring[dayName]
    if (dayConfig && dayConfig.enabled && dayConfig.schedule) {
      if (isTimeInSchedules(date, hour, minute, dayConfig.schedule)) {
        return true // Time is in available schedule
      }
      return false // Time is not in available schedule, so it's blocked
    } else if (dayConfig && !dayConfig.enabled) {
      // Day is explicitly disabled in recurring
      return false
    }
  }

  // If we have available slots defined but time doesn't match any, it's blocked
  const hasRecurring =
    availableSlots.recurring && Object.keys(availableSlots.recurring).length > 0
  const hasOneTime =
    availableSlots.one_time && availableSlots.one_time.length > 0

  if (hasRecurring || hasOneTime) {
    return false // Time is not in any available schedule, so it's blocked
  }

  return true // No available slots defined, so everything is available
}

/**
 * Checks if a day is available (for day-level checks).
 * One-time slots have higher priority and override recurring slots.
 */
export function isDayAvailable(
  date: dayjs.Dayjs,
  availableSlots?: AvailableSlots
): boolean {
  if (!availableSlots) {
    return true
  }

  // Priority 1: Check one-time slots first (they override recurring)
  if (availableSlots.one_time) {
    for (const oneTimeSlot of availableSlots.one_time) {
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        return oneTimeSlot.enabled // enabled = available, disabled = blocked
      }
    }
  }

  // Priority 2: Check recurring slots (only if no one-time slot matches this date)
  const dayOfWeek = date.day()
  const dayNameMap: Record<number, keyof AvailableSlots['recurring']> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun',
  }
  const dayName = dayNameMap[dayOfWeek]

  if (availableSlots.recurring && dayName) {
    const dayConfig = availableSlots.recurring[dayName]
    if (dayConfig) {
      return dayConfig.enabled // enabled = available, disabled = blocked
    }
  }

  // If we have available slots defined but day doesn't match any, it's blocked
  const hasRecurring =
    availableSlots.recurring && Object.keys(availableSlots.recurring).length > 0
  const hasOneTime =
    availableSlots.one_time && availableSlots.one_time.length > 0

  if (hasRecurring || hasOneTime) {
    return false
  }

  return true
}
