import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { WeekDays } from '@/components/types'
import type { CalendarView, TimeFormat } from '@/types'
import dayjs from '@/lib/configs/dayjs-config'
import { ModeToggle } from './mode-toggle'

interface DemoCalendarSettingsProps {
  // Calendar type
  calendarType: 'regular' | 'resource'
  setCalendarType: (value: 'regular' | 'resource') => void
  firstDayOfWeek: WeekDays
  setFirstDayOfWeek: (value: WeekDays) => void
  initialView: CalendarView
  setInitialView: (value: CalendarView) => void
  initialDate: dayjs.Dayjs | undefined
  setInitialDate: (value: dayjs.Dayjs | undefined) => void
  useCustomEventRenderer: boolean
  setUseCustomEventRenderer: (value: boolean) => void
  useCustomResourceRenderer: boolean
  setUseCustomResourceRenderer: (value: boolean) => void
  locale: string
  setLocale: (value: string) => void
  timezone: string
  setTimezone: (value: string) => void
  disableCellClick: boolean
  setDisableCellClick: (value: boolean) => void
  disableEventClick: boolean
  setDisableEventClick: (value: boolean) => void
  disableDragAndDrop: boolean
  setDisableDragAndDrop: (value: boolean) => void
  useCustomOnDateClick: boolean
  setUseCustomOnDateClick: (value: boolean) => void
  useCustomOnEventClick: boolean
  setUseCustomOnEventClick: (value: boolean) => void
  calendarHeight: string
  setCalendarHeight: (value: string) => void
  dayMaxEvents: number
  setDayMaxEvents: (value: number) => void
  stickyViewHeader?: boolean
  setStickyHeader?: (value: boolean) => void
  timeFormat: TimeFormat
  setTimeFormat: (value: TimeFormat) => void
  businessHours: {
    daysOfWeek: WeekDays[]
    startTime: number
    endTime: number
  }
  setBusinessHours: (value: {
    daysOfWeek: WeekDays[]
    startTime: number
    endTime: number
  }) => void
  visibleHours: {
    startTime: number
    endTime: number
  }
  setVisibleHours: (value: { startTime: number; endTime: number }) => void
  slotDuration: 30 | 60
  setSlotDuration: (value: 30 | 60) => void
  showDemoEvents: boolean
  setShowDemoEvents: (value: boolean) => void
  // Resource calendar specific props
  isResourceCalendar?: boolean
}

