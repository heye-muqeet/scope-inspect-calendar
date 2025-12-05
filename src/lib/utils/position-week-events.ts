import type { CalendarEvent } from '@/components/types'
import {
  DAY_NUMBER_HEIGHT,
  EVENT_BAR_HEIGHT,
  GAP_BETWEEN_ELEMENTS,
} from '@/lib/constants'
import dayjs from '@/lib/configs/dayjs-config'

interface PositionedEvent extends CalendarEvent {
  left: number // Left position in percentage
  width: number // Width in percentage
  top: number // Top position in percentage
  height: number // Height in percentage
  position: number // Position in the row (0 for first, 1 for second, etc.)
  isTruncatedStart: boolean // Whether the event is truncated at the start
  isTruncatedEnd: boolean // Whether the event is truncated at the end
}

interface GetPositionedEventsProps {
  days: dayjs.Dayjs[]
  events: CalendarEvent[]
  dayMaxEvents: number
  dayNumberHeight?: number
  gridType?: 'day' | 'hour' // Future use for different grid types
}

export const getPositionedEvents = ({
  days,
  events,
  dayMaxEvents,
  dayNumberHeight = DAY_NUMBER_HEIGHT,
  gridType = 'day',
}: GetPositionedEventsProps) => {
  const firstDay = days[0].startOf('day')
  const lastDay = days.at(-1).endOf('day')
  const dayCount = days.length

  // Helper function to find column index for hour grid type
  // When visible hours are filtered, we need to match the event time to the actual column
  const findColumnIndex = (eventTime: dayjs.Dayjs): number => {
    if (gridType === 'hour') {
      // Find the matching hour in the days array
      const eventHour = eventTime.startOf('hour')
      const index = days.findIndex((day) => day.isSame(eventHour, 'hour'))
      if (index >= 0) {
        return index
      }
      // Fallback: if days array contains day-level entries, find the day that contains this hour
      const dayIndex = days.findIndex((day) => day.isSame(eventHour, 'day'))
      if (dayIndex >= 0) {
        // Return the day index (for hour grid with day-level days array, use day as column)
        return dayIndex
      }
      return -1
    }
    // For day grid type, use the original calculation
    return eventTime.diff(firstDay, gridType)
  }

  // Separate multi-day and single-day events
  const multiDayEvents = events.filter((e) => e.end.diff(e.start, gridType) > 0)
  const singleDayEvents = events.filter(
    (e) => e.end.diff(e.start, gridType) === 0
  )

  // Sort multi-day events by start date, then by duration
  const sortedMultiDay = [...multiDayEvents].sort((a, b) => {
    const startDiff = a.start.diff(b.start)
    if (startDiff !== 0) {
      return startDiff
    }
    return b.end.diff(b.start) - a.end.diff(a.start) // Longer events first
  })

  // Sort single-day events by start time
  const sortedSingleDay = [...singleDayEvents].sort((a, b) =>
    a.start.diff(b.start)
  )

  // Create dayCount x dayMaxEvents grid with flags
  const grid: { taken: boolean; event: CalendarEvent | null }[][] = []
  for (let row = 0; row < dayMaxEvents; row++) {
    grid[row] = []
    for (let col = 0; col < dayCount; col++) {
      grid[row][col] = { taken: false, event: null }
    }
  }

  const processedEvents: PositionedEvent[] = []

  // Step 1: Assign positions to multi-day events first
  for (const event of sortedMultiDay) {
    const eventStart = dayjs.max(event.start.startOf(gridType), firstDay)
    const adjustedEnd =
      gridType === 'hour' ? event.end.subtract(1, 'minute') : event.end
    const eventEnd = dayjs.min(adjustedEnd.startOf(gridType), lastDay)

    // Find column indices - use helper for hour grid type
    const startColRaw = findColumnIndex(eventStart)
    const endColRaw = findColumnIndex(eventEnd)

    // If event is completely outside visible range, skip it
    if (startColRaw < 0 && endColRaw < 0) {
      continue
    }

    // Clamp to visible range: if event starts before, use first column; if ends after, use last column
    const startCol = startColRaw >= 0 ? startColRaw : 0
    const endCol = endColRaw >= 0 ? endColRaw : dayCount - 1

    // Ensure valid range
    if (startCol >= dayCount || endCol < 0 || startCol > endCol) {
      continue
    }

    // Detect if event is truncated at the boundaries
    const isTruncatedStart = event.start.startOf(gridType).isBefore(firstDay)
    const isTruncatedEnd = event.end.startOf(gridType).isAfter(lastDay)

    // Try to place the event starting from its original start column
    let placedSuccessfully = false

    // First try: place from original start position
    let assignedRow = -1
    for (let row = 0; row < dayMaxEvents; row++) {
      let canPlace = true
      for (let col = startCol; col <= endCol; col++) {
        if (grid[row][col].taken) {
          canPlace = false
          break
        }
      }
      if (canPlace) {
        assignedRow = row
        break
      }
    }

    // If we found a row, assign the event to all its columns
    if (assignedRow !== -1) {
      for (let col = startCol; col <= endCol; col++) {
        grid[assignedRow][col] = { taken: true, event }
      }

      // Create position data for rendering
      const spanDays = endCol - startCol + 1
      processedEvents.push({
        left: (startCol / dayCount) * 100,
        width: (spanDays / dayCount) * 100,
        top:
          dayNumberHeight +
          GAP_BETWEEN_ELEMENTS +
          assignedRow * (EVENT_BAR_HEIGHT + GAP_BETWEEN_ELEMENTS),
        height: EVENT_BAR_HEIGHT,
        position: assignedRow,
        ...event,
        isTruncatedStart,
        isTruncatedEnd,
      } as PositionedEvent)
      placedSuccessfully = true
    }

    // If couldn't place at original position, try truncated versions starting from later days
    if (!placedSuccessfully) {
      for (
        let tryStartCol = startCol + 1;
        tryStartCol <= endCol;
        tryStartCol++
      ) {
        // Try to place the truncated event starting from this column
        let truncatedAssignedRow = -1
        for (let row = 0; row < dayMaxEvents; row++) {
          let canPlace = true
          for (let col = tryStartCol; col <= endCol; col++) {
            if (grid[row][col].taken) {
              canPlace = false
              break
            }
          }
          if (canPlace) {
            truncatedAssignedRow = row
            break
          }
        }

        // If we found a row for the truncated version, place it
        if (truncatedAssignedRow !== -1) {
          for (let col = tryStartCol; col <= endCol; col++) {
            grid[truncatedAssignedRow][col] = { taken: true, event }
          }

          // Create position data for the truncated rendering
          const truncatedSpanDays = endCol - tryStartCol + 1
          processedEvents.push({
            left: (tryStartCol / dayCount) * 100,
            width: (truncatedSpanDays / dayCount) * 100,
            top:
              dayNumberHeight +
              GAP_BETWEEN_ELEMENTS +
              truncatedAssignedRow * (EVENT_BAR_HEIGHT + GAP_BETWEEN_ELEMENTS),
            height: EVENT_BAR_HEIGHT,
            position: truncatedAssignedRow,
            ...event,
            isTruncatedStart: true, // Always truncated at start when using this fallback logic
            isTruncatedEnd,
          } as PositionedEvent)
          placedSuccessfully = true
          break // Successfully placed, stop trying other start positions
        }
      }
    }
  }

  // Step 2: Fill gaps with single-day events
  for (const event of sortedSingleDay) {
    const eventStart = dayjs.max(event.start.startOf(gridType), firstDay)

    // Find column index - use helper for hour grid type
    const colRaw = findColumnIndex(eventStart)

    // If event is outside visible range, skip it
    if (colRaw < 0) {
      continue
    }

    // Clamp col to valid grid bounds to prevent accessing undefined grid positions
    const col = Math.max(0, Math.min(dayCount - 1, colRaw))

    // Single-day events are not truncated by definition
    const isTruncatedStart = false
    const isTruncatedEnd = false

    // Find the first available row in this column
    let assignedRow = -1
    for (let row = 0; row < dayMaxEvents; row++) {
      if (!grid[row][col].taken) {
        assignedRow = row
        break
      }
    }

    // If we found a row, assign the event
    if (assignedRow !== -1) {
      grid[assignedRow][col] = { taken: true, event }

      // Create position data for rendering
      processedEvents.push({
        left: (col / dayCount) * 100,
        width: (1 / dayCount) * 100,
        top:
          dayNumberHeight +
          GAP_BETWEEN_ELEMENTS +
          assignedRow * (EVENT_BAR_HEIGHT + GAP_BETWEEN_ELEMENTS),
        height: EVENT_BAR_HEIGHT,
        position: assignedRow,
        ...event,
        isTruncatedStart,
        isTruncatedEnd,
      } as PositionedEvent)
    }
  }

  return processedEvents
}
