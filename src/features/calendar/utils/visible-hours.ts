import type { VisibleHours } from '@/components/types'
import dayjs from '@/lib/configs/dayjs-config'

/**
 * Generates an array of time slot objects within the visible hours range.
 * Supports both 30-minute and 60-minute slot durations.
 * If visibleHours is not provided, returns all 24 hours (0-23).
 *
 * @param visibleHours - Optional visible hours configuration
 * @param slotDuration - Duration of each slot in minutes (30 or 60). Defaults to 60.
 * @returns Array of dayjs objects representing visible time slots
 */
export function getVisibleHours(
  visibleHours?: VisibleHours,
  slotDuration: 30 | 60 = 60
): dayjs.Dayjs[] {
  // Default: show all 24 hours if not configured
  const startTime = visibleHours?.startTime ?? 0
  const endTime = visibleHours?.endTime ?? 24

  // Validate range
  const validStart = Math.max(0, Math.min(24, startTime))
  const validEnd = Math.max(0, Math.min(24, endTime))

  // Generate time slots array based on slot duration
  const slots: dayjs.Dayjs[] = []
  
  if (slotDuration === 30) {
    // Generate 30-minute slots
    for (let hour = validStart; hour < validEnd; hour++) {
      slots.push(dayjs().hour(hour).minute(0).second(0).millisecond(0))
      slots.push(dayjs().hour(hour).minute(30).second(0).millisecond(0))
    }
  } else {
    // Generate 60-minute (hourly) slots
    for (let hour = validStart; hour < validEnd; hour++) {
      slots.push(dayjs().hour(hour).minute(0).second(0).millisecond(0))
    }
  }

  return slots
}

/**
 * Checks if a specific hour is within visible hours.
 *
 * @param hour - Hour to check (0-23)
 * @param visibleHours - Optional visible hours configuration
 * @returns true if hour should be displayed
 */
export function isVisibleHour(
  hour: number,
  visibleHours?: VisibleHours
): boolean {
  // Default: all hours are visible if not configured
  if (!visibleHours) {
    return true
  }

  const startTime = visibleHours.startTime ?? 0
  const endTime = visibleHours.endTime ?? 24

  // Validate hour
  if (hour < 0 || hour >= 24) {
    return false
  }

  return hour >= startTime && hour < endTime
}

/**
 * Calculates the total number of visible time slots.
 *
 * @param visibleHours - Optional visible hours configuration
 * @param slotDuration - Duration of each slot in minutes (30 or 60). Defaults to 60.
 * @returns Number of visible time slots
 */
export function getVisibleHoursCount(
  visibleHours?: VisibleHours,
  slotDuration: 30 | 60 = 60
): number {
  // Default: 24 hours if not configured
  if (!visibleHours) {
    return slotDuration === 30 ? 48 : 24 // 48 slots for 30min, 24 for 60min
  }

  const startTime = visibleHours.startTime ?? 0
  const endTime = visibleHours.endTime ?? 24

  // Validate and calculate
  const validStart = Math.max(0, Math.min(24, startTime))
  const validEnd = Math.max(0, Math.min(24, endTime))
  const hoursCount = Math.max(0, validEnd - validStart)

  return slotDuration === 30 ? hoursCount * 2 : hoursCount
}
