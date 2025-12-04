import { useCalendarContext } from '@/features/calendar/contexts/calendar-context/context'
import dayjs from '@/lib/configs/dayjs-config'
import { useMemo } from 'react'
import { getVisibleHours } from '@/features/calendar/utils/visible-hours'

interface DayTimeColProps {
  className?: string
}

export const DayTimeCol: React.FC<DayTimeColProps> = ({ className }) => {
  const { currentLocale, timeFormat, visibleHours } = useCalendarContext()

  // Get visible hours based on configuration
  const hours = useMemo(
    () => getVisibleHours(visibleHours),
    [visibleHours]
  )

  return (
    <div
      data-testid="day-time-col"
      className={`col-span-2 h-full md:col-span-1 ${className}`}
    >
      {hours.map((time) => (
        <div
          key={time.format('HH:mm')}
          data-testid={`day-time-hour-${time.format('HH')}`}
          className="h-[60px] border-b text-right"
        >
          <span className="text-muted-foreground pr-2 text-right text-[10px] sm:text-xs">
            {Intl.DateTimeFormat(currentLocale, {
              hour: 'numeric',
              hour12: timeFormat === '12-hour',
            }).format(time.toDate())}
          </span>
        </div>
      ))}
    </div>
  )
}
