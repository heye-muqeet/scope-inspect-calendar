import type {
  CalendarEvent,
  WeekDays,
  BusinessHours,
  VisibleHours,
} from '@/components/types'
import type { EventFormProps } from '@/components/event-form/event-form'
import React from 'react'
import type dayjs from '@/lib/configs/dayjs-config'
import type { Translations, TranslatorFunction } from '@/lib/translations/types'
import type { CalendarView, TimeFormat } from '@/types'
import type { RRuleOptions } from '@/features/recurrence/types'

/**
 * Time slot block definition for a team member.
 * Represents unavailable time slots that override business hours (e.g., scheduled meetings, breaks, training sessions).
 * Supports both one-time blocks and recurring blocks using RRULE patterns.
 */
export interface BlockedSlot {
  /** Start date and time of the blocked slot */
  start: dayjs.Dayjs | Date | string
  /** End date and time of the blocked slot */
  end: dayjs.Dayjs | Date | string
  /** Optional reason for the block (e.g., 'Team meeting', 'Lunch break', 'Training session') */
  reason?: string
  /**
   * Recurrence rule for recurring blocked slots (RFC 5545 standard).
   * If provided, this block repeats according to the rule.
   * @example { freq: 'WEEKLY', interval: 1, byweekday: ['MO', 'WE', 'FR'] } // Every Monday, Wednesday, Friday
   * @example { freq: 'DAILY', interval: 1, count: 30 } // Daily for 30 occurrences
   */
  rrule?: RRuleOptions
  /**
   * Exception dates (EXDATE) - dates to exclude from recurring blocks.
   * Uses ISO string format for storage and transmission.
   * @example ['2024-01-15T12:00:00.000Z', '2024-01-22T12:00:00.000Z']
   */
  exdates?: string[]
}

/**
 * Schedule time range for available slots
 */
export interface AvailableSchedule {
  /** Start time in format 'HH:mm A' or 'HH:mm' (e.g., '12:00 AM', '09:00') */
  start: string
  /** End time in format 'HH:mm A' or 'HH:mm' (e.g., '11:30 PM', '17:00') */
  end: string
}

/**
 * Recurring available slot configuration for a specific day of the week
 */
export interface RecurringAvailableDay {
  /** Array of time schedules for this day */
  schedule: AvailableSchedule[]
  /** Whether this day's schedule is enabled */
  enabled: boolean
}

/**
 * Recurring available slots configuration
 * Maps day names to their schedules
 */
export interface RecurringAvailableSlots {
  /** Monday schedule */
  mon?: RecurringAvailableDay
  /** Tuesday schedule */
  tue?: RecurringAvailableDay
  /** Wednesday schedule */
  wed?: RecurringAvailableDay
  /** Thursday schedule */
  thu?: RecurringAvailableDay
  /** Friday schedule */
  fri?: RecurringAvailableDay
  /** Saturday schedule */
  sat?: RecurringAvailableDay
  /** Sunday schedule */
  sun?: RecurringAvailableDay
}

/**
 * One-time available slot configuration
 */
export interface OneTimeAvailableSlot {
  /** Date in format 'DD-MM-YYYY' (e.g., '24-04-2024') */
  date: string
  /** Array of time schedules for this date */
  schedule: AvailableSchedule[]
  /** Whether this slot is enabled */
  enabled: boolean
}

/**
 * Available slots configuration for a resource
 * Uses inverted logic: only defined slots are available; all others are blocked
 */
export interface AvailableSlots {
  /** Recurring weekly schedule */
  recurring?: RecurringAvailableSlots
  /** One-time specific date schedules */
  one_time?: OneTimeAvailableSlot[]
}

/**
 * Time-off request status
 */
export type TimeOffStatus = 'pending' | 'approved' | 'rejected'

/**
 * Time-off request for a team member.
 * Represents when a team member is on leave (vacation, sick leave, personal days, etc.).
 */
export interface TimeOff {
  /** Unique identifier for the time-off request */
  id: string | number
  /** Title/description of the time-off request (e.g., 'Annual Vacation', 'Sick Leave', 'Personal Day') */
  title: string
  /** Start date and time of the time-off */
  start: dayjs.Dayjs | Date | string
  /** End date and time of the time-off */
  end: dayjs.Dayjs | Date | string
  /** Status of the time-off request (pending approval, approved, or rejected) */
  status: TimeOffStatus
  /** Optional additional notes about the time-off request */
  notes?: string
}

