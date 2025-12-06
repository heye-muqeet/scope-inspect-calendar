# ScopeInspectResourceCalendar

A powerful calendar component for visualizing and managing events across multiple resources like rooms, equipment, or team members.

## Overview

The `ScopeInspectResourceCalendar` component extends the standard calendar with resource-based event organization. Events are displayed in horizontal rows where each row represents a resource (person, room, equipment, etc.). It supports all standard calendar features including drag-and-drop, recurring events, and internationalization.

## Basic Usage

### Simple Resource Calendar

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import type { Resource, CalendarEvent } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

const resources: Resource[] = [
  {
    id: 'room-a',
    name: 'Conference Room A',
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  {
    id: 'room-b',
    name: 'Conference Room B',
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
]

const events: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Team Meeting',
    start: dayjs('2025-08-04T09:00:00.000Z'),
    end: dayjs('2025-08-04T10:00:00.000Z'),
    uid: 'event-1@scope-inspect.calendar',
    resourceId: 'room-a', // Assigned to Room A
  },
]

function App() {
  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectResourceCalendar
        resources={resources}
        events={events}
        firstDayOfWeek="sunday"
        initialView="week"
        timeFormat="12-hour"
      />
    </div>
  )
}
```

> **Note**: For sticky headers to work properly, the calendar's container must have a fixed height (e.g., `height: 600px`).

## Resource Interface

Resources represent the entities across which events are organized.

### Resource Type Definition

```typescript
interface Resource {
  // Unique identifier for the resource
  id: string | number

  // Display name of the resource
  name: string

  // Color for resource text (hex, rgb, or CSS class)
  color?: string

  // Background color for resource (hex, rgb, or CSS class)
  backgroundColor?: string

  // Optional position for resource display order
  position?: number
}
```

> **Note**: In ScopeInspect Calendar, resources use the `name` property instead of `title` for consistency.

### Resource Color System

Colorful Resources:

```tsx
const resources: Resource[] = [
  {
    id: 'designer',
    name: 'Design Team',
    color: '#8B5CF6',        // Purple text
    backgroundColor: '#F5F3FF', // Light purple background
  },
  {
    id: 'engineer',
    name: 'Engineering Team',
    color: '#10B981',        // Green text
    backgroundColor: '#ECFDF5', // Light green background
  },
]
```

## Resource Calendar Events

The standard `CalendarEvent` interface includes optional resource assignment fields for use with resource calendars.

### CalendarEvent with Resource Properties

```typescript
interface CalendarEvent {
  // ... standard event properties (id, title, start, end, etc.)

  // Single resource assignment
  resourceId?: string | number

  // Multiple resource assignment (cross-resource events)
  resourceIds?: (string | number)[]
}
```

### Single Resource Events

Event Assigned to One Resource:

```tsx
const event: CalendarEvent = {
  id: 'meeting-1',
  title: 'Team Standup',
  start: dayjs('2025-08-04T10:00:00.000Z'),
  end: dayjs('2025-08-04T10:30:00.000Z'),
  uid: 'meeting-1@scope-inspect.calendar',
  resourceId: 'room-a', // Assigned to one resource
}
```

### Cross-Resource Events

Events that span multiple resources using the `resourceIds` array:

```tsx
const event: CalendarEvent = {
  id: 'all-hands',
  title: 'All Hands Meeting',
  start: dayjs('2025-08-04T14:00:00.000Z'),
  end: dayjs('2025-08-04T15:00:00.000Z'),
  uid: 'all-hands@scope-inspect.calendar',
  resourceIds: ['room-a', 'room-b', 'room-c'], // Spans multiple resources
  color: '#8B5CF6',
}
```

## Props

The `ScopeInspectResourceCalendar` component extends all props from `ScopeInspectCalendar` (including `locale`, `timezone`, `timeFormat`, `visibleHours`, `businessHours`, etc.) with resource-specific additions below.

### Resource-Specific Props

| Prop           | Type                              | Default | Description                                                                            |
| -------------- | --------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| `resources`    | `Resource[]`                      | `[]`    | Array of resources to display                                                          |
| `events`       | `CalendarEvent[]`                 | `[]`    | Array of events with resource assignments (using `resourceId` or `resourceIds` properties) |
| `renderResource` | `(resource: Resource) => ReactNode` | `undefined` | Custom function to render resource headers                                             |

### Inherited Props

All props from `ScopeInspectCalendar` are available, including:

- `initialView` - Set the initial view (`'month'`, `'week'`, `'day'`, `'year'`)
- `firstDayOfWeek` - First day of the week
- `locale` - Locale for date formatting
- `timezone` - Timezone for date handling
- `timeFormat` - Time format (`'12-hour'` or `'24-hour'`)
- `visibleHours` - **Exclusive feature**: Control displayed time range
- `businessHours` - Restrict interactions to business hours
- `onEventClick` - Event click handler
- `onCellClick` - Cell click handler
- `onEventAdd` - Event add handler
- `onEventUpdate` - Event update handler
- `onEventDelete` - Event delete handler
- `onDateChange` - Date change handler
- `onViewChange` - View change handler
- `renderEvent` - Custom event renderer
- `renderEventForm` - Custom event form renderer
- `disableCellClick` - Disable cell clicks
- `disableEventClick` - Disable event clicks
- `disableDragAndDrop` - Disable drag and drop
- `dayMaxEvents` - Maximum events per day
- `stickyViewHeader` - Sticky header option
- And more...

See the [ScopeInspectCalendar API Reference](./scope-inspect-calendar.md) for complete prop documentation.

## Examples

### Room Booking System

Conference Room Booking:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent, CellClickInfo, Resource } from 'scope-inspect-calendar'
import { useState } from 'react'
import dayjs from 'dayjs'

const RoomBookingCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const rooms: Resource[] = [
    {
      id: 'conf-a',
      name: 'Conference Room A (10 people)',
      color: '#3B82F6',
      backgroundColor: '#EFF6FF',
    },
    {
      id: 'conf-b',
      name: 'Conference Room B (20 people)',
      color: '#EF4444',
      backgroundColor: '#FEF2F2',
    },
    {
      id: 'board-room',
      name: 'Board Room (8 people)',
      color: '#8B5CF6',
      backgroundColor: '#F5F3FF',
    },
  ]

  const handleCellClick = (info: CellClickInfo) => {
    const { start, end, resourceId } = info
    if (!resourceId) return

    const newEvent: CalendarEvent = {
      id: `booking-${Date.now()}`,
      title: 'New Booking',
      start,
      end,
      uid: `booking-${Date.now()}@scope-inspect.calendar`,
      resourceId,
      color: '#10B981',
    }

    setEvents((prev) => [...prev, newEvent])
  }

  const handleEventUpdate = (event: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === event.id ? event : e))
    )
  }

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectResourceCalendar
        resources={rooms}
        events={events}
        initialView="week"
        onCellClick={handleCellClick}
        onEventUpdate={handleEventUpdate}
        firstDayOfWeek="monday"
        visibleHours={{ startTime: 8, endTime: 18 }}
      />
    </div>
  )
}
```

