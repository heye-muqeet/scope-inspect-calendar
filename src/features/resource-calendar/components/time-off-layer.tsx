import React from 'react'
import type dayjs from '@/lib/configs/dayjs-config'
import { useResourceCalendarContext } from '../contexts/resource-calendar-context'
import { cn } from '@/lib/utils'

interface TimeOffLayerProps {
  /** The resource ID to show time-offs for */
  resourceId: string | number
  /** The day to check for time-offs */
  day: dayjs.Dayjs
  /** Grid type - affects how time-offs are positioned */
  gridType?: 'day' | 'hour'
}

export const TimeOffLayer: React.FC<TimeOffLayerProps> = ({
  resourceId,
  day,
  gridType = 'day',
}) => {
  const { getTimeOffsForSlot } = useResourceCalendarContext()

  // For day-level grids, check for all-day time-offs
  // For hour-level grids, check time-specific time-offs
  const timeOffs = React.useMemo(() => {
    if (gridType === 'day') {
      // Check if there's any time-off for this day
      return getTimeOffsForSlot(resourceId, day)
    }
    // For hour views, check each hour
    return getTimeOffsForSlot(resourceId, day, day.hour())
  }, [resourceId, day, gridType, getTimeOffsForSlot])

  if (timeOffs.length === 0) {
    return null
  }

  return (
    <div className="absolute inset-0 z-5 pointer-events-none">
      {timeOffs.map((timeOff) => {
        // Style to match disabled cells - grey background, muted text
        // Status indicator as a small badge instead of colored background
        const statusBadgeClass =
          timeOff.status === 'approved'
            ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-300 dark:border-orange-700'
            : timeOff.status === 'pending'
              ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700'
              : 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700'

        return (
          <div
            key={timeOff.id}
            className={cn(
              'absolute inset-x-1 rounded text-xs p-1.5',
              'bg-secondary/50 text-muted-foreground'
            )}
            title={`Time Off: ${timeOff.title} (${timeOff.status})`}
          >
            <div className="font-medium truncate text-[11px] mb-0.5">
              {timeOff.title}
            </div>
            <div
              className={cn(
                'inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-medium border',
                statusBadgeClass
              )}
            >
              {timeOff.status}
            </div>
          </div>
        )
      })}
    </div>
  )
}