/**
 * Resource interface representing a team member in an organization.
 * Each resource is a team member who can be scheduled for events, have blocked time slots,
 * and request time off.
 */
export interface Resource {
  /** Unique identifier for the team member */
  id: string | number
  /** Display name of the team member */
  name: string
  /**
   * Color for the team member (supports CSS color values, hex, rgb, hsl, or CSS class names)
   * @example "#3b82f6", "blue-500", "rgb(59, 130, 246)"
   */
  color?: string
  /**
   * Background color for the team member (supports CSS color values, hex, rgb, hsl, or CSS class names)
   * @example "#dbeafe", "blue-100", "rgba(59, 130, 246, 0.1)"
   */
  backgroundColor?: string
  /** Optional position for team member display order */
  position?: number
  /**
   * Blocked time slots for this team member (e.g., scheduled meetings, breaks, unavailability).
   * These slots override business hours and make the team member unavailable for scheduling.
   * @deprecated Use `availableSlots` instead for better control. If both are provided, `availableSlots` takes precedence.
   * @example [{ start: '2024-01-15T12:00:00', end: '2024-01-15T13:00:00', reason: 'Lunch break' }]
   * @example [{ start: '2024-01-15T14:00:00', end: '2024-01-15T15:00:00', reason: 'Training session' }]
   */
  blockedSlots?: BlockedSlot[]
  /**
   * Available time slots for this team member.
   * Uses inverted logic: only slots defined here are available; all other times are blocked.
   * Supports both recurring (weekly) and one-time schedules.
   * If provided, this takes precedence over `blockedSlots` and `businessHours`.
   * @example
   * {
   *   recurring: {
   *     mon: { schedule: [{start: '09:00 AM', end: '05:00 PM'}], enabled: true },
   *     tue: { schedule: [{start: '09:00 AM', end: '05:00 PM'}], enabled: true },
   *   },
   *   one_time: [
   *     { date: '24-04-2024', schedule: [{start: '11:00 AM', end: '01:30 PM'}], enabled: true }
   *   ]
   * }
   */
  availableSlots?: AvailableSlots
  /**
   * Time-off requests for this team member (vacation, sick leave, personal days, etc.).
   * All time-offs (pending and approved) block availability, making the team member unavailable during these periods.
   * Only rejected time-offs do not block availability.
   * @example [{ id: '1', title: 'Annual Vacation', start: '2024-01-20', end: '2024-01-25', status: 'approved' }]
   * @example [{ id: '2', title: 'Sick Leave', start: '2024-01-28', end: '2024-01-28', status: 'pending' }]
   */
  timeOffs?: TimeOff[]
}

/**
 * This interface extends the base CalendarEvent but allows more flexible date types
 * for the start and end properties. The component will automatically convert these
 * to dayjs objects internally for consistent date handling.
 *
 * @interface ScopeInspectCalendarPropEvent
 * @extends {Omit<CalendarEvent, 'start' | 'end'>}
 */
export interface ScopeInspectCalendarPropEvent
  extends Omit<CalendarEvent, 'start' | 'end'> {
  start: dayjs.Dayjs | Date | string
  end: dayjs.Dayjs | Date | string
}

/**
 * Information passed to the onCellClick callback.
 * Uses named properties for extensibility.
 */
export interface CellClickInfo {
  /** Start date/time of the clicked cell */
  start: dayjs.Dayjs
  /** End date/time of the clicked cell */
  end: dayjs.Dayjs
  /** Resource ID if clicking on a resource calendar cell (optional) */
  resourceId?: string | number
}

