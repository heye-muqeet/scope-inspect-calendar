# ScopeInspectCalendar

A unified React calendar component that supports both **agenda** (standard) and **timeline** (resource) views, with month, week, day, and year views, plus powerful event lifecycle callbacks.

## Overview

The `ScopeInspectCalendar` component is the main component for displaying calendar views. It can be used for:

- **Agenda View** (`type="agenda"` or default): Standard calendar with events organized by date
- **Timeline View** (`type="timeline"`): Resource-based calendar with events organized by resource rows

Use the `type` prop to switch between views. Events should follow the `CalendarEvent` interface.

## Basic Usage

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    description: 'Weekly team sync',
    backgroundColor: '#3b82f6',
    color: 'black',
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date('2025-01-20T23:59:59'),
    end: new Date('2025-01-20T23:59:59'),
    allDay: true,
    backgroundColor: '#ef4444',
    color: 'black',
  },
]

function MyCalendar() {
  return <ScopeInspectCalendar events={events} />
}
```

## Props

### Basic Props

| Prop                  | Type                                                                                       | Default                    | Description                                                                                                                        |
| --------------------- | ------------------------------------------------------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `type`                | `'agenda' \| 'timeline'`                                                                   | `'agenda'`                 | Calendar display type. Use `'agenda'` for standard calendar view or `'timeline'` for resource-based timeline view                  |
| `events`              | `CalendarEvent[]`                                                                          | `[]`                       | Array of events to display in the calendar                                                                                         |
| `initialView`         | `'month' \| 'week' \| 'day' \| 'year'`                                                     | `'month'`                  | Sets the initial view when the calendar loads                                                                                      |
| `initialDate`         | `dayjs.Dayjs \| Date \| string`                                                            | `undefined` (today's date) | Sets the initial date displayed when the calendar loads. When undefined, defaults to today's date                                  |
| `firstDayOfWeek`      | `'sunday' \| 'monday' \| 'tuesday' \| 'wednesday' \| 'thursday' \| 'friday' \| 'saturday'` | `'sunday'`                 | The first day of the week to display                                                                                               |
| `resources`           | `Resource[]`                                                                               | `[]`                       | Array of resources (team members, rooms, equipment) for timeline view. Required when `type="timeline"`                             |
| `renderResource`      | `(resource: Resource) => React.ReactNode`                                                  | `undefined`                | Custom render function for resource cells in timeline view                                                                         |
| `dayMaxEvents`        | `number`                                                                                   | `3`                        | Maximum number of events to display in a day cell                                                                                  |
| `renderEvent`         | `(event: CalendarEvent) => ReactNode`                                                      | `undefined`                | Custom function to render individual events                                                                                        |
| `locale`              | `string`                                                                                   | `'en'`                     | Locale for date formatting (e.g., "en", "fr", "de")                                                                                |
| `timezone`            | `string`                                                                                   | Local timezone             | Timezone for date handling (e.g., "UTC", "America/New_York")                                                                       |
| `timeFormat`          | `'12-hour' \| '24-hour'`                                                                   | `'12-hour'`                | Time format for displaying times in week and day views (e.g., '1:00 PM' vs '13:00')                                                |
| `stickyViewHeader`    | `boolean`                                                                                  | `true`                     | Whether to stick the view header to the top                                                                                        |
| `viewHeaderClassName` | `string`                                                                                   | `''`                       | Custom class name for the view header                                                                                              |
| `headerComponent`     | `ReactNode`                                                                                | `null`                     | Custom header component to render above the calendar                                                                               |
| `headerClassName`     | `string`                                                                                   | `undefined`                | Custom class name for the calendar header                                                                                          |
| `disableCellClick`    | `boolean`                                                                                  | `false`                    | Disable cell click interactions                                                                                                    |
| `disableEventClick`   | `boolean`                                                                                  | `false`                    | Disable event click interactions                                                                                                   |
| `disableDragAndDrop`  | `boolean`                                                                                  | `false`                    | Disable drag-and-drop functionality for events                                                                                     |
| `businessHours`       | `BusinessHours`                                                                            | `undefined`                | Restrict calendar interactions to specified days and time ranges. Users can only create and edit events within business hours.     |
| `visibleHours`        | `VisibleHours`                                                                             | `undefined`                | Controls which time range is displayed on the calendar's vertical time scale, independent of business hours |
| `slotDuration`        | `30 \| 60`                                                                                 | `60`                       | The duration of each time slot in minutes. Controls the granularity of the time grid in day and week views (30 minutes or 1 hour)  |
| `renderEventForm`     | `(props: EventFormProps) => ReactNode`                                                     | `undefined`                | Custom render function for the event form                                                                                          |
| `translations`        | `Translations`                                                                             | `undefined`                | Translations object for internationalization                                                                                       |
| `translator`          | `TranslatorFunction`                                                                       | `undefined`                | Translator function for internationalization                                                                                       |

### Event Handlers

| Prop            | Type                             | Description                                         |
| --------------- | -------------------------------- | --------------------------------------------------- |
| `onEventClick`  | `(event: CalendarEvent) => void` | Callback when an event is clicked                   |
| `onCellClick`   | `(info: CellClickInfo) => void`  | Callback when a calendar cell is clicked            |
| `onViewChange`  | `(view: CalendarView) => void`   | Callback when the calendar view changes             |
| `onEventAdd`    | `(event: CalendarEvent) => void` | Callback when a new event is added                  |
| `onEventUpdate` | `(event: CalendarEvent) => void` | Callback when an existing event is updated          |
| `onEventDelete` | `(event: CalendarEvent) => void` | Callback when an event is deleted                   |
| `onDateChange`  | `(date: dayjs.Dayjs) => void`    | Callback when the current date changes (navigation) |

## Examples

### With Event Handlers

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CalendarWithHandlers() {
  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event.title)
    // Open event details modal, navigate to event page, etc.
  }

  const handleCellClick = (info: CellClickInfo) => {
    console.log('Cell clicked:', info.start.format(), 'to', info.end.format())
    // Open event creation form, etc.
  }

  return (
    <ScopeInspectCalendar
      events={events}
      onEventClick={handleEventClick}
      onCellClick={handleCellClick}
    />
  )
}
```

