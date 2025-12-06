# useScopeInspectCalendarContext

A React hook for accessing calendar context and controlling calendar state programmatically.

## Overview

The `useScopeInspectCalendarContext` hook provides access to the calendar's internal state and methods. It must be used within components that are descendants of the `ScopeInspectCalendar` component.

## Basic Usage

The `useScopeInspectCalendarContext` hook provides access to the calendar's internal state and methods. It must be used within components that are rendered through the calendar's props like `headerComponent` or `renderEvent`.

### Method 1: Via headerComponent prop

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomHeader() {
  const { currentDate, nextPeriod, prevPeriod } =
    useScopeInspectCalendarContext()

  return (
    <div className="flex items-center gap-4">
      <button onClick={prevPeriod}>Previous</button>
      <span>{currentDate.format('MMMM YYYY')}</span>
      <button onClick={nextPeriod}>Next</button>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<CustomHeader />} />
  )
}
```

### Method 2: Via renderEvent prop

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CustomEvent(event: CalendarEvent) {
  const { deleteEvent, updateEvent } = useScopeInspectCalendarContext()

  return (
    <div className="custom-event">
      <span>{event.title}</span>
      <button onClick={() => deleteEvent(event.id)}>Delete</button>
    </div>
  )
}

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={CustomEvent} />
}
```

### Method 3: Custom Navigation Component

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomNavigation() {
  const { currentDate, view, setView, nextPeriod, prevPeriod, today } =
    useScopeInspectCalendarContext()

  return (
    <div className="flex items-center gap-4">
      <button onClick={today}>Today</button>
      <button onClick={prevPeriod}>←</button>
      <span>{currentDate.format('MMMM YYYY')}</span>
      <button onClick={nextPeriod}>→</button>
      <select
        value={view}
        onChange={(e) =>
          setView(e.target.value as 'month' | 'week' | 'day' | 'year')
        }
      >
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
        <option value="year">Year</option>
      </select>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      headerComponent={<CustomNavigation />}
    />
  )
}
```

## Return Values

The hook returns an object with the following properties and methods:

| Property          | Type                                                              | Description                                                          |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `currentDate`     | `dayjs.Dayjs`                                                     | The currently displayed date/month in the calendar view              |
| `view`            | `'month' \| 'week' \| 'day' \| 'year'`                            | The current calendar view mode                                       |
| `events`          | `CalendarEvent[]`                                                 | Array of all calendar events                                         |
| `isEventFormOpen` | `boolean`                                                         | Whether the event form modal is currently open                       |
| `selectedEvent`   | `CalendarEvent \| null`                                           | The currently selected event, if any                                 |
| `selectedDate`    | `dayjs.Dayjs \| null`                                             | The currently selected date, if any                                  |
| `firstDayOfWeek`  | `number`                                                          | The first day of the week setting (0 for Sunday, 1 for Monday, etc.) |
| `setCurrentDate`  | `(date: dayjs.Dayjs) => void`                                     | Navigate to a specific date/month                                    |
| `selectDate`      | `(date: dayjs.Dayjs) => void`                                     | Select a specific date                                               |
| `setView`         | `(view: CalendarView) => void`                                    | Change the calendar view mode                                        |
| `nextPeriod`      | `() => void`                                                      | Navigate to the next period (month/week/day)                         |
| `prevPeriod`      | `() => void`                                                      | Navigate to the previous period (month/week/day)                     |
| `today`           | `() => void`                                                      | Navigate to today's date                                             |
| `addEvent`        | `(event: CalendarEvent) => void`                                  | Add a new event to the calendar                                      |
| `updateEvent`     | `(id: string \| number, updates: Partial<CalendarEvent>) => void` | Update an existing event                                             |
| `deleteEvent`     | `(id: string \| number) => void`                                  | Delete an event from the calendar                                    |
| `openEventForm`   | `(eventData?: Partial<CalendarEvent>) => void`                    | Open the event form modal with optional pre-populated data           |
| `closeEventForm`  | `() => void`                                                      | Close the event form modal                                           |
| `businessHours`   | `BusinessHours \| undefined`                                      | Business hours configuration, if set                                 |
| `visibleHours`    | `VisibleHours \| undefined`                                       | **Exclusive feature**: Visible hours configuration, if set           |

## Examples

### Custom Header with Date Navigation

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomHeader() {
  const { currentDate, view, setView, nextPeriod, prevPeriod, today } =
    useScopeInspectCalendarContext()

  const formatDate = () => {
    switch (view) {
      case 'month':
        return currentDate.format('MMMM YYYY')
      case 'week':
        return `${currentDate.startOf('week').format('MMM D')} - ${currentDate.endOf('week').format('MMM D, YYYY')}`
      case 'day':
        return currentDate.format('MMMM D, YYYY')
      case 'year':
        return currentDate.format('YYYY')
      default:
        return currentDate.format('MMMM YYYY')
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-2">
        <button onClick={today} className="px-3 py-1 border rounded">
          Today
        </button>
        <button onClick={prevPeriod} className="px-2 py-1 border rounded">
          ←
        </button>
        <button onClick={nextPeriod} className="px-2 py-1 border rounded">
          →
        </button>
        <span className="text-lg font-semibold">{formatDate()}</span>
      </div>
      <div className="flex gap-2">
        {(['month', 'week', 'day', 'year'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`px-3 py-1 border rounded ${
              view === v ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<CustomHeader />} />
  )
}
```

### Custom Event with Actions

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CustomEvent(event: CalendarEvent) {
  const { deleteEvent, updateEvent, openEventForm } =
    useScopeInspectCalendarContext()

  const handleEdit = () => {
    openEventForm(event)
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event.id)
    }
  }

  const handleToggleAllDay = () => {
    updateEvent(event.id, { allDay: !event.allDay })
  }

  return (
    <div className="custom-event flex items-center justify-between">
      <span className="flex-1">{event.title}</span>
      <div className="flex gap-1">
        <button onClick={handleEdit} className="text-xs">
          Edit
        </button>
        <button onClick={handleToggleAllDay} className="text-xs">
          {event.allDay ? 'Timed' : 'All Day'}
        </button>
        <button onClick={handleDelete} className="text-xs text-red-500">
          Delete
        </button>
      </div>
    </div>
  )
}

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={CustomEvent} />
}
```