export interface ScopeInspectCalendarProps {
  /**
   * Calendar display type.
   * - 'agenda': Standard calendar view (default if not provided)
   * - 'timeline': Resource/timeline calendar view
   * @default 'agenda'
   */
  type?: 'agenda' | 'timeline'
  /**
   * Array of events to display in the calendar.
   */
  events?: ScopeInspectCalendarPropEvent[]
  /**
   * The first day of the week to display in the calendar.
   * Can be 'sunday', 'monday', etc. Defaults to 'sunday'.
   */
  firstDayOfWeek?: WeekDays
  /**
   * The initial view to display when the calendar loads.
   * Defaults to 'month'.
   */
  initialView?: CalendarView
  /**
   * The initial date to display when the calendar loads.
   * If not provided, the calendar will default to today's date.
   */
  initialDate?: dayjs.Dayjs | Date | string
  /**
   * Custom render function for calendar events.
   * If provided, it will override the default event rendering.
   */
  renderEvent?: (event: CalendarEvent) => React.ReactNode
  /**
   * Callback when an event is clicked.
   * Provides the clicked event object.
   */
  onEventClick?: (event: CalendarEvent) => void
  /**
   * Callback when a calendar cell is clicked.
   * Provides cell information including start/end dates and optional resourceId.
   */
  onCellClick?: (info: CellClickInfo) => void
  /**
   * Callback when the calendar view changes (month, week, day, year).
   * Useful for syncing with external state or analytics.
   */
  onViewChange?: (view: CalendarView) => void
  /**
   * Callback when a new event is added to the calendar.
   * Provides the newly created event object.
   */
  onEventAdd?: (event: CalendarEvent) => void
  /**
   * Callback when an existing event is updated.
   * Provides the updated event object.
   */
  onEventUpdate?: (event: CalendarEvent) => void
  /**
   * Callback when an event is deleted from the calendar.
   * Provides the deleted event object.
   */
  onEventDelete?: (event: CalendarEvent) => void
  /**
   * Callback when the current date changes (navigation).
   * Provides the new current date.
   */
  onDateChange?: (date: dayjs.Dayjs) => void
  /**
   * Locale to use for formatting dates and times.
   * If not provided, the default locale will be used.
   */
  locale?: string
  /**
   * Translations object for internationalization.
   * Provide either this OR translator function, not both.
   */
  translations?: Translations
  /**
   * Translator function for internationalization.
   * Provide either this OR translations object, not both.
   */
  translator?: TranslatorFunction
  /**
   * Timezone to use for displaying dates and times.
   * If not provided, the local timezone will be used.
   */
  timezone?: string
  /**
   * Whether to disable click events on calendar cells.
   * Useful for read-only views or when cell clicks are not needed.
   */
  disableCellClick?: boolean
  /**
   * Whether to disable click events on calendar events.
   * Useful for read-only views or when event clicks are not needed.
   */
  disableEventClick?: boolean
  /**
   * Whether to disable drag-and-drop functionality for calendar events.
   * Useful for read-only views or when drag-and-drop is not needed.
   */
  disableDragAndDrop?: boolean
  /**
   * Maximum number of events to display per day in month view.
   * Additional events will be hidden and can be viewed via a "more" link.
   * Defaults to 3 if not specified.
   */
  dayMaxEvents?: number
  /**
   * Whether to stick the view header to the top of the calendar.
   * Useful for keeping the header visible while scrolling.
   */
  stickyViewHeader?: boolean
  /**
   * Custom class name for the view header.
   * Useful for applying custom styles or themes.
   */
  viewHeaderClassName?: string
  /**
   * Custom header component to replace the default calendar header.
   * Useful for adding custom branding or additional controls.
   */
  headerComponent?: React.ReactNode
  /**
   * Custom class name for the calendar header.
   * Useful for applying custom styles to the header.
   */
  headerClassName?: string
  /**
   * Configuration for business hours.
   * Defines the working hours to be highlighted on the calendar.
   */
  businessHours?: BusinessHours
  /**
   * Configuration for visible hours on the calendar.
   * Controls which time range is displayed on the calendar's vertical time scale.
   * This is independent from businessHours which controls interaction rules.
   */
  visibleHours?: VisibleHours
  /**
   * Duration of each time slot in the calendar grid.
   * Controls the granularity of time slots displayed in day and week views.
   * @default 60
   */
  slotDuration?: 30 | 60
  /**
   * Custom render function for the event form.
   * If provided, it will override the default event form component.
   * The function receives EventFormProps and should return a React node.
   */
  renderEventForm?: (props: EventFormProps) => React.ReactNode
  /**
   * Time format for displaying times in the calendar.
   * - "12-hour": Times displayed as "1:00 PM" (default)
   * - "24-hour": Times displayed as "13:00"
   */
  timeFormat?: TimeFormat
  /**
   * Array of resources (only used when type is 'timeline').
   * Resources represent people, rooms, equipment, etc. that can be assigned to events.
   */
  resources?: Resource[]
  /**
   * Custom render function for resources (only used when type is 'timeline').
   * If provided, it will override the default resource rendering.
   */
  renderResource?: (resource: Resource) => React.ReactNode
}
