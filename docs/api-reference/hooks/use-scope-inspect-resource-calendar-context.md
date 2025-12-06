# useScopeInspectResourceCalendarContext

A React hook for accessing resource calendar context and controlling calendar state programmatically with resource-specific functionality.

## Overview

The `useScopeInspectResourceCalendarContext` hook provides access to the resource calendar's internal state and methods. It extends `useScopeInspectCalendarContext` with resource-specific functionality. It must be used within components that are descendants of the `ScopeInspectResourceCalendar` component.

## Basic Usage

The `useScopeInspectResourceCalendarContext` hook provides access to the resource calendar's internal state and methods. It extends `useScopeInspectCalendarContext` with resource-specific functionality. It must be used within components that are rendered through the calendar's props like `headerComponent` or `renderResource`.

### Method 1: Via headerComponent prop

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'

function CustomHeader() {
  const { currentDate, nextPeriod, prevPeriod, resources } = useScopeInspectResourceCalendarContext()

  return (
    <div className="flex items-center gap-4">
      <button onClick={prevPeriod}>Previous</button>
      <span>{currentDate.format('MMMM YYYY')}</span>
      <button onClick={nextPeriod}>Next</button>
      <div>Resources: {resources.length}</div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      headerComponent={<CustomHeader />}
    />
  )
}
```

### Method 2: Via renderResource prop

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'

function CustomResourceHeader(resource: Resource) {
  const { getEventsForResource } = useScopeInspectResourceCalendarContext()
  const resourceEvents = getEventsForResource(resource.id)

  return (
    <div className="custom-resource-header flex items-center justify-between">
      <span>{resource.name}</span>
      <span className="badge">{resourceEvents.length} events</span>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      renderResource={CustomResourceHeader}
    />
  )
}
```

## Return Values

The hook returns all properties from `useScopeInspectCalendarContext` plus the following resource-specific additions:

### Resource-Specific Return Values

| Property            | Type                                                | Description                            |
| ------------------- | --------------------------------------------------- | -------------------------------------- |
| `resources`         | `Resource[]`                                        | Array of all resources in the calendar |
| `getEventsForResource` | `(resourceId: string \| number) => CalendarEvent[]` | Get all events for a specific resource |

### Inherited Return Values

All properties and methods from `useScopeInspectCalendarContext` are also available:

- `currentDate` - The currently displayed date
- `view` - The current calendar view mode
- `events` - Array of all calendar events
- `isEventFormOpen` - Whether the event form is open
- `selectedEvent` - The currently selected event
- `selectedDate` - The currently selected date
- `firstDayOfWeek` - First day of the week setting
- `setCurrentDate` - Navigate to a specific date
- `selectDate` - Select a specific date
- `setView` - Change the calendar view mode
- `nextPeriod` - Navigate to the next period
- `prevPeriod` - Navigate to the previous period
- `today` - Navigate to today's date
- `addEvent` - Add a new event
- `updateEvent` - Update an existing event
- `deleteEvent` - Delete an event
- `openEventForm` - Open the event form
- `closeEventForm` - Close the event form
- `businessHours` - Business hours configuration
- `visibleHours` - **Exclusive feature**: Visible hours configuration

See the [useScopeInspectCalendarContext documentation](./use-scope-inspect-calendar-context.md) for complete details on inherited properties.

## Examples

### Resource Utilization Display

Show Resource Booking Stats:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'

function ResourceStats({ resourceId }: { resourceId: string | number }) {
  const { getEventsForResource, currentDate } = useScopeInspectResourceCalendarContext()

  const events = getEventsForResource(resourceId)
  const todayEvents = events.filter((event) =>
    event.start.isSame(currentDate, 'day')
  )

  return (
    <div className="resource-stats text-sm">
      <div>Total Events: {events.length}</div>
      <div>Today: {todayEvents.length}</div>
    </div>
  )
}

