import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useResourceCalendarContext } from '@/features/resource-calendar/contexts/resource-calendar-context'
import type dayjs from '@/lib/configs/dayjs-config'
import { ResourceEventsLayer } from './resource-events-layer'
import { GridCell } from '@/components/grid-cell'
import { cn } from '@/lib'
import { useEffect, useRef, useState } from 'react'

interface ResourceEventGridProps {
  /**
   * Array of days to display in the grid
   */
  days: dayjs.Dayjs[]
  /** The type of grid to display - 'day' for day view, 'hour' for week view
   * (affects event positioning logic)
   */
  gridType?: 'day' | 'hour'
  /**
   * Children will be rendered as headers above the grid
   * (e.g., for day names in month view)
   */
  children?: React.ReactNode
}

export const ResourceEventGrid: React.FC<ResourceEventGridProps> = ({
  days,
  gridType = 'day',
  children,
}) => {
  const { currentDate, getVisibleResources, dayMaxEvents, renderResource } =
    useResourceCalendarContext()

  const visibleResources = getVisibleResources()
  const [resourceColumnWidth, setResourceColumnWidth] = useState<number>(160) // Default w-40 = 160px
  const measureContainerRef = useRef<HTMLDivElement>(null)

  const rows = visibleResources.map((resource) => ({
    id: resource.id,
    name: resource.name,
    resource: resource,
    cells: days.map((day) => ({
      label: day.format('D'),
      value: day,
      id: day.toISOString(),
    })),
  }))

  // Measure the width of rendered resource content
  useEffect(() => {
    if (!renderResource || !measureContainerRef.current) {
      setResourceColumnWidth(160) // Default w-40
      return
    }

    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      const container = measureContainerRef.current
      if (!container) return

      let maxWidth = 160 // Minimum width (w-40)

      // Measure each resource content
      const children = container.children
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLElement
        const width = child.scrollWidth
        if (width > maxWidth) {
          maxWidth = width
        }
      }

      // Add padding (p-2 = 0.5rem = 8px on each side = 16px total)
      const padding = 16
      setResourceColumnWidth(maxWidth + padding)
    })
  }, [renderResource, visibleResources])

  return (
    <>
      {/* Hidden measurement container for custom renderResource */}
      {renderResource && (
        <div
          ref={measureContainerRef}
          className="invisible absolute -z-50 flex flex-col"
          style={{ position: 'absolute', left: '-9999px' }}
        >
          {visibleResources.map((resource) => (
            <div key={resource.id} className="p-2">
              {renderResource(resource)}
            </div>
          ))}
        </div>
      )}
      <ScrollArea
        className="h-full"
        data-testid="month-scroll-area"
        viewPortProps={{ className: '*:flex! *:flex-col! *:min-h-full' }}
        style={{ '--resource-column-width': `${resourceColumnWidth}px` } as React.CSSProperties}
      >
        {/* header row */}
        {children}

        {/* Calendar area with scroll */}
        <div className="flex flex-1 h-[calc(100%-3rem)] w-fit">
        <div
          key={currentDate.format('YYYY-MM')}
          className="relative w-full flex flex-col"
        >
          {rows.map((row) => (
            <div key={row.id} className="flex flex-1 relative min-h-[60px] ">
              <div
                className={cn(
                  !renderResource && 'w-40',
                  'border-b border-r p-2 flex shrink-0 sticky left-0 z-20',
                  row.resource.color || '',
                  row.resource.backgroundColor || 'bg-background'
                )}
                style={{
                  color: row.resource.color,
                  backgroundColor: row.resource.backgroundColor,
                  ...(renderResource && { width: `${resourceColumnWidth}px`, minWidth: `${resourceColumnWidth}px` }),
                }}
              >
                {renderResource ? (
                  <div className="w-full">{renderResource(row.resource)}</div>
                ) : (
                  <div className="wrap-break-word text-sm">{row.name}</div>
                )}
              </div>

              <div className="relative flex-1 flex">
                {row.cells.map((cell) => (
                  <GridCell
                    key={cell.id}
                    index={cell.value.day()}
                    day={cell.value}
                    resourceId={row.id}
                    dayMaxEvents={dayMaxEvents}
                    gridType={gridType}
                    className="border-r border-b w-20"
                  />
                ))}

                {/* Events layer positioned absolutely over the resource row */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  <ResourceEventsLayer
                    days={days}
                    resourceId={row.id}
                    gridType={gridType}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
    </>
  )
}
