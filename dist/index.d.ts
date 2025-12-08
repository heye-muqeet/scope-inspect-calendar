import React4 from "react";
import dayjs from "dayjs";
import { Options } from "rrule";
/**
* Re-rrule.js Options with practical TypeScript interface.
* Makes all properties optional except freq and dtstart (which are required by RFC 5545).
* This allows clean object creation without needing explicit null values.
*
* @see https://tools.ietf.org/html/rfc5545 - RFC 5545 iCalendar specification
* @see https://github.com/jakubroztocil/rrule - rrule.js library documentation
*/
type RRuleOptions = {
	/**
	* The frequency of the event. Must be one of the following: DAILY, WEEKLY, MONTHLY, etc.
	*/
	freq: Options["freq"];
	/**
	* The start date of the recurrence rule. This defines when the recurrence pattern begins.
	* Required for proper RRULE functionality according to RFC 5545.
	* @important Same as the event start date.
	*/
	dtstart: Date;
} & Partial<Omit<Options, "freq" | "dtstart">>;
/**
* Core calendar event interface representing a single calendar event.
* This is the primary data structure for calendar events.
*/
interface CalendarEvent {
	/** Unique identifier for the event */
	id: string | number;
	/** Display title of the event */
	title: string;
	/** Start date and time of the event */
	start: dayjs.Dayjs;
	/** End date and time of the event */
	end: dayjs.Dayjs;
	/**
	* Color for the event (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#3b82f6", "blue-500", "rgb(59, 130, 246)"
	*/
	color?: string;
	/**
	* Background color for the event (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#dbeafe", "blue-100", "rgba(59, 130, 246, 0.1)"
	*/
	backgroundColor?: string;
	/** Optional description or notes for the event */
	description?: string;
	/** Optional location where the event takes place */
	location?: string;
	/**
	* Whether this is an all-day event
	* @default false
	*/
	allDay?: boolean;
	/**
	* Recurrence rule for recurring events (RFC 5545 standard)
	*
	* Uses TypeScript interface for better readability, type safety, and IDE support
	* compared to RRULE string format. Converted to rrule.js format internally.
	*
	* @example { freq: 'WEEKLY', interval: 1, byweekday: ['MO', 'WE', 'FR'] }
	* @example { freq: 'DAILY', interval: 1, count: 10 }
	* @example { freq: 'MONTHLY', interval: 1, until: new Date('2025-12-31') }
	*/
	rrule?: RRuleOptions;
	/**
	* Exception dates (EXDATE) - dates to exclude from recurrence
	* Uses ISO string format for storage and transmission
	* @example ['2025-01-15T09:00:00.000Z', '2025-01-22T09:00:00.000Z']
	*/
	exdates?: string[];
	/**
	* Recurrence ID (RECURRENCE-ID) - identifies modified instances
	* Points to the original occurrence date this event modifies
	* Used for events that are modifications of recurring instances
	*/
	recurrenceId?: string;
	/**
	* UID for iCalendar compatibility
	* Unique identifier across calendar systems
	*/
	uid?: string;
	/** Single resource assignment */
	resourceId?: string | number;
	/** Multiple resource assignment (cross-resource events) */
	resourceIds?: (string | number)[];
	/**
	* Custom data associated with the event
	* Use this to store additional metadata specific to your application
	* @example { meetingType: 'standup', attendees: ['john', 'jane'] }
	*/
	data?: Record<string, any>;
}
/**
* Supported days of the week for calendar configuration.
* Used for setting the first day of the week and other week-related settings.
*/
type WeekDays = "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";
/**
* Configuration for business hours.
* Defines the working hours to be highlighted on the calendar.
*/
interface BusinessHours {
	/**
	* Days of the week to apply business hours to.
	* @default ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
	*/
	daysOfWeek?: WeekDays[];
	/**
	* Start time for business hours in 24-hour format (0-24).
	* @default 9
	*/
	startTime?: number;
	/**
	* End time for business hours in 24-hour format (0-24).
	* @default 17
	*/
	endTime?: number;
}
/**
* Configuration for visible hours on the calendar.
* Controls which time range is displayed on the calendar's vertical time scale.
* This is independent from businessHours which controls interaction rules.
*/
interface VisibleHours {
	/**
	* Start time for visible hours in 24-hour format (0-24).
	* Hours before this time will not be displayed.
	* @default 0
	*/
	startTime?: number;
	/**
	* End time for visible hours in 24-hour format (0-24).
	* Hours at or after this time will not be displayed.
	* @default 24
	*/
	endTime?: number;
}
interface EventFormProps {
	open?: boolean;
	selectedEvent?: CalendarEvent | null;
	onAdd?: (event: CalendarEvent) => void;
	onUpdate?: (event: CalendarEvent) => void;
	onDelete?: (event: CalendarEvent) => void;
	onClose: () => void;
}
import React3 from "react";
interface Translations {
	today: string;
	create: string;
	new: string;
	update: string;
	delete: string;
	cancel: string;
	export: string;
	event: string;
	events: string;
	newEvent: string;
	title: string;
	description: string;
	location: string;
	allDay: string;
	startDate: string;
	endDate: string;
	startTime: string;
	endTime: string;
	color: string;
	createEvent: string;
	editEvent: string;
	addNewEvent: string;
	editEventDetails: string;
	eventTitlePlaceholder: string;
	eventDescriptionPlaceholder: string;
	eventLocationPlaceholder: string;
	repeat: string;
	repeats: string;
	customRecurrence: string;
	daily: string;
	weekly: string;
	monthly: string;
	yearly: string;
	interval: string;
	repeatOn: string;
	never: string;
	count: string;
	every: string;
	ends: string;
	after: string;
	occurrences: string;
	on: string;
	editRecurringEvent: string;
	deleteRecurringEvent: string;
	editRecurringEventQuestion: string;
	deleteRecurringEventQuestion: string;
	thisEvent: string;
	thisEventDescription: string;
	thisAndFollowingEvents: string;
	thisAndFollowingEventsDescription: string;
	allEvents: string;
	allEventsDescription: string;
	onlyChangeThis: string;
	changeThisAndFuture: string;
	changeEntireSeries: string;
	onlyDeleteThis: string;
	deleteThisAndFuture: string;
	deleteEntireSeries: string;
	month: string;
	week: string;
	day: string;
	year: string;
	more: string;
	resources: string;
	resource: string;
	time: string;
	date: string;
	noResourcesVisible: string;
	addResourcesOrShowExisting: string;
	sunday: string;
	monday: string;
	tuesday: string;
	wednesday: string;
	thursday: string;
	friday: string;
	saturday: string;
	sun: string;
	mon: string;
	tue: string;
	wed: string;
	thu: string;
	fri: string;
	sat: string;
	january: string;
	february: string;
	march: string;
	april: string;
	may: string;
	june: string;
	july: string;
	august: string;
	september: string;
	october: string;
	november: string;
	december: string;
}
type TranslationKey = keyof Translations;
type TranslatorFunction = (key: TranslationKey | string) => string;
/**
* Available calendar view types.
*/
type CalendarView = "month" | "week" | "day" | "year";
/**
* Time format options for displaying times in the calendar.
*/
type TimeFormat = "12-hour" | "24-hour";
/**
* Resource interface representing a calendar resource (person, room, equipment, etc.)
*/
interface Resource {
	/** Unique identifier for the resource */
	id: string | number;
	/** Display name of the resource */
	name: string;
	/**
	* Color for the resource (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#3b82f6", "blue-500", "rgb(59, 130, 246)"
	*/
	color?: string;
	/**
	* Background color for the resource (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#dbeafe", "blue-100", "rgba(59, 130, 246, 0.1)"
	*/
	backgroundColor?: string;
	/** Optional position for resource display */
	position?: number;
}
/**
* This interface extends the base CalendarEvent but allows more flexible date types
* for the start and end properties. The component will automatically convert these
* to dayjs objects internally for consistent date handling.
*
* @interface ScopeInspectCalendarPropEvent
* @extends {Omit<CalendarEvent, 'start' | 'end'>}
*/
interface ScopeInspectCalendarPropEvent extends Omit<CalendarEvent, "start" | "end"> {
	start: dayjs.Dayjs | Date | string;
	end: dayjs.Dayjs | Date | string;
}
/**
* Information passed to the onCellClick callback.
* Uses named properties for extensibility.
*/
interface CellClickInfo {
	/** Start date/time of the clicked cell */
	start: dayjs.Dayjs;
	/** End date/time of the clicked cell */
	end: dayjs.Dayjs;
	/** Resource ID if clicking on a resource calendar cell (optional) */
	resourceId?: string | number;
}
interface ScopeInspectCalendarProps {
	/**
	* Calendar display type.
	* - 'agenda': Standard calendar view (default if not provided)
	* - 'timeline': Resource/timeline calendar view
	* @default 'agenda'
	*/
	type?: "agenda" | "timeline";
	/**
	* Array of events to display in the calendar.
	*/
	events?: ScopeInspectCalendarPropEvent[];
	/**
	* The first day of the week to display in the calendar.
	* Can be 'sunday', 'monday', etc. Defaults to 'sunday'.
	*/
	firstDayOfWeek?: WeekDays;
	/**
	* The initial view to display when the calendar loads.
	* Defaults to 'month'.
	*/
	initialView?: CalendarView;
	/**
	* The initial date to display when the calendar loads.
	* If not provided, the calendar will default to today's date.
	*/
	initialDate?: dayjs.Dayjs | Date | string;
	/**
	* Custom render function for calendar events.
	* If provided, it will override the default event rendering.
	*/
	renderEvent?: (event: CalendarEvent) => React3.ReactNode;
	/**
	* Callback when an event is clicked.
	* Provides the clicked event object.
	*/
	onEventClick?: (event: CalendarEvent) => void;
	/**
	* Callback when a calendar cell is clicked.
	* Provides cell information including start/end dates and optional resourceId.
	*/
	onCellClick?: (info: CellClickInfo) => void;
	/**
	* Callback when the calendar view changes (month, week, day, year).
	* Useful for syncing with external state or analytics.
	*/
	onViewChange?: (view: CalendarView) => void;
	/**
	* Callback when a new event is added to the calendar.
	* Provides the newly created event object.
	*/
	onEventAdd?: (event: CalendarEvent) => void;
	/**
	* Callback when an existing event is updated.
	* Provides the updated event object.
	*/
	onEventUpdate?: (event: CalendarEvent) => void;
	/**
	* Callback when an event is deleted from the calendar.
	* Provides the deleted event object.
	*/
	onEventDelete?: (event: CalendarEvent) => void;
	/**
	* Callback when the current date changes (navigation).
	* Provides the new current date.
	*/
	onDateChange?: (date: dayjs.Dayjs) => void;
	/**
	* Locale to use for formatting dates and times.
	* If not provided, the default locale will be used.
	*/
	locale?: string;
	/**
	* Translations object for internationalization.
	* Provide either this OR translator function, not both.
	*/
	translations?: Translations;
	/**
	* Translator function for internationalization.
	* Provide either this OR translations object, not both.
	*/
	translator?: TranslatorFunction;
	/**
	* Timezone to use for displaying dates and times.
	* If not provided, the local timezone will be used.
	*/
	timezone?: string;
	/**
	* Whether to disable click events on calendar cells.
	* Useful for read-only views or when cell clicks are not needed.
	*/
	disableCellClick?: boolean;
	/**
	* Whether to disable click events on calendar events.
	* Useful for read-only views or when event clicks are not needed.
	*/
	disableEventClick?: boolean;
	/**
	* Whether to disable drag-and-drop functionality for calendar events.
	* Useful for read-only views or when drag-and-drop is not needed.
	*/
	disableDragAndDrop?: boolean;
	/**
	* Maximum number of events to display per day in month view.
	* Additional events will be hidden and can be viewed via a "more" link.
	* Defaults to 3 if not specified.
	*/
	dayMaxEvents?: number;
	/**
	* Whether to stick the view header to the top of the calendar.
	* Useful for keeping the header visible while scrolling.
	*/
	stickyViewHeader?: boolean;
	/**
	* Custom class name for the view header.
	* Useful for applying custom styles or themes.
	*/
	viewHeaderClassName?: string;
	/**
	* Custom header component to replace the default calendar header.
	* Useful for adding custom branding or additional controls.
	*/
	headerComponent?: React3.ReactNode;
	/**
	* Custom class name for the calendar header.
	* Useful for applying custom styles to the header.
	*/
	headerClassName?: string;
	/**
	* Configuration for business hours.
	* Defines the working hours to be highlighted on the calendar.
	*/
	businessHours?: BusinessHours;
	/**
	* Configuration for visible hours on the calendar.
	* Controls which time range is displayed on the calendar's vertical time scale.
	* This is independent from businessHours which controls interaction rules.
	*/
	visibleHours?: VisibleHours;
	/**
	* Custom render function for the event form.
	* If provided, it will override the default event form component.
	* The function receives EventFormProps and should return a React node.
	*/
	renderEventForm?: (props: EventFormProps) => React3.ReactNode;
	/**
	* Time format for displaying times in the calendar.
	* - "12-hour": Times displayed as "1:00 PM" (default)
	* - "24-hour": Times displayed as "13:00"
	*/
	timeFormat?: TimeFormat;
	/**
	* Array of resources (only used when type is 'timeline').
	* Resources represent people, rooms, equipment, etc. that can be assigned to events.
	*/
	resources?: Resource[];
	/**
	* Custom render function for resources (only used when type is 'timeline').
	* If provided, it will override the default resource rendering.
	*/
	renderResource?: (resource: Resource) => React3.ReactNode;
}
declare const ScopeInspectCalendar: React4.FC<ScopeInspectCalendarProps>;
import React5 from "react";
/**
* Public-facing resource calendar event interface with flexible date types.
* Similar to ScopeInspectCalendarPropEvent but with resource assignment fields.
* Dates can be provided as dayjs.Dayjs, Date, or string and will be normalized internally.
*
* @interface ScopeInspectResourceCalendarPropEvent
* @extends {ScopeInspectCalendarPropEvent}
*/
interface ScopeInspectResourceCalendarPropEvent extends ScopeInspectCalendarPropEvent {
	/** Single resource assignment */
	resourceId?: string | number;
	/** Multiple resource assignment (cross-resource events) */
	resourceIds?: (string | number)[];
}
interface ScopeInspectResourceCalendarProps extends Omit<ScopeInspectCalendarProps, "events"> {
	/** Array of events to display */
	events?: ScopeInspectResourceCalendarPropEvent[];
	/** Array of resources */
	resources?: Resource2[];
	/** Custom render function for resources */
	renderResource?: (resource: Resource2) => React.ReactNode;
}
/**
* Resource interface representing a calendar resource (person, room, equipment, etc.)
*/
interface Resource2 {
	/** Unique identifier for the resource */
	id: string | number;
	/** Display name of the resource */
	name: string;
	/**
	* Color for the resource (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#3b82f6", "blue-500", "rgb(59, 130, 246)"
	*/
	color?: string;
	/**
	* Background color for the resource (supports CSS color values, hex, rgb, hsl, or CSS class names)
	* @example "#dbeafe", "blue-100", "rgba(59, 130, 246, 0.1)"
	*/
	backgroundColor?: string;
	/** Optional position for resource display */
	position?: number;
}
declare const ScopeInspectResourceCalendar: React5.FC<ScopeInspectResourceCalendarProps>;
/**
* Simplified calendar context type for external use
* Contains only the most commonly used calendar operations
*/
interface UseScopeInspectCalendarContextReturn {
	readonly currentDate: dayjs.Dayjs;
	readonly view: CalendarView;
	readonly events: CalendarEvent[];
	readonly isEventFormOpen: boolean;
	readonly selectedEvent: CalendarEvent | null;
	readonly selectedDate: dayjs.Dayjs | null;
	readonly firstDayOfWeek: number;
	readonly setCurrentDate: (date: dayjs.Dayjs) => void;
	readonly selectDate: (date: dayjs.Dayjs) => void;
	readonly setView: (view: CalendarView) => void;
	readonly nextPeriod: () => void;
	readonly prevPeriod: () => void;
	readonly today: () => void;
	readonly addEvent: (event: CalendarEvent) => void;
	readonly updateEvent: (eventId: string | number, event: Partial<CalendarEvent>) => void;
	readonly deleteEvent: (eventId: string | number) => void;
	readonly openEventForm: (eventData?: Partial<CalendarEvent>) => void;
	readonly closeEventForm: () => void;
	readonly businessHours?: BusinessHours;
	readonly visibleHours?: VisibleHours;
}
declare const useScopeInspectCalendarContext: () => UseScopeInspectCalendarContextReturn;
/**
* Simplified resource calendar context type for external use
*/
interface UseScopeInspectResourceCalendarContextReturn extends UseScopeInspectCalendarContextReturn {
	readonly events: CalendarEvent[];
	readonly resources: Resource2[];
	readonly getEventsForResource: (resourceId: string | number) => CalendarEvent[];
}
declare const useScopeInspectResourceCalendarContext: () => UseScopeInspectResourceCalendarContextReturn;
declare const isRecurringEvent: (event: CalendarEvent) => boolean;
interface GenerateRecurringEventsProps {
	event: CalendarEvent;
	currentEvents: CalendarEvent[];
	startDate: dayjs.Dayjs;
	endDate: dayjs.Dayjs;
}
declare const generateRecurringEvents: ({ event, currentEvents, startDate, endDate }: GenerateRecurringEventsProps) => CalendarEvent[];
import { Frequency, Weekday } from "rrule";
import { RRule } from "rrule";
declare const defaultTranslations: Translations;
declare const exportToICalendar: (events: CalendarEvent[], calendarName?: string) => string;
declare const downloadICalendar: (events: CalendarEvent[], filename?: string, calendarName?: string) => void;
export { useScopeInspectResourceCalendarContext, useScopeInspectCalendarContext, isRecurringEvent, generateRecurringEvents, exportToICalendar, downloadICalendar, defaultTranslations, Weekday, WeekDays, UseScopeInspectResourceCalendarContextReturn, UseScopeInspectCalendarContextReturn, TranslatorFunction, Translations, TranslationKey, TimeFormat, ScopeInspectResourceCalendarProps, ScopeInspectResourceCalendar, ScopeInspectCalendarProps, ScopeInspectCalendar, Resource2 as Resource, RRuleOptions, RRule, Frequency, EventFormProps, CellClickInfo, CalendarView, CalendarEvent };