function CustomResourceHeader(resource: Resource) {
  return (
    <div className="flex items-center justify-between">
      <span>{resource.name}</span>
      <ResourceStats resourceId={resource.id} />
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      renderResource={CustomResourceHeader}
    />
  )
}
```

### Custom Resource Actions

Quick Event Creation:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import type { Resource, CalendarEvent } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

function ResourceActions({ resource }: { resource: Resource }) {
  const { addEvent, currentDate } = useScopeInspectResourceCalendarContext()

  const createQuickEvent = () => {
    const newEvent: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: 'Quick Booking',
      start: currentDate.hour(9).minute(0),
      end: currentDate.hour(10).minute(0),
      uid: `event-${Date.now()}@scope-inspect.calendar`,
      resourceId: resource.id,
    }

    addEvent(newEvent)
  }

  return (
    <div className="resource-actions flex items-center justify-between">
      <span>{resource.name}</span>
      <button
        onClick={createQuickEvent}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
      >
        Quick Book
      </button>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      renderResource={(resource) => <ResourceActions resource={resource} />}
    />
  )
}
```

### Resource Event Filtering

Filter and display events for specific resources:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import { useState } from 'react'

function ResourceEventList() {
  const { resources, getEventsForResource, currentDate } = useScopeInspectResourceCalendarContext()
  const [selectedResourceId, setSelectedResourceId] = useState<string | number | null>(null)

  const selectedResource = selectedResourceId
    ? resources.find((r) => r.id === selectedResourceId)
    : null

  const resourceEvents = selectedResourceId
    ? getEventsForResource(selectedResourceId)
    : []

  const todayEvents = resourceEvents.filter((event) =>
    event.start.isSame(currentDate, 'day')
  )

  return (
    <div className="p-4 border-b">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Select Resource:</label>
        <select
          value={selectedResourceId || ''}
          onChange={(e) => setSelectedResourceId(e.target.value || null)}
          className="border rounded px-2 py-1"
        >
          <option value="">All Resources</option>
          {resources.map((resource) => (
            <option key={resource.id} value={resource.id}>
              {resource.name}
            </option>
          ))}
        </select>
      </div>

      {selectedResource && (
        <div className="text-sm">
          <h3 className="font-semibold mb-2">{selectedResource.name}</h3>
          <p>Total Events: {resourceEvents.length}</p>
          <p>Today's Events: {todayEvents.length}</p>
          <div className="mt-2">
            <h4 className="font-medium">Today's Events:</h4>
            <ul className="list-disc list-inside">
              {todayEvents.map((event) => (
                <li key={event.id}>
                  {event.title} ({event.start.format('HH:mm')} - {event.end.format('HH:mm')})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      headerComponent={<ResourceEventList />}
    />
  )
}
```

### Resource Availability Checker

Check resource availability for a specific time:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

function ResourceAvailability({ resource }: { resource: Resource }) {
  const { getEventsForResource, currentDate } = useScopeInspectResourceCalendarContext()

  const checkAvailability = (startTime: string, endTime: string) => {
    const start = dayjs(`${currentDate.format('YYYY-MM-DD')} ${startTime}`)
    const end = dayjs(`${currentDate.format('YYYY-MM-DD')} ${endTime}`)

    const resourceEvents = getEventsForResource(resource.id)
    const conflictingEvents = resourceEvents.filter((event) => {
      return (
        (event.start.isBefore(end) && event.end.isAfter(start)) ||
        (event.start.isSame(start) || event.end.isSame(end))
      )
    })

    return {
      available: conflictingEvents.length === 0,
      conflicts: conflictingEvents,
    }
  }

  const morningAvailability = checkAvailability('09:00', '12:00')
  const afternoonAvailability = checkAvailability('13:00', '17:00')

  return (
    <div className="resource-availability text-sm">
      <div className="font-medium mb-2">{resource.name}</div>
      <div className="space-y-1">
        <div>
          Morning (9 AM - 12 PM):{' '}
          <span className={morningAvailability.available ? 'text-green-600' : 'text-red-600'}>
            {morningAvailability.available ? 'Available' : `Busy (${morningAvailability.conflicts.length} conflicts)`}
          </span>
        </div>
        <div>
          Afternoon (1 PM - 5 PM):{' '}
          <span className={afternoonAvailability.available ? 'text-green-600' : 'text-red-600'}>
            {afternoonAvailability.available ? 'Available' : `Busy (${afternoonAvailability.conflicts.length} conflicts)`}
          </span>
        </div>
      </div>
    </div>
  )
}

function CustomResourceHeader(resource: Resource) {
  return (
    <div className="flex items-center justify-between">
      <span>{resource.name}</span>
      <ResourceAvailability resource={resource} />
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      renderResource={CustomResourceHeader}
    />
  )
}
```

### Resource Statistics Dashboard

Display comprehensive resource statistics:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import { useMemo } from 'react'

function ResourceStatistics() {
  const { resources, getEventsForResource, currentDate, events } = useScopeInspectResourceCalendarContext()

  const resourceStats = useMemo(() => {
    return resources.map((resource) => {
      const resourceEvents = getEventsForResource(resource.id)
      const todayEvents = resourceEvents.filter((event) =>
        event.start.isSame(currentDate, 'day')
      )
      const thisWeekEvents = resourceEvents.filter((event) =>
        event.start.isSame(currentDate, 'week')
      )
      const thisMonthEvents = resourceEvents.filter((event) =>
        event.start.isSame(currentDate, 'month')
      )

      return {
        resource,
        total: resourceEvents.length,
        today: todayEvents.length,
        thisWeek: thisWeekEvents.length,
        thisMonth: thisMonthEvents.length,
      }
    })
  }, [resources, getEventsForResource, currentDate])

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-4">Resource Statistics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resourceStats.map((stat) => (
          <div key={stat.resource.id} className="border rounded p-3">
            <div className="font-medium mb-2">{stat.resource.name}</div>
            <div className="text-sm space-y-1">
              <div>Total: {stat.total} events</div>
              <div>Today: {stat.today} events</div>
              <div>This Week: {stat.thisWeek} events</div>
              <div>This Month: {stat.thisMonth} events</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      headerComponent={<ResourceStatistics />}
    />
  )
}
```

## Error Handling

The hook will throw an error if used outside of the resource calendar context. Since `ScopeInspectResourceCalendar` does not accept children, you must use this hook in descendant components that are rendered through the calendar's props like `headerComponent` or `renderResource`.

### ❌ Incorrect Usage

```tsx
// ❌ This will throw an error
function BadComponent() {
  // This component is not inside ScopeInspectResourceCalendar context
  const { resources } = useScopeInspectResourceCalendarContext() // Error!
  return <div>{resources.length}</div>
}

// ❌ This won't work - ScopeInspectResourceCalendar doesn't accept children
function App() {
  return (
    <ScopeInspectResourceCalendar resources={resources} events={events}>
      <GoodComponent /> {/* This won't render */}
    </ScopeInspectResourceCalendar>
  )
}
```

### ✅ Correct Usage

```tsx
// ✅ Correct: Using headerComponent prop
function GoodComponent() {
  const { resources } = useScopeInspectResourceCalendarContext()
  return <div>Resources: {resources.length}</div>
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      headerComponent={<GoodComponent />}
    />
  )
}

// ✅ Correct: Using renderResource prop
function CustomResourceHeader(resource: Resource) {
  const { getEventsForResource } = useScopeInspectResourceCalendarContext()
  const events = getEventsForResource(resource.id)
  return (
    <div>
      {resource.name} ({events.length} events)
    </div>
  )
}

function App() {
  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
      renderResource={CustomResourceHeader}
    />
  )
}
```

## TypeScript Support

The hook is fully typed with TypeScript:

```typescript
import { useScopeInspectResourceCalendarContext } from 'scope-inspect-calendar'
import type { UseScopeInspectResourceCalendarContextReturn } from 'scope-inspect-calendar'

function MyComponent() {
  const context: UseScopeInspectResourceCalendarContextReturn = useScopeInspectResourceCalendarContext()
  
  // All properties and methods are fully typed
  const { resources, getEventsForResource, currentDate, addEvent } = context
  
  return <div>{/* ... */}</div>
}
```

## Related Documentation

- **[README.md](../../../README.md)** - Main documentation index
- [ScopeInspectResourceCalendar Component](../components/scope-inspect-resource-calendar.md) - Resource calendar component
- [useScopeInspectCalendarContext Hook](./use-scope-inspect-calendar-context.md) - Base calendar context hook
- [Resource Calendar Documentation](../../resource-calendar.md) - Detailed guide for resource calendars
- [Basic Usage Guide](../../getting-started/basic-usage.md) - Usage fundamentals