### Internationalization

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function InternationalizedCalendar() {
  return (
    <ScopeInspectCalendar events={events} locale="fr" firstDayOfWeek="monday" />
  )
}
```

### Time Format Configuration

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function CalendarWith24HourFormat() {
  return <ScopeInspectCalendar events={events} timeFormat="24-hour" />
}
```

### Custom Event Rendering

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CalendarWithCustomEvents() {
  const renderEvent = (event: CalendarEvent) => {
    return (
      <div className="custom-event">
        <strong>{event.title}</strong>
        {event.description && <p className="text-sm">{event.description}</p>}
      </div>
    )
  }

  return <ScopeInspectCalendar events={events} renderEvent={renderEvent} />
}
```

### Initial View and Event Lifecycle

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CalendarWithLifecycle() {
  const handleEventAdd = (event: CalendarEvent) => {
    console.log('Event added:', event)
    // Save to backend, update state, etc.
  }

  const handleEventUpdate = (event: CalendarEvent) => {
    console.log('Event updated:', event)
    // Update in backend, update state, etc.
  }

  const handleEventDelete = (event: CalendarEvent) => {
    console.log('Event deleted:', event)
    // Delete from backend, update state, etc.
  }

  return (
    <ScopeInspectCalendar
      events={events}
      initialView="week"
      initialDate={new Date('2025-01-15')}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  )
}
```

## View Options

### Month View

The default view showing a monthly calendar grid:

```tsx
<ScopeInspectCalendar events={events} initialView="month" />
```

### Week View

Shows a week timeline with hourly slots:

```tsx
<ScopeInspectCalendar events={events} initialView="week" />
```

### Day View

Shows a single day with hourly slots:

```tsx
<ScopeInspectCalendar events={events} initialView="day" />
```

### Year View

Shows an entire year overview:

```tsx
<ScopeInspectCalendar events={events} initialView="year" />
```

## Business Hours

The `businessHours` prop restricts calendar interactions to specified days and time ranges. Users can only create and edit events within business hours.

### daysOfWeek

Array of day names considered business days:

```tsx
const businessHours = {
  daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  startTime: 9,
  endTime: 17,
}

<ScopeInspectCalendar
  events={events}
  businessHours={businessHours}
/>
```

### startTime