export function DemoCalendarSettings({
  calendarType,
  setCalendarType,
  firstDayOfWeek,
  setFirstDayOfWeek,
  initialView,
  setInitialView,
  initialDate,
  setInitialDate,
  useCustomEventRenderer,
  setUseCustomEventRenderer,
  useCustomResourceRenderer,
  setUseCustomResourceRenderer,
  locale,
  setLocale,
  disableCellClick,
  setDisableCellClick,
  disableEventClick,
  setDisableEventClick,
  disableDragAndDrop,
  setDisableDragAndDrop,
  useCustomOnDateClick,
  setUseCustomOnDateClick,
  useCustomOnEventClick,
  setUseCustomOnEventClick,
  calendarHeight,
  setCalendarHeight,
  dayMaxEvents,
  setDayMaxEvents,
  stickyViewHeader,
  setStickyHeader,
  timeFormat,
  setTimeFormat,
  businessHours,
  setBusinessHours,
  visibleHours,
  setVisibleHours,
  slotDuration,
  setSlotDuration,
  showDemoEvents,
  setShowDemoEvents,
  // Resource calendar props
  isResourceCalendar,
}: DemoCalendarSettingsProps) {
  return (
    <Card className="border bg-background backdrop-blur-md shadow-lg overflow-clip gap-0">
      <CardHeader className="border-b border-white/10 dark:border-white/5 p-4">
        <CardTitle className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
          Calendar Settings
        </CardTitle>
        <CardDescription>Customize the calendar display</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div>
          <ModeToggle />
        </div>
        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Calendar Type
          </label>
          <Select
            value={calendarType}
            onValueChange={(value) =>
              setCalendarType(value as 'regular' | 'resource')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select calendar type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="regular">Regular Calendar</SelectItem>
              <SelectItem value="resource">Resource Calendar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-left font-medium mb-1">
            First Day of Week
          </label>
          <Select
            value={firstDayOfWeek}
            onValueChange={(value) => setFirstDayOfWeek(value as WeekDays)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select first day of week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunday">Sunday</SelectItem>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
              <SelectItem value="saturday">Saturday</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Initial View
          </label>
          <Select
            value={initialView}
            onValueChange={(value) => setInitialView(value as CalendarView)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select initial view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              {!isResourceCalendar && (
                <SelectItem value="year">Year</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Initial Date
          </label>
          <Select
            value={
              initialDate === undefined
                ? 'today'
                : initialDate.isSame(dayjs().startOf('month'), 'day')
                  ? 'start-of-month'
                  : initialDate.isSame(dayjs().startOf('year'), 'day')
                    ? 'start-of-year'
                    : initialDate.isSame(dayjs().add(1, 'month'), 'month')
                      ? 'next-month'
                      : 'custom'
            }
            onValueChange={(value) => {
              if (value === 'today') {
                setInitialDate(undefined)
              } else if (value === 'start-of-month') {
                setInitialDate(dayjs().startOf('month'))
              } else if (value === 'start-of-year') {
                setInitialDate(dayjs().startOf('year'))
              } else if (value === 'next-month') {
                setInitialDate(dayjs().add(1, 'month').startOf('month'))
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select initial date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today (Default)</SelectItem>
              <SelectItem value="start-of-month">Start of Month</SelectItem>
              <SelectItem value="start-of-year">Start of Year</SelectItem>
              <SelectItem value="next-month">Next Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Locale
          </label>
          <Select value={locale} onValueChange={setLocale}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select locale" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="cs">Čeština</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="it">Italiano</SelectItem>
              <SelectItem value="pt">Português</SelectItem>
              <SelectItem value="ru">Русский</SelectItem>
              <SelectItem value="zh">中文</SelectItem>
              <SelectItem value="ja">日本語</SelectItem>
              <SelectItem value="ko">한국어</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* <div>
          <label className="block text-sm text-left font-medium mb-1">Timezone</label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {Intl.supportedValuesOf('timeZone').map((tz) => (
                <SelectItem key={tz} value={tz}>
                  {tz}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Calendar Height
          </label>
          <Select value={calendarHeight} onValueChange={setCalendarHeight}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">Auto</SelectItem>
              <SelectItem value="300px">Extra Small (300px)</SelectItem>
              <SelectItem value="400px">Small (400px)</SelectItem>
              <SelectItem value="600px">Medium (600px)</SelectItem>
              <SelectItem value="800px">Large (800px)</SelectItem>
              <SelectItem value="1000px">Extra Large (1000px)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Max Events Per Day
          </label>
          <Select
            value={dayMaxEvents?.toString()}
            onValueChange={(value) => setDayMaxEvents(Number.parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select max events" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 event</SelectItem>
              <SelectItem value="2">2 events</SelectItem>
              <SelectItem value="3">3 events</SelectItem>
              <SelectItem value="4">4 events</SelectItem>
              <SelectItem value="5">5 events</SelectItem>
              <SelectItem value="999">No limit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-left font-medium mb-1">
            Time Format
          </label>
          <Select value={timeFormat} onValueChange={setTimeFormat}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12-hour">12-hour (1:00 PM)</SelectItem>
              <SelectItem value="24-hour">24-hour (13:00)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div>
            <label className="block text-sm text-left font-medium mb-2">
              Business Hours
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-left text-muted-foreground mb-2">
                  Days of Week
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      'monday',
                      'tuesday',
                      'wednesday',
                      'thursday',
                      'friday',
                      'saturday',
                      'sunday',
                    ] as WeekDays[]
                  ).map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={`business-day-${day}`}
                        checked={businessHours.daysOfWeek.includes(day)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setBusinessHours({
                              ...businessHours,
                              daysOfWeek: [...businessHours.daysOfWeek, day],
                            })
                          } else {
                            setBusinessHours({
                              ...businessHours,
                              daysOfWeek: businessHours.daysOfWeek.filter(
                                (d) => d !== day
                              ),
                            })
                          }
                        }}
                      />
                      <label
                        htmlFor={`business-day-${day}`}
                        className="text-xs font-medium leading-none cursor-pointer capitalize"
                      >
                        {day.slice(0, 3)}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-left text-muted-foreground mb-1">
                    Start Time (24h)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="23"
                    value={businessHours.startTime}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value, 10)
                      if (!Number.isNaN(value) && value >= 0 && value <= 23) {
                        setBusinessHours({
                          ...businessHours,
                          startTime: value,
                        })
                      }
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-left text-muted-foreground mb-1">
                    End Time (24h)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    value={businessHours.endTime}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value, 10)
                      if (!Number.isNaN(value) && value >= 0 && value <= 24) {
                        setBusinessHours({
                          ...businessHours,
                          endTime: value,
                        })
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 space-y-4">
          <div>
            <label className="block text-sm text-left font-medium mb-2">
              Visible Hours
            </label>
            <div className="text-xs text-muted-foreground mb-3">
              Controls which time range is displayed on the calendar's vertical
              time scale. This is independent from business hours.
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-left text-muted-foreground mb-1">
                  Start Time (24h)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="23"
                  value={visibleHours.startTime}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (!Number.isNaN(value) && value >= 0 && value <= 23) {
                      setVisibleHours({
                        ...visibleHours,
                        startTime: value,
                      })
                    }
                  }}
                />
              </div>
              <div>
                <label className="block text-xs text-left text-muted-foreground mb-1">
                  End Time (24h)
                </label>
                <Input
                  type="number"
                  min="0"
                  max="24"
                  value={visibleHours.endTime}
                  onChange={(e) => {
                    const value = Number.parseInt(e.target.value, 10)
                    if (!Number.isNaN(value) && value >= 0 && value <= 24) {
                      setVisibleHours({
                        ...visibleHours,
                        endTime: value,
                      })
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div>
            <label className="block text-sm text-left font-medium mb-1">
              Slot Duration
            </label>
            <div className="text-xs text-muted-foreground mb-2">
              Duration of each time slot in the calendar grid. Controls the
              granularity of time slots displayed in day and week views.
            </div>
            <Select
              value={slotDuration.toString()}
              onValueChange={(value) =>
                setSlotDuration(Number.parseInt(value, 10) as 30 | 60)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select slot duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">60 minutes (1 hour)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="stickyViewHeader"
            checked={stickyViewHeader}
            onCheckedChange={() => setStickyHeader?.(!stickyViewHeader)}
          />
          <label
            htmlFor="stickyViewHeader"
            className="text-sm font-medium leading-none cursor-pointer ml-2"
          >
            Enable sticky header
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="customRenderer"
            checked={useCustomEventRenderer}
            onCheckedChange={() =>
              setUseCustomEventRenderer(!useCustomEventRenderer)
            }
          />
          <label
            htmlFor="customRenderer"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Use custom event renderer
          </label>
        </div>

        {isResourceCalendar && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="customResourceRenderer"
              checked={useCustomResourceRenderer}
              onCheckedChange={() =>
                setUseCustomResourceRenderer(!useCustomResourceRenderer)
              }
            />
            <label
              htmlFor="customResourceRenderer"
              className="text-sm font-medium leading-none cursor-pointer"
            >
              Use custom resource renderer
            </label>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="useCustomOnDateClick"
            checked={useCustomOnDateClick}
            onCheckedChange={() =>
              setUseCustomOnDateClick(!useCustomOnDateClick)
            }
          />
          <label
            htmlFor="useCustomOnDateClick"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Use custom onCellClick handler
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="useCustomOnEventClick"
            checked={useCustomOnEventClick}
            onCheckedChange={() =>
              setUseCustomOnEventClick(!useCustomOnEventClick)
            }
          />
          <label
            htmlFor="useCustomOnEventClick"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Use custom onEventClick handler
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="disableCellClick"
            checked={disableCellClick}
            onCheckedChange={() => setDisableCellClick(!disableCellClick)}
          />
          <label
            htmlFor="disableCellClick"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Disable cell clicks
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="disableEventClick"
            checked={disableEventClick}
            onCheckedChange={() => setDisableEventClick(!disableEventClick)}
          />
          <label
            htmlFor="disableEventClick"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Disable event clicks
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="disableDragAndDrop"
            checked={disableDragAndDrop}
            onCheckedChange={() => setDisableDragAndDrop(!disableDragAndDrop)}
          />
          <label
            htmlFor="disableDragAndDrop"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Disable drag & drop
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showDemoEvents"
            checked={showDemoEvents}
            onCheckedChange={() => setShowDemoEvents(!showDemoEvents)}
          />
          <label
            htmlFor="showDemoEvents"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Show demo events
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
