import { useCalendarContext } from '@/features/calendar/contexts/calendar-context/context'
import dayjs from '@/lib/configs/dayjs-config'
import { getWeekDays } from '@/lib/utils/date-utils'
import React, { useMemo } from 'react'
import { WeekDayCol } from './week-day-col'
import {
  getVisibleHours,
  getVisibleHoursCount,
} from '@/features/calendar/utils/visible-hours'

export const WeekTimeGrid: React.FC = () => {
  const {
    currentDate,
    firstDayOfWeek,
    currentLocale,
    timeFormat,
    visibleHours,
  } = useCalendarContext()

  const weekDays = getWeekDays(currentDate, firstDayOfWeek)

  // Get visible hours based on configuration
  const hours = useMemo(() => getVisibleHours(visibleHours), [visibleHours])

  const visibleHoursCount = useMemo(
    () => getVisibleHoursCount(visibleHours),
    [visibleHours]
  )

  // Find if current day is in the displayed week
  const todayIndex = weekDays.findIndex((day) => day.isSame(dayjs(), 'day'))
  const isCurrentWeek = todayIndex !== -1

  // Calculate current time indicator position relative to visible hours
  const visibleStartTime = visibleHours?.startTime ?? 0
  const visibleEndTime = visibleHours?.endTime ?? 24
  const currentHour = dayjs().hour() + dayjs().minute() / 60
  const isCurrentTimeVisible =
    currentHour >= visibleStartTime && currentHour < visibleEndTime
  const currentTimeTop =
    isCurrentTimeVisible && isCurrentWeek
      ? (currentHour - visibleStartTime) * 60
      : -9999 // Hide if outside visible hours

  return (
    <div
      data-testid="week-time-grid"
      className="relative grid grid-cols-[auto_repeat(7,1fr)]"
      style={{
        gridTemplateRows: `repeat(${visibleHoursCount}, 60px)`,
      }}
    >
      {/* Time labels column - fixed */}
      <div
        data-testid="week-time-labels"
        className="z-10 col-span-1 w-16 border-x"
        style={{
          gridRow: `1 / ${visibleHoursCount + 1}`,
          gridTemplateRows: `repeat(${visibleHoursCount}, 60px)`,
          display: 'grid',
        }}
      >
        {hours.map((time) => (
          <div
            key={time.format('HH:mm')}
            data-testid={`week-time-hour-${time.format('HH')}`}
            className="h-[60px] border-b text-right"
          >
            <span className="text-muted-foreground px-1 text-right text-[10px] sm:text-xs">
              {Intl.DateTimeFormat(currentLocale, {
                hour: 'numeric',
                hour12: timeFormat === '12-hour',
              }).format(time.toDate())}
            </span>
          </div>
        ))}
      </div>

      {/* Day columns with time slots */}
      {weekDays.map((day) => (
        <WeekDayCol key={day.format('YYYY-MM-DD')} day={day} />
      ))}

      {/* Current time indicator */}
      {isCurrentWeek && isCurrentTimeVisible && (
        <div
          data-testid="week-current-time-indicator"
          className="pointer-events-none absolute z-40"
          style={{
            top: `${currentTimeTop}px`,
            left: `calc(var(--spacing) * 16 + ${todayIndex} * (100% - var(--spacing) * 16) / 7)`,
            width: `calc((100% - var(--spacing) * 16) / 7)`,
          }}
        >
          <div className="w-full border-t border-red-500">
            <div className="-mt-1 ml-1 h-2 w-2 rounded-full bg-red-500"></div>
          </div>
        </div>
      )}
    </div>
  )
}