Hour when business hours start (0-23, inclusive):

```tsx
const businessHours = {
  daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  startTime: 9, // 9:00 AM
  endTime: 17,
}
```

### endTime

Hour when business hours end (0-24, exclusive):

```tsx
const businessHours = {
  daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  startTime: 9,
  endTime: 17, // 5:00 PM (exclusive)
}
```

## Custom Event Form

You can provide a custom event form component using the `renderEventForm` prop. The form receives `EventFormProps` with all necessary callbacks.

### EventFormProps Properties

```typescript
interface EventFormProps {
  open?: boolean
  selectedEvent?: CalendarEvent | null
  onAdd?: (event: CalendarEvent) => void
  onUpdate?: (event: CalendarEvent) => void
  onDelete?: (event: CalendarEvent) => void
  onClose: () => void
}
```

### Usage Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { EventFormProps } from 'scope-inspect-calendar'

const MyEventForm = (props: EventFormProps) => {
  const { open, selectedEvent, onAdd, onUpdate, onDelete, onClose } = props

  if (!open) return null

  return (
    <div className="modal">
      <h2>{selectedEvent ? 'Edit Event' : 'New Event'}</h2>
      {/* Your custom form UI */}
      <button onClick={onClose}>Close</button>
    </div>
  )
}

;<ScopeInspectCalendar
  events={events}
  renderEventForm={(props) => <MyEventForm {...props} />}
/>
```

## Event Lifecycle Callbacks

These callbacks are essential for maintaining your event data and integrating with backend APIs.

### Event Management Callbacks

#### onEventAdd

Triggered when a user creates a new event through the calendar interface.

**Type:** `(event: CalendarEvent) => void`

#### onEventUpdate

Called when an existing event is modified (e.g., dragged, resized, or edited).

**Type:** `(event: CalendarEvent) => void`

#### onEventDelete

Invoked when a user deletes an event from the calendar.

**Type:** `(event: CalendarEvent) => void`

#### onDateChange

Fired when the user navigates to a different date or time period.

**Type:** `(date: dayjs.Dayjs) => void`

### Complete Integration Example

Full Event Lifecycle Management:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { useState } from 'react'

function CalendarWithAPI() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)

  // Handle new event creation
  const handleEventAdd = async (event: CalendarEvent) => {
    setLoading(true)
    try {
      // Save to backend
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      })

      if (response.ok) {
        const savedEvent = await response.json()
        setEvents((prev) => [...prev, savedEvent])
        console.log('Event created successfully:', savedEvent)
      }
    } catch (error) {
      console.error('Failed to create event:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle event updates
  const handleEventUpdate = async (updatedEvent: CalendarEvent) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/events/${updatedEvent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEvent),
      })

      if (response.ok) {
        setEvents((prev) =>
          prev.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        )
        console.log('Event updated successfully:', updatedEvent)
      }
    } catch (error) {
      console.error('Failed to update event:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle event deletion
  const handleEventDelete = async (deletedEvent: CalendarEvent) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/events/${deletedEvent.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setEvents((prev) =>
          prev.filter((event) => event.id !== deletedEvent.id)
        )
        console.log('Event deleted successfully:', deletedEvent)
      }
    } catch (error) {
      console.error('Failed to delete event:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle date navigation
  const handleDateChange = async (date: dayjs.Dayjs) => {
    console.log('Navigating to:', date.format('YYYY-MM-DD'))

    // Optionally load events for the new date range
    const monthStart = date.startOf('month')
    const monthEnd = date.endOf('month')

    try {
      const response = await fetch(
        `/api/events?start=${monthStart.toISOString()}&end=${monthEnd.toISOString()}`
      )

      if (response.ok) {
        const monthEvents = await response.json()
        setEvents(monthEvents)
      }
    } catch (error) {
      console.error('Failed to load events for date:', error)
    }
  }

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <ScopeInspectCalendar
        events={events}
        initialView="month"
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        onDateChange={handleDateChange}
        onEventClick={(event) => {
          // Navigate to event details or open modal
          console.log('Event clicked:', event)
        }}
      />
    </div>
  )
}
```

## Types

### CalendarEvent Interface

The main event object used throughout the calendar. All events passed to the calendar should conform to this interface.

