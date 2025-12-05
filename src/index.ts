// Main calendar components
export { ScopeInspectCalendar } from './features/calendar/components/scope-inspect-calendar'
export { ScopeInspectResourceCalendar } from './features/resource-calendar/components/scope-inspect-resource-calendar/scope-inspect-resource-calendar'

// Public calendar context hooks
export { useScopeInspectCalendarContext } from './features/calendar/contexts/calendar-context/context'
export { useScopeInspectResourceCalendarContext } from './features/resource-calendar/contexts/resource-calendar-context/context'

// RRULE-based recurrence system
export {
  generateRecurringEvents,
  isRecurringEvent,
} from '@/features/recurrence/utils/recurrence-handler'

// Export types
export type { RRuleOptions } from '@/features/recurrence/types'
export type { CalendarEvent } from './components/types'
export type { EventFormProps } from './components/event-form/event-form'
export type {
  ScopeInspectCalendarProps,
  CellClickInfo,
} from './features/calendar/types'
export type { ScopeInspectResourceCalendarProps } from './features/resource-calendar/components/scope-inspect-resource-calendar'
export type { WeekDays } from './components/types'
export type { UseScopeInspectCalendarContextReturn } from './features/calendar/contexts/calendar-context/context'
export type { UseScopeInspectResourceCalendarContextReturn } from './features/resource-calendar/contexts/resource-calendar-context/context'
export type { CalendarView, TimeFormat } from './types'

// Resource calendar types
export type { Resource } from './features/resource-calendar/types'
// Re-export rrule.js types for convenience
export type { Frequency, Weekday } from 'rrule'
export { RRule } from 'rrule'

// Translation system
export type {
  Translations,
  TranslationKey,
  TranslatorFunction,
} from './lib/translations/types'
export { defaultTranslations } from './lib/translations/default'