### Custom Resource Rendering

Customize how resources are displayed using the `renderResource` prop:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'
import { Calendar, MapPin, Users } from 'lucide-react'

const IconResourceRenderer = (resource: Resource) => {
  const getResourceIcon = (resourceId: string | number) => {
    const id = String(resourceId)
    if (id.includes('room')) return <MapPin className="h-4 w-4" />
    if (id.includes('team')) return <Users className="h-4 w-4" />
    return <Calendar className="h-4 w-4" />
  }

  return (
    <div className="flex items-center gap-2 p-2">
      <div style={{ color: resource.color }}>
        {getResourceIcon(resource.id)}
      </div>
      <div className="flex flex-col">
        <span className="font-medium">{resource.name}</span>
        <span className="text-xs" style={{ color: resource.color }}>
          Available
        </span>
      </div>
    </div>
  )
}

function App() {
  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectResourceCalendar
        resources={resources}
        events={events}
        renderResource={IconResourceRenderer}
      />
    </div>
  )
}
```

### Team Scheduling

Schedule team members across multiple resources:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import type { Resource, CalendarEvent } from 'scope-inspect-calendar'

const TeamSchedulingCalendar = () => {
  const teamMembers: Resource[] = [
    {
      id: 'john',
      name: 'John Doe',
      color: '#3B82F6',
      backgroundColor: '#EFF6FF',
    },
    {
      id: 'jane',
      name: 'Jane Smith',
      color: '#10B981',
      backgroundColor: '#ECFDF5',
    },
    {
      id: 'bob',
      name: 'Bob Johnson',
      color: '#F59E0B',
      backgroundColor: '#FEF3C7',
    },
  ]

  const events: CalendarEvent[] = [
    {
      id: 'meeting-1',
      title: 'Project Review',
      start: dayjs('2025-08-04T10:00:00'),
      end: dayjs('2025-08-04T11:00:00'),
      resourceIds: ['john', 'jane'], // Cross-resource event
      backgroundColor: '#8B5CF6',
      color: 'white',
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectResourceCalendar
        resources={teamMembers}
        events={events}
        initialView="week"
        visibleHours={{ startTime: 9, endTime: 17 }}
      />
    </div>
  )
}
```

## Views

The Resource Calendar supports three views, each displaying resources in horizontal rows.

### Month View

Timeline view with resources as rows and days as columns. Compact event display with scroll for all resources.

```tsx
<ScopeInspectResourceCalendar
  resources={resources}
  events={events}
  initialView="month"
/>
```

### Week View

Detailed 7-day timeline with hourly time slots. Perfect for precise scheduling with drag-and-drop between resources.

```tsx
<ScopeInspectResourceCalendar
  resources={resources}
  events={events}
  initialView="week"
/>
```

### Day View

Focused single-day view with maximum detail. Full hourly breakdown across all resources.

```tsx
<ScopeInspectResourceCalendar
  resources={resources}
  events={events}
  initialView="day"
/>
```

> **Note**: Custom duration views (e.g., 3-day, 2-week, 4-week views) for the resource calendar are currently in development and will be available in a future release.

