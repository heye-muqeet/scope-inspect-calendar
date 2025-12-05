import type { VisibleHours } from '@/components/types'
import dayjs from '@/lib/configs/dayjs-config'

/**
 * Generates an array of hour objects within the visible hours range.
 * If visibleHours is not provided, returns all 24 hours (0-23).
 *
 * @param visibleHours - Optional visible hours configuration
 * @returns Array of dayjs objects representing visible hours
 */
export function getVisibleHours(visibleHours?: VisibleHours): dayjs.Dayjs[] {
  // Default: show all 24 hours if not configured
  const startTime = visibleHours?.startTime ?? 0
  const endTime = visibleHours?.endTime ?? 24

  // Validate range
  const validStart = Math.max(0, Math.min(24, startTime))
  const validEnd = Math.max(0, Math.min(24, endTime))

  // Generate hours array
  const hours: dayjs.Dayjs[] = []
  for (let hour = validStart; hour < validEnd; hour++) {
    hours.push(dayjs().hour(hour).minute(0).second(0).millisecond(0))
  }

  return hours
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
 * Calculates the total number of visible hours.
 *
 * @param visibleHours - Optional visible hours configuration
 * @returns Number of visible hours (default: 24)
 */
export function getVisibleHoursCount(visibleHours?: VisibleHours): number {
  // Default: 24 hours if not configured
  if (!visibleHours) {
    return 24
  }

  const startTime = visibleHours.startTime ?? 0
  const endTime = visibleHours.endTime ?? 24

  // Validate and calculate
  const validStart = Math.max(0, Math.min(24, startTime))
  const validEnd = Math.max(0, Math.min(24, endTime))

  return Math.max(0, validEnd - validStart)
}