### Programmatic Event Management

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import { useState } from 'react'
import type { CalendarEvent } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

function EventManager() {
  const { addEvent, updateEvent, deleteEvent, events } =
    useScopeInspectCalendarContext()
  const [newEventTitle, setNewEventTitle] = useState('')

  const handleAddEvent = () => {
    if (!newEventTitle.trim()) return

    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEventTitle,
      start: dayjs().startOf('day').add(9, 'hour'),
      end: dayjs().startOf('day').add(10, 'hour'),
    }

    addEvent(newEvent)
    setNewEventTitle('')
  }

  const handleUpdateEvent = (eventId: string | number) => {
    const event = events.find((e) => e.id === eventId)
    if (event) {
      updateEvent(eventId, {
        title: `${event.title} (Updated)`,
      })
    }
  }

  return (
    <div className="p-4 border-b">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder="Event title"
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleAddEvent}
          className="px-4 py-1 bg-blue-500 text-white rounded"
        >
          Add Event
        </button>
      </div>
      <div className="text-sm">
        <p>Total events: {events.length}</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<EventManager />} />
  )
}
```

### Date Selection and Navigation

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

function DateSelector() {
  const { currentDate, setCurrentDate, selectDate } =
    useScopeInspectCalendarContext()

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = dayjs(e.target.value)
    setCurrentDate(date)
  }

  const handleQuickSelect = (days: number) => {
    const date = dayjs().add(days, 'day')
    setCurrentDate(date)
    selectDate(date)
  }

  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-4">
        <input
          type="date"
          value={currentDate.format('YYYY-MM-DD')}
          onChange={handleDateChange}
          className="border rounded px-2 py-1"
        />
        <button onClick={() => handleQuickSelect(-7)}>Last Week</button>
        <button onClick={() => handleQuickSelect(0)}>Today</button>
        <button onClick={() => handleQuickSelect(7)}>Next Week</button>
        <button onClick={() => handleQuickSelect(30)}>Next Month</button>
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<DateSelector />} />
  )
}
```