```typescript
interface CalendarEvent {
  id: string | number // Unique identifier for the event
  title: string // Display title of the event
  start: dayjs.Dayjs // Start date and time
  end: dayjs.Dayjs // End date and time
  description?: string // Optional description text
  color?: string // Optional text color (hex, rgb, named colors, class names)
  backgroundColor?: string // Optional background color (hex, rgb, named colors, class names)
  allDay?: boolean // Whether this is an all-day event
  location?: string // Optional location where the event takes place
  resourceId?: string | number // Single resource assignment (for resource calendars)
  resourceIds?: (string | number)[] // Multiple resource assignment (for cross-resource events)
  rrule?: RRuleOptions // Recurrence rule for recurring events (RFC 5545 standard)
  exdates?: string[] // Exception dates (EXDATE) - dates to exclude from recurrence
  recurrenceId?: string // Recurrence ID (RECURRENCE-ID) - identifies modified instances
  uid?: string // UID for iCalendar compatibility
  data?: Record<string, any> // Optional custom data for additional properties
}
```

### Event Properties Explained

#### Required Properties

- `id` - Must be unique across all events. Used for drag-and-drop and event updates.
- `title` - The text displayed on the event in the calendar.
- `start` - JavaScript Date object, dayjs object, or ISO string representing when the event begins.
- `end` - JavaScript Date object, dayjs object, or ISO string representing when the event ends.

#### Optional Properties

