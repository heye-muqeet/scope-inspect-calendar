import type dayjs from '@/lib/configs/dayjs-config'
import dayjsInstance from '@/lib/configs/dayjs-config'
import type {
  AvailableSlots,
  BlockedSlots,
} from '@/features/calendar/types'

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
 * Checks if a time slot is blocked based on blocked slots configuration.
 * One-time slots have higher priority and override recurring slots.
 */
export function isTimeBlocked(
  date: dayjs.Dayjs,
  hour: number,
  minute: number,
  blockedSlots?: BlockedSlots
): boolean {
  if (!blockedSlots) {
    return false // No restrictions if no blocked slots defined
  }

  // Priority 1: Check one-time slots first (they override recurring)
  if (blockedSlots.one_time) {
    for (const oneTimeSlot of blockedSlots.one_time) {
      // Skip disabled entries (enabled: false means draft, not applied)
      if (!oneTimeSlot.enabled) {
        continue
      }
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        // Check if time is in the schedule
        if (isTimeInSchedules(date, hour, minute, oneTimeSlot.schedule)) {
          return true // Time is in blocked schedule
        }
        return false // Time is not in blocked schedule, so it's available
      }
    }
  }

  // Priority 2: Check recurring slots (only if no one-time slot matches this date)
  const dayOfWeek = date.day() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const dayNameMap: Record<number, keyof BlockedSlots['recurring']> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun',
  }
  const dayName = dayNameMap[dayOfWeek]

  if (blockedSlots.recurring && dayName) {
    const dayConfig = blockedSlots.recurring[dayName]
    // Skip disabled entries (enabled: false means draft, not applied)
    if (dayConfig && dayConfig.enabled && dayConfig.schedule) {
      if (isTimeInSchedules(date, hour, minute, dayConfig.schedule)) {
        return true // Time is in blocked schedule
      }
      return false // Time is not in blocked schedule, so it's available
    }
    // If dayConfig is disabled or doesn't exist, continue to check other rules
  }

  // If we have blocked slots defined but time doesn't match any enabled rule, it's available
  const hasEnabledRecurring =
    blockedSlots.recurring &&
    Object.values(blockedSlots.recurring).some((day) => day?.enabled)
  const hasEnabledOneTime =
    blockedSlots.one_time &&
    blockedSlots.one_time.some((slot) => slot.enabled)

  if (hasEnabledRecurring || hasEnabledOneTime) {
    return false // Time is not in any blocked schedule, so it's available
  }

  return false // No blocked slots defined, so nothing is blocked
}

/**
 * Checks if a day is blocked (for day-level checks).
 * One-time slots have higher priority and override recurring slots.
 */
export function isDayBlocked(
  date: dayjs.Dayjs,
  blockedSlots?: BlockedSlots
): boolean {
  if (!blockedSlots) {
    return false
  }

  // Priority 1: Check one-time slots first (they override recurring)
  if (blockedSlots.one_time) {
    for (const oneTimeSlot of blockedSlots.one_time) {
      // Skip disabled entries (enabled: false means draft, not applied)
      if (!oneTimeSlot.enabled) {
        continue
      }
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        return true // Date is blocked
      }
    }
  }

  // Priority 2: Check recurring slots (only if no one-time slot matches this date)
  const dayOfWeek = date.day()
  const dayNameMap: Record<number, keyof BlockedSlots['recurring']> = {
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
    0: 'sun',
  }
  const dayName = dayNameMap[dayOfWeek]

  if (blockedSlots.recurring && dayName) {
    const dayConfig = blockedSlots.recurring[dayName]
    // Skip disabled entries (enabled: false means draft, not applied)
    if (dayConfig && dayConfig.enabled) {
      return true // Day is blocked
    }
    // If dayConfig is disabled or doesn't exist, continue to check other rules
  }

  // If we have blocked slots defined but day doesn't match any enabled rule, it's available
  const hasEnabledRecurring =
    blockedSlots.recurring &&
    Object.values(blockedSlots.recurring).some((day) => day?.enabled)
  const hasEnabledOneTime =
    blockedSlots.one_time &&
    blockedSlots.one_time.some((slot) => slot.enabled)

  if (hasEnabledRecurring || hasEnabledOneTime) {
    return false
  }

  return false
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
      // Skip disabled entries (enabled: false means draft, not applied)
      if (!oneTimeSlot.enabled) {
        continue
      }
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        // Check if time is in the schedule
        if (isTimeInSchedules(date, hour, minute, oneTimeSlot.schedule)) {
          return true // Time is in available schedule
        }
        return false // Time is not in available schedule, so it's blocked
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
    // Skip disabled entries (enabled: false means draft, not applied)
    if (dayConfig && dayConfig.enabled && dayConfig.schedule) {
      if (isTimeInSchedules(date, hour, minute, dayConfig.schedule)) {
        return true // Time is in available schedule
      }
      return false // Time is not in available schedule, so it's blocked
    }
    // If dayConfig is disabled or doesn't exist, continue to check other rules
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
      // Skip disabled entries (enabled: false means draft, not applied)
      if (!oneTimeSlot.enabled) {
        continue
      }
      const slotDate = parseDate(oneTimeSlot.date)
      if (slotDate.isSame(date, 'day')) {
        // One-time slot exists for this date - use it (overrides recurring)
        return true // Date is available
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
    // Skip disabled entries (enabled: false means draft, not applied)
    if (dayConfig && dayConfig.enabled) {
      return true // Day is available
    }
    // If dayConfig is disabled or doesn't exist, continue to check other rules
  }

  // If we have available slots defined but day doesn't match any enabled rule, it's blocked
  const hasEnabledRecurring =
    availableSlots.recurring &&
    Object.values(availableSlots.recurring).some((day) => day?.enabled)
  const hasEnabledOneTime =
    availableSlots.one_time &&
    availableSlots.one_time.some((slot) => slot.enabled)

  if (hasEnabledRecurring || hasEnabledOneTime) {
    return false
  }

  return true
}