### Accessing Configuration

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function ConfigDisplay() {
  const { businessHours, visibleHours, firstDayOfWeek } =
    useScopeInspectCalendarContext()

  return (
    <div className="p-4 border-b text-sm">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <strong>First Day of Week:</strong>
          <p>
            {firstDayOfWeek === 0
              ? 'Sunday'
              : firstDayOfWeek === 1
                ? 'Monday'
                : 'Other'}
          </p>
        </div>
        {businessHours && (
          <div>
            <strong>Business Hours:</strong>
            <p>
              {businessHours.daysOfWeek?.join(', ')}: {businessHours.startTime}
              :00 - {businessHours.endTime}:00
            </p>
          </div>
        )}
        {visibleHours && (
          <div>
            <strong>Visible Hours:</strong>
            <p>
              {visibleHours.startTime}:00 - {visibleHours.endTime}:00
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      businessHours={{
        daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        startTime: 9,
        endTime: 17,
      }}
      visibleHours={{ startTime: 8, endTime: 18 }}
      headerComponent={<ConfigDisplay />}
    />
  )
}
```

## Error Handling

The hook will throw an error if used outside of the calendar context. Since `ScopeInspectCalendar` does not accept children, you must use this hook in descendant components that are rendered through the calendar's props like `headerComponent` or `renderEvent`.

### ❌ Incorrect Usage

```tsx
// ❌ This will throw an error
function BadComponent() {
  // This component is not inside ScopeInspectCalendar context
  const { currentDate } = useScopeInspectCalendarContext() // Error!
  return <div>{currentDate.format()}</div>
}

// ❌ This won't work - ScopeInspectCalendar doesn't accept children
function App() {
  return (
    <ScopeInspectCalendar events={events}>
      <GoodComponent /> {/* This won't render */}
    </ScopeInspectCalendar>
  )
}
```

### ✅ Correct Usage

```tsx
// ✅ Correct: Using headerComponent prop
function GoodComponent() {
  const { currentDate } = useScopeInspectCalendarContext()
  return <div>{currentDate.format()}</div>
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<GoodComponent />} />
  )
}

// ✅ Correct: Using renderEvent prop
function CustomEvent(event: CalendarEvent) {
  const { deleteEvent } = useScopeInspectCalendarContext()
  return (
    <div>
      {event.title}
      <button onClick={() => deleteEvent(event.id)}>Delete</button>
    </div>
  )
}

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={CustomEvent} />
}
```

## TypeScript Support

The hook is fully typed with TypeScript:

```typescript
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import type { UseScopeInspectCalendarContextReturn } from 'scope-inspect-calendar'

function MyComponent() {
  const context: UseScopeInspectCalendarContextReturn = useScopeInspectCalendarContext()

  // All properties and methods are fully typed
  const { currentDate, view, events, addEvent } = context

  return <div>{/* ... */}</div>
}
```

## Related Documentation

- **[README.md](../../../README.md)** - Main documentation index
- [ScopeInspectCalendar Component](../components/scope-inspect-calendar.md) - Main calendar component
- [ScopeInspectResourceCalendar Component](../components/scope-inspect-resource-calendar.md) - Resource calendar component
- [useScopeInspectResourceCalendarContext Hook](./use-scope-inspect-resource-calendar-context.md) - Resource calendar context hook
- [Calendar Views Guide](../../guides/calendar-views.md) - Understanding calendar views
- [Basic Usage Guide](../../getting-started/basic-usage.md) - Usage fundamentals
