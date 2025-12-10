import type {
  ScopeInspectCalendarProps,
  ScopeInspectCalendarPropEvent,
  Resource,
  BlockedSlots,
  TimeOff,
  TimeOffStatus,
} from '@/features/calendar/types'

/**
 * Public-facing resource calendar event interface with flexible date types.
 * Similar to ScopeInspectCalendarPropEvent but with team member assignment fields.
 * Dates can be provided as dayjs.Dayjs, Date, or string and will be normalized internally.
 *
 * @interface ScopeInspectResourceCalendarPropEvent
 * @extends {ScopeInspectCalendarPropEvent}
 */
export interface ScopeInspectResourceCalendarPropEvent
  extends ScopeInspectCalendarPropEvent {
  /** Single team member (resource) assignment */
  resourceId?: string | number
  /** Multiple team member (resource) assignment (cross-resource events, e.g., team meetings) */
  resourceIds?: (string | number)[]
}

export interface ScopeInspectResourceCalendarProps
  extends Omit<ScopeInspectCalendarProps, 'events'> {
  /** Array of events to display */
  events?: ScopeInspectResourceCalendarPropEvent[]
  /** Array of team members (resources) to display in the calendar */
  resources?: Resource[]
  /** Custom render function for team member (resource) cells */
  renderResource?: (resource: Resource) => React.ReactNode
}

// Re-export types from calendar types for convenience
export type {
  Resource,
  BlockedSlots,
  TimeOff,
  TimeOffStatus,
} from '@/features/calendar/types'
