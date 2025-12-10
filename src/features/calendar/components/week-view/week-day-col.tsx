import { cn } from '@/lib/utils'
import type dayjs from '@/lib/configs/dayjs-config'
import React, { useMemo } from 'react'
import { DayEventsLayer } from '../day-view/day-events-layer'
import { DroppableCell } from '@/components/droppable-cell'
import { useCalendarContext } from '@/features/calendar/contexts/calendar-context/context'
import { isBusinessHour } from '@/features/calendar/utils/business-hours'
import {
  getVisibleHours,
  getVisibleHoursCount,
} from '@/features/calendar/utils/visible-hours'

interface WeekDayColProps {
  day: dayjs.Dayjs // The specific day this column represents
}

export const WeekDayCol: React.FC<WeekDayColProps> = ({ day }) => {
  const { businessHours, visibleHours, slotDuration } = useCalendarContext()

  // Get visible hours based on configuration and slot duration
  const hours = useMemo(
    () => getVisibleHours(visibleHours, slotDuration),
    [visibleHours, slotDuration]
  )

  const visibleHoursCount = useMemo(
    () => getVisibleHoursCount(visibleHours, slotDuration),
    [visibleHours, slotDuration]
  )
  
  // Calculate row height based on slot duration (30px for 30min, 60px for 60min)
  const rowHeight = slotDuration === 30 ? 30 : 60

  return (
    <div
      data-testid={`week-day-col-${day.format('YYYY-MM-DD')}`}
      className="col-span-1 relative border-r"
      style={{
        gridRow: `1 / ${visibleHoursCount + 1}`,
        gridTemplateRows: `repeat(${visibleHoursCount}, ${rowHeight}px)`,
        display: 'grid',
      }}
    >
      {hours.map((time) => {
        const hour = time.hour()
        const minute = time.minute()
        const timeStr = `${hour.toString().padStart(2, '0')}-${minute.toString().padStart(2, '0')}`
        const dateStr = day.format('YYYY-MM-DD')
        const isBusiness = isBusinessHour({
          date: day,
          hour,
          minute,
          businessHours,
        })

        return (
          <DroppableCell
            key={`${dateStr}-${timeStr}`}
            id={`week-time-cell-${dateStr}-${timeStr}`}
            type="time-cell"
            date={day}
            hour={hour}
            minute={minute}
            disabled={!isBusiness}
            data-testid={`week-time-cell-${dateStr}-${timeStr}`}
            className={cn(
              'hover:bg-accent relative z-10 cursor-pointer border-b'
            )}
            style={{ height: `${rowHeight}px` }}
          />
        )
      })}

      {/* Event blocks layer */}
      <DayEventsLayer
        data-testid={`week-day-events-${day.format('YYYY-MM-DD')}`}
        day={day}
      />
    </div>
  )
}
