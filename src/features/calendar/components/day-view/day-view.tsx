import { ScrollArea } from '@/components/ui/scroll-area'
import { useCalendarContext } from '@/features/calendar/contexts/calendar-context/context'
import { cn } from '@/lib/utils'
import dayjs from '@/lib/configs/dayjs-config'
import { useMemo } from 'react'
import { DroppableCell } from '@/components/droppable-cell'
import { DayAllDayRow } from './day-all-day-row'
import { DayEventsLayer } from './day-events-layer'
import { DayHeader } from './day-header'
import { DayTimeCol } from './day-time-col'
import { isBusinessHour } from '@/features/calendar/utils/business-hours'
import {
  getVisibleHours,
  getVisibleHoursCount,
} from '@/features/calendar/utils/visible-hours'

const DayView = () => {
  const { currentDate, businessHours, visibleHours, slotDuration } = useCalendarContext()

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

  const isToday = currentDate.isSame(dayjs(), 'day')
  const dateStr = currentDate.format('YYYY-MM-DD')

  // Calculate current time indicator position relative to visible hours
  const visibleStartTime = visibleHours?.startTime ?? 0
  const visibleEndTime = visibleHours?.endTime ?? 24
  const currentHour = dayjs().hour() + dayjs().minute() / 60
  const isCurrentTimeVisible =
    currentHour >= visibleStartTime && currentHour < visibleEndTime
  const currentTimeTop =
    isCurrentTimeVisible && isToday
      ? (currentHour - visibleStartTime) * rowHeight * (slotDuration === 30 ? 2 : 1)
      : -9999 // Hide if outside visible hours

  return (
    <div data-testid="day-view" className="flex h-full flex-col">
      {/* Day header */}
      <DayHeader className="h-[3rem]" />

      {/* Time grid without scrollbar */}
      <ScrollArea
        data-testid="day-scroll-area"
        className="relative overflow-y-auto h-[calc(100%-3rem)]"
      >
        {/* All-day events row */}
        <DayAllDayRow />

        {/* Set a fixed height container that matches exactly the total height of all time slots */}
        <div
          data-testid="day-time-grid"
          className="grid grid-cols-8 divide-x border-x"
          style={{ height: `${visibleHoursCount * rowHeight}px` }}
        >
          {/* Time labels column */}
          <DayTimeCol className="col-span-2 h-full md:col-span-1" />

          {/* Day column with events */}
          <div
            data-testid="day-events-column"
            className="relative col-span-6 h-full md:col-span-7"
          >
            {hours.map((time, index) => {
              const hour = time.hour()
              const minute = time.minute()
              const timeStr = `${hour.toString().padStart(2, '0')}-${minute.toString().padStart(2, '0')}`
              const isLastSlot = index === hours.length - 1

              const isBusiness = isBusinessHour({
                date: currentDate,
                hour,
                minute,
                businessHours,
              })

              const borderClass = isLastSlot
                ? 'border-border'
                : 'border-dashed'

              return (
                <DroppableCell
                  key={timeStr}
                  id={`day-time-cell-${dateStr}-${timeStr}`}
                  data-testid={`day-time-cell-${timeStr}`}
                  type="time-cell"
                  date={currentDate}
                  hour={hour}
                  minute={minute}
                  disabled={!isBusiness}
                  className={cn(
                    'border-b hover:bg-accent',
                    borderClass
                  )}
                  style={{ height: `${rowHeight}px` }}
                />
              )
            })}

            {/* Events layer - middle-top layer */}
            <DayEventsLayer day={currentDate} />

            {/* Current time indicator - top layer */}
            {isToday && isCurrentTimeVisible && (
              <div
                data-testid="day-current-time-indicator"
                className="absolute right-0 left-0 z-40 border-t border-red-500"
                style={{
                  top: `${currentTimeTop}px`,
                }}
              >
                <div className="-mt-1 -ml-1 h-2 w-2 rounded-full bg-red-500"></div>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default DayView
