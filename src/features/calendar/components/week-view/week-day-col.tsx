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
  const { businessHours, visibleHours } = useCalendarContext()

  // Get visible hours based on configuration
  const hours = useMemo(() => getVisibleHours(visibleHours), [visibleHours])

  const visibleHoursCount = useMemo(
    () => getVisibleHoursCount(visibleHours),
    [visibleHours]
  )

  return (
    <div
      data-testid={`week-day-col-${day.format('YYYY-MM-DD')}`}
      className="col-span-1 relative border-r"
      style={{
        gridRow: `1 / ${visibleHoursCount + 1}`,
        gridTemplateRows: `repeat(${visibleHoursCount}, 60px)`,
        display: 'grid',
      }}
    >
      {hours.map((time) => {
        const hour = time.hour()
        const hourStr = time.format('HH')
        const dateStr = day.format('YYYY-MM-DD')
        const isBusiness = isBusinessHour({
          date: day,
          hour,
          minute: 0,
          businessHours,
        })

        return (
          <DroppableCell
            key={`${dateStr}-${hourStr}`}
            id={`week-time-cell-${dateStr}-${hourStr}`}
            type="time-cell"
            date={day}
            hour={hour}
            disabled={!isBusiness}
            data-testid={`week-time-cell-${dateStr}-${hourStr}`}
            className={cn(
              'hover:bg-accent relative z-10 h-[60px] cursor-pointer border-b'
            )}
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