- `description` - Additional text shown in tooltips or custom event renderers.
- `color` - Text color for the event. Supports hex (#ff0000), rgb(255,0,0), or named colors (red).
- `backgroundColor` - Background color for the event. Supports hex (#ff0000), rgb(255,0,0), or named colors (red).
- `allDay` - When true, the event spans the entire day and ignores time components.
- `location` - Location where the event takes place.
- `rrule` - Recurrence rule following RFC 5545 standard for recurring events.
- `exdates` - Array of ISO date strings to exclude from recurrence.
- `recurrenceId` - Identifier for modified instances of recurring events.
- `uid` - Unique identifier for iCalendar compatibility.
- `data` - Custom data object for storing additional metadata.

### Example Event Objects

```tsx
// Regular timed event
const meeting: CalendarEvent = {
  id: 'meeting-1',
  title: 'Team Standup',
  start: new Date('2025-01-15T09:00:00'),
  end: new Date('2025-01-15T09:30:00'),
  description: 'Daily team sync meeting',
  backgroundColor: '#3b82f6',
  color: 'white',
}

// All-day event
const holiday: CalendarEvent = {
  id: 'holiday-1',
  title: 'National Holiday',
  start: new Date('2025-01-01'),
  end: new Date('2025-01-01'),
  allDay: true,
  backgroundColor: '#ef4444',
  color: 'white',
}

// Multi-day event
const conference: CalendarEvent = {
  id: 'conf-1',
  title: 'Tech Conference',
  start: new Date('2025-01-20T08:00:00'),
  end: new Date('2025-01-22T18:00:00'),
  description: 'Annual technology conference',
  backgroundColor: '#10b981',
  color: 'white',
}
```

### BusinessHours Interface

Configuration object for restricting calendar interactions to specific days and time ranges. Used with the `businessHours` prop.

```typescript
interface BusinessHours {
  // Array of day names considered business days
  daysOfWeek?: (
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  )[]

  // Hour when business hours start (0-23, inclusive)
  startTime?: number

  // Hour when business hours end (0-24, exclusive)
  endTime?: number
}
```

#### Usage Example

Standard Monday-Friday, 9 AM to 5 PM business hours:

```tsx
const businessHours: BusinessHours = {
  daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  startTime: 9,
  endTime: 17,
}

<ScopeInspectCalendar
  events={events}
  businessHours={businessHours}
/>
```

### VisibleHours Interface

**Exclusive Feature**: Configuration object for controlling which time range is displayed on the calendar's vertical time scale. This is independent from `businessHours` which controls interaction rules.

```typescript
interface VisibleHours {
  // Start time for visible hours in 24-hour format (0-24)
  // Hours before this time will not be displayed
  startTime?: number

  // End time for visible hours in 24-hour format (0-24)
  // Hours at or after this time will not be displayed
  endTime?: number
}
```

#### Usage Example

Show only business hours (9 AM to 5 PM):

```tsx
const visibleHours: VisibleHours = {
  startTime: 9,
  endTime: 17,
}

<ScopeInspectCalendar
  events={events}
  visibleHours={visibleHours}
/>
```

### Slot Duration

The `slotDuration` prop controls the granularity of time slots in day and week views. This affects how the time grid is divided and displayed.

```typescript
slotDuration?: 30 | 60 // Default: 60
```

#### Options

- **`30`**: 30-minute time slots (e.g., 12:00, 12:30, 1:00, 1:30)
- **`60`**: 60-minute (1-hour) time slots (e.g., 12:00, 1:00, 2:00)

#### Usage Example

Use 30-minute slots for more granular scheduling:

```tsx
<ScopeInspectCalendar
  events={events}
  slotDuration={30} // 30-minute slots
/>
```

Use 60-minute slots (default) for standard hourly scheduling:

```tsx
<ScopeInspectCalendar
  events={events}
  slotDuration={60} // 1-hour slots (default)
/>
```

#### Behavior

- **Day View**: Time labels and grid lines adjust based on `slotDuration`
- **Week View**: Time labels and grid lines adjust based on `slotDuration`
- **Month View**: Not affected (day-level granularity)
- **Year View**: Not affected (month-level granularity)
- **Cell Clicks**: When clicking a time cell, the event duration matches `slotDuration`
- **Time Labels**: Display minutes when `slotDuration={30}`, hours only when `slotDuration={60}`

<ScopeInspectCalendar
  events={events}
  visibleHours={visibleHours}
/>

````

### CellClickInfo Interface

Information passed to the `onCellClick` callback. Uses named properties for better extensibility and clarity.

```typescript
interface CellClickInfo {
  // Start date/time of the clicked cell
  start: dayjs.Dayjs

  // End date/time of the clicked cell
  end: dayjs.Dayjs

  // Resource ID if clicking on a resource calendar cell (optional)
  resourceId?: string | number
}
````

#### Usage Example

Handle cell clicks with the CellClickInfo object:

```tsx
const handleCellClick = (info: CellClickInfo) => {
  const { start, end, resourceId } = info
  console.log('Cell clicked from', start.format(), 'to', end.format())

  // For resource calendars, resourceId will be available
  if (resourceId) {
    console.log('On resource:', resourceId)
  }

  // Create a new event
  openEventForm({ start, end, resourceId })
}

;<ScopeInspectCalendar events={events} onCellClick={handleCellClick} />
```

### EventFormProps Interface

Props passed to custom event form components via the `renderEventForm` prop. Use this interface to build your own event creation and editing forms.

```typescript
interface EventFormProps {
  // Whether the form should be displayed
  open?: boolean

  // The event being edited (null/undefined for new events)
  selectedEvent?: CalendarEvent | null

  // Callback to create a new event
  onAdd?: (event: CalendarEvent) => void

  // Callback to update an existing event
  onUpdate?: (event: CalendarEvent) => void

  // Callback to delete an event
  onDelete?: (event: CalendarEvent) => void

  // Callback to close the form (required)
  onClose: () => void
}
```

#### Usage Example

Implementing a custom event form with EventFormProps:

```tsx
const MyEventForm = (props: EventFormProps) => {
  const { open, selectedEvent, onAdd, onUpdate, onDelete, onClose } = props

  if (!open) return null

  return (
    <div className="modal">
      <h2>{selectedEvent ? 'Edit Event' : 'New Event'}</h2>
      {/* Your custom form UI */}
      <button onClick={onClose}>Close</button>
    </div>
  )
}

// Usage
;<ScopeInspectCalendar
  events={events}
  renderEventForm={(props) => <MyEventForm {...props} />}
/>
```

## Related Documentation

- **[README.md](../../../README.md)** - Main documentation index
- [Calendar Views Guide](../../guides/calendar-views.md)
- [Recurring Events Guide](../../guides/recurring-events.md)
- [Internationalization Guide](../../guides/internationalization.md)
- [Theming & Styling Guide](../../guides/theming-and-styling.md)
- [Custom Rendering Guide](../../guides/custom-rendering.md)
- [Resource Calendar Component](./scope-inspect-resource-calendar.md)
- [Basic Usage Guide](../../getting-started/basic-usage.md)
