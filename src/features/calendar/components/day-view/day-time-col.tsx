import { useCalendarContext } from '@/features/calendar/contexts/calendar-context/context'
import { useMemo } from 'react'
import { getVisibleHours } from '@/features/calendar/utils/visible-hours'

interface DayTimeColProps {
  className?: string
}

export const DayTimeCol: React.FC<DayTimeColProps> = ({ className }) => {
  const { currentLocale, timeFormat, visibleHours, slotDuration } =
    useCalendarContext()

  // Get visible hours based on configuration and slot duration
  const hours = useMemo(
    () => getVisibleHours(visibleHours, slotDuration),
    [visibleHours, slotDuration]
  )

  // Calculate row height based on slot duration (30px for 30min, 60px for 60min)
  const rowHeight = slotDuration === 30 ? 30 : 60

  return (
    <div
      data-testid="day-time-col"
      className={`col-span-2 h-full md:col-span-1 ${className}`}
    >
      {hours.map((time) => (
        <div
          key={time.format('HH:mm')}
          data-testid={`day-time-hour-${time.format('HH:mm')}`}
          className="border-b text-right"
          style={{ height: `${rowHeight}px` }}
        >
          <span className="text-muted-foreground pr-2 text-right text-[10px] sm:text-xs">
            {Intl.DateTimeFormat(currentLocale, {
              hour: 'numeric',
              minute: slotDuration === 30 ? '2-digit' : undefined,
              hour12: timeFormat === '12-hour',
            }).format(time.toDate())}
          </span>
        </div>
      ))}
    </div>
  )
}