## Best Practices

### Resource Organization

- **Use meaningful resource IDs**: Use descriptive IDs like `'room-a'`, `'john-doe'`, `'equipment-1'`
- **Set position property**: Use the `position` property to control display order when needed
- **Group related resources**: Organize resources by type or category for better UX
- **Include capacity info**: Add capacity or other relevant info in resource names when applicable (e.g., `'Conference Room A (10 people)'`)

```tsx
const resources: Resource[] = [
  {
    id: 'room-a',
    name: 'Conference Room A (10 people)',
    position: 1,
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  {
    id: 'room-b',
    name: 'Conference Room B (20 people)',
    position: 2,
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
]
```

### Event Assignment

- **Use `resourceId` for single resource events**: Simpler and more performant than using arrays
- **Use `resourceIds` only when necessary**: Only use the array when an event truly spans multiple resources
- **Validate resource IDs**: Ensure resource IDs in events exist in the resources array
- **Handle conflicts**: Validate resource availability before booking to prevent double-booking

```tsx
// Good: Single resource assignment
const event: CalendarEvent = {
  id: '1',
  title: 'Meeting',
  start: dayjs('2025-08-04T10:00:00'),
  end: dayjs('2025-08-04T11:00:00'),
  resourceId: 'room-a', // Simple and performant
}

// Good: Multiple resources when needed
const crossResourceEvent: CalendarEvent = {
  id: '2',
  title: 'All Hands',
  start: dayjs('2025-08-04T14:00:00'),
  end: dayjs('2025-08-04T15:00:00'),
  resourceIds: ['room-a', 'room-b', 'room-c'], // Only when truly needed
}
```

### Performance

- **Memoize event filtering**: For large datasets, memoize the filtering of events by resource
- **Consider virtualization**: For 50+ resources, consider implementing virtualization
- **Batch state updates**: Batch multiple state updates together to reduce re-renders
- **Use React.memo**: Use `React.memo` for custom resource renderers to prevent unnecessary re-renders

```tsx
import { useMemo } from 'react'

const ResourceCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [resources, setResources] = useState<Resource[]>([])

  // Memoize events by resource for better performance
  const eventsByResource = useMemo(() => {
    const map = new Map<string | number, CalendarEvent[]>()
    events.forEach((event) => {
      if (event.resourceId) {
        const resourceEvents = map.get(event.resourceId) || []
        resourceEvents.push(event)
        map.set(event.resourceId, resourceEvents)
      }
      if (event.resourceIds) {
        event.resourceIds.forEach((resourceId) => {
          const resourceEvents = map.get(resourceId) || []
          resourceEvents.push(event)
          map.set(resourceId, resourceEvents)
        })
      }
    })
    return map
  }, [events])

  return (
    <ScopeInspectResourceCalendar
      resources={resources}
      events={events}
    />
  )
}
```

### Custom Resource Renderer with Memoization

```tsx
import { memo } from 'react'
import type { Resource } from 'scope-inspect-calendar'

const MemoizedResourceRenderer = memo((resource: Resource) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: resource.backgroundColor }}
      />
      <span className="font-medium">{resource.name}</span>
    </div>
  )
})

MemoizedResourceRenderer.displayName = 'MemoizedResourceRenderer'

// Usage
<ScopeInspectResourceCalendar
  resources={resources}
  events={events}
  renderResource={MemoizedResourceRenderer}
/>
```

## Types

### Resource Interface

```typescript
interface Resource {
  // Unique identifier for the resource
  id: string | number

  // Display name of the resource
  name: string

  // Color for resource text (hex, rgb, or CSS class)
  color?: string

  // Background color for resource (hex, rgb, or CSS class)
  backgroundColor?: string

  // Optional position for resource display order
  position?: number
}
```

### ScopeInspectResourceCalendarProps Interface

```typescript
interface ScopeInspectResourceCalendarProps
  extends Omit<ScopeInspectCalendarProps, 'events'> {
  // Array of events to display
  events?: ScopeInspectResourceCalendarPropEvent[]

  // Array of resources
  resources?: Resource[]

  // Custom render function for resources
  renderResource?: (resource: Resource) => React.ReactNode
}
```

### ScopeInspectResourceCalendarPropEvent Interface

```typescript
interface ScopeInspectResourceCalendarPropEvent
  extends ScopeInspectCalendarPropEvent {
  // Single resource assignment
  resourceId?: string | number

  // Multiple resource assignment (cross-resource events)
  resourceIds?: (string | number)[]
}
```

## Related Documentation

- **[README.md](../../../README.md)** - Main documentation index
- [Calendar Component](./scope-inspect-calendar.md) - Base calendar component
- [Resource Calendar Documentation](../../resource-calendar.md) - Detailed guide for resource calendars
- [Recurring Events Guide](../../guides/recurring-events.md) - Recurring events with resources
- [Internationalization Guide](../../guides/internationalization.md) - i18n support
- [Theming & Styling Guide](../../guides/theming-and-styling.md) - Customize appearance
- [Custom Rendering Guide](../../guides/custom-rendering.md) - Custom resource rendering

