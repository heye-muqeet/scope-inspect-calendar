// oxlint-disable no-negated-condition
import type dayjs from '@/lib/configs/dayjs-config'
import dayjsInstance from '@/lib/configs/dayjs-config'
import { cn } from '@/lib/utils'
import { useDroppable } from '@dnd-kit/core'
import React, { useMemo } from 'react'
import { useSmartCalendarContext } from '@/hooks/use-smart-calendar-context'
import { Plus } from 'lucide-react'

interface DroppableCellProps {
  id: string
  type: 'day-cell' | 'time-cell'
  date: dayjs.Dayjs
  hour?: number
  minute?: number
  resourceId?: string | number
  allDay?: boolean
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  'data-testid'?: string
  disabled?: boolean
}

export function DroppableCell({
  id,
  type,
  date,
  hour,
  minute,
  resourceId,
  allDay,
  children,
  className,
  style,
  'data-testid': dataTestId,
  disabled = false,
}: DroppableCellProps) {
  const { onCellClick, disableDragAndDrop, disableCellClick, slotDuration } =
    useSmartCalendarContext((state) => ({
      onCellClick: state.onCellClick,
      disableDragAndDrop: state.disableDragAndDrop,
      disableCellClick: state.disableCellClick,
      slotDuration: state.slotDuration ?? 60,
    }))

  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      type,
      date,
      hour,
      minute,
      resourceId,
      allDay,
    },
    disabled: disableDragAndDrop || disabled,
  })

  // Check if cell is in the past - grey out but keep interactive
  // Exclude the current cell from being greyed out
  const isPast = useMemo(() => {
    const now = dayjsInstance()
    const cellTime = date.clone()

    if (hour !== undefined) {
      cellTime
        .hour(hour)
        .minute(minute ?? 0)
        .second(0)
        .millisecond(0)
      // For hour-level cells, check if the specific time is in the past
      // isBefore already excludes the current time, so this is correct
      return cellTime.isBefore(now)
    }
    // For day-level cells, check if the day is in the past (not today)
    // isBefore with 'day' granularity excludes today, so this is correct
    return cellTime.isBefore(now, 'day')
  }, [date, hour, minute])

  const handleCellClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (disableCellClick || disabled) {
      return
    }

    const start = date.hour(hour ?? 0).minute(minute ?? 0)
    let end = start.clone()
    if (hour !== undefined && minute !== undefined) {
      // Use slotDuration for time slot calculations
      end = end.add(slotDuration, 'minute')
    } else if (hour !== undefined) {
      // For hour-only slots, add slotDuration
      end = end.add(slotDuration, 'minute')
    } else {
      end = end.hour(23).minute(59) // month view full day
    }

    onCellClick({ start, end, resourceId })
  }

  return (
    // oxlint-disable-next-line click-events-have-key-events
    <div
      ref={setNodeRef}
      data-testid={dataTestId}
      className={cn(
        className,
        isOver && !disableDragAndDrop && !disabled && 'bg-accent',
        disableCellClick || disabled ? 'cursor-default' : 'cursor-pointer',
        // Unavailable slots: darker with diagonal pattern
        disabled && 'bg-secondary text-muted-foreground pointer-events-none',
        disabled &&
          'bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.05)_4px,rgba(0,0,0,0.05)_8px)]',
        disabled &&
          'dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.05)_4px,rgba(255,255,255,0.05)_8px)]',
        !disabled && !disableCellClick && 'group relative',
        // Grey out past cells but keep them interactive (same styling as disabled but without pointer-events-none)
        isPast && !disabled && 'bg-secondary text-muted-foreground'
      )}
      onClick={handleCellClick}
      style={style}
    >
      {children}
      {/* Hover overlay with plus icon */}
      {!disabled && !disableCellClick && (
        <div className="absolute inset-0 flex items-center justify-center bg-sky-100/80 dark:bg-sky-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          <Plus
            className="w-6 h-6 text-blue-400/60 dark:text-blue-300/50"
            strokeWidth={2.5}
          />
        </div>
      )}
    </div>
  )
}
