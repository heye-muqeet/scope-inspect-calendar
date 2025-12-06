# Custom Rendering

Learn how to customize individual calendar components including headers, view headers, and event rendering.

## Overview

ScopeInspect Calendar provides flexible customization options for various components:

- **Header Customization**: Customize or replace the calendar header
- **View Headers Customization**: Style the day headers (Mon, Tue, Wed, etc.)
- **Event Rendering**: Create custom event renderers for complete control over event appearance
- **Event Form Customization**: Replace the default event form with your own

## Header Customization

Customize the calendar header appearance and behavior using className props or replace it entirely with a custom component.

### Header Class Name

Use the `headerClassName` prop to apply custom styles to the calendar header:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      headerClassName="bg-blue-50 border-blue-200 text-blue-900"
    />
  )
}
```

### Custom Header Component

For complete control, you can replace the default header with your own component using the `headerComponent` prop:

```tsx
import {
  ScopeInspectCalendar,
  useScopeInspectCalendarContext,
} from 'scope-inspect-calendar'

function CustomHeader() {
  const { currentDate, nextPeriod, prevPeriod, view, setView } =
    useScopeInspectCalendarContext()

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600">
      <button
        onClick={prevPeriod}
        className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30"
      >
        ← Previous
      </button>
      <h2 className="text-white font-bold text-xl">
        {currentDate.format('MMMM YYYY')}
      </h2>
      <button
        onClick={nextPeriod}
        className="px-4 py-2 bg-white/20 text-white rounded hover:bg-white/30"
      >
        Next →
      </button>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<CustomHeader />} />
  )
}
```

### Advanced Custom Header

Create a fully featured custom header with view controls and actions:

```tsx
import {
  ScopeInspectCalendar,
  useScopeInspectCalendarContext,
} from 'scope-inspect-calendar'
import type { CalendarView } from 'scope-inspect-calendar'

function AdvancedCustomHeader() {
  const {
    currentDate,
    view,
    setView,
    nextPeriod,
    prevPeriod,
    today,
    openEventForm,
  } = useScopeInspectCalendarContext()

  const views: CalendarView[] = ['month', 'week', 'day', 'year']

  return (
    <div className="flex items-center justify-between p-4 border-b bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={today}
          className="px-3 py-1 border rounded hover:bg-gray-50"
        >
          Today
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPeriod}
            className="p-1 hover:bg-gray-100 rounded"
          >
            ←
          </button>
          <h2 className="text-lg font-semibold min-w-[200px] text-center">
            {currentDate.format('MMMM YYYY')}
          </h2>
          <button
            onClick={nextPeriod}
            className="p-1 hover:bg-gray-100 rounded"
          >
            →
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex border rounded">
          {views.map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1 text-sm ${
                view === v ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={() => openEventForm()}
          className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          + New Event
        </button>
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      headerComponent={<AdvancedCustomHeader />}
    />
  )
}
```

## View Headers Customization

Customize the day headers (Mon, Tue, Wed, etc.) that appear at the top of the calendar grid.

### View Header Class Name

Use the `viewHeaderClassName` prop to apply custom styles:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      viewHeaderClassName="bg-gray-100 text-gray-700 font-semibold py-3"
    />
  )
}
```

### Sticky View Header Positioning

When using a sticky view header (`stickyViewHeader={true}`), the `viewHeaderClassName` is where you add positioning classes to prevent overlap with your top navigation:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

// If you have a 64px top navigation bar
function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      stickyViewHeader={true}
      viewHeaderClassName="top-16 bg-background z-40"
    />
  )
}

// For multiple navigation elements (e.g., 80px total height)
function AppWithTallNav() {
  return (
    <ScopeInspectCalendar
      events={events}
      stickyViewHeader={true}
      viewHeaderClassName="top-20 bg-background shadow-sm z-40"
    />
  )
}
```

> **Remember**: Include `bg-background` and appropriate `z-index` values to ensure proper layering when using sticky headers.

## Event Rendering

Create custom event renderers to control how events appear within calendar cells using the `renderEvent` prop.

### Custom Event Renderer

Basic custom event renderer:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const renderEvent = (event: CalendarEvent) => (
  <div className="rounded-md p-2 text-sm font-medium bg-blue-100 text-blue-800">
    <span className="truncate">{event.title}</span>
  </div>
)

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={renderEvent} />
}
```

### Priority-Based Event Rendering

Customize event appearance based on priority or other custom properties:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const renderEvent = (event: CalendarEvent) => {
  const priority = event.data?.priority || 'normal'

  const priorityStyles = {
    high: 'bg-red-100 text-red-800 border-l-4 border-red-500',
    medium: 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500',
    normal: 'bg-blue-100 text-blue-800 border-l-4 border-blue-500',
  }

  return (
    <div
      className={`rounded-md p-2 text-sm font-medium ${priorityStyles[priority]}`}
    >
      <div className="flex items-center gap-2">
        {priority === 'high' && <span>🔥</span>}
        <span className="truncate">{event.title}</span>
      </div>
      {event.description && (
        <p className="text-xs opacity-75 mt-1 truncate">{event.description}</p>
      )}
    </div>
  )
}

function App() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Urgent Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
      data: { priority: 'high' },
    },
    // ... more events
  ]

  return <ScopeInspectCalendar events={events} renderEvent={renderEvent} />
}
```

### Rich Event Renderer with Actions

Create an interactive event renderer with action buttons:

```tsx
import {
  ScopeInspectCalendar,
  useScopeInspectCalendarContext,
} from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CustomEvent(event: CalendarEvent) {
  const { deleteEvent, openEventForm } = useScopeInspectCalendarContext()

  return (
    <div className="group relative rounded-md p-2 text-sm bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{event.title}</div>
          {event.description && (
            <div className="text-xs opacity-75 truncate mt-1">
              {event.description}
            </div>
          )}
          <div className="text-xs opacity-60 mt-1">
            {event.start.format('HH:mm')} - {event.end.format('HH:mm')}
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              openEventForm(event)
            }}
            className="p-1 hover:bg-blue-300 rounded"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (confirm('Delete this event?')) {
                deleteEvent(event.id)
              }
            }}
            className="p-1 hover:bg-red-300 rounded"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={CustomEvent} />
}
```

### Color-Coded Event Renderer

Use event colors for visual organization:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
// Note: cn is a utility function - use your project's utility or clsx/tailwind-merge

const renderEvent = (event: CalendarEvent) => {
  const backgroundColor = event.backgroundColor || 'bg-blue-100'
  const textColor = event.color || 'text-blue-800'

  return (
    <div
      className={cn(
        'rounded-md p-2 text-sm font-medium',
        backgroundColor,
        textColor
      )}
      style={{
        backgroundColor: event.backgroundColor,
        color: event.color,
      }}
    >
      <div className="truncate">{event.title}</div>
      {event.location && (
        <div className="text-xs opacity-75 mt-1 truncate">
          📍 {event.location}
        </div>
      )}
    </div>
  )
}

function App() {
  return <ScopeInspectCalendar events={events} renderEvent={renderEvent} />
}
```

### Event Props

The event object passed to your custom renderer includes:

- `id` - Unique event identifier
- `title` - Event title
- `start` - Start date/time (dayjs object)
- `end` - End date/time (dayjs object)
- `description` - Event description (optional)
- `location` - Event location (optional)
- `color` - Event text color (optional)
- `backgroundColor` - Event background color (optional)
- `allDay` - Whether it's an all-day event
- `data` - Any custom properties you include in your event data
- `rrule` - Recurrence rule (if recurring)
- `exdates` - Exception dates (if recurring)
- `recurrenceId` - Recurrence ID (if modified instance)
- `uid` - Unique identifier for iCalendar compatibility

## Event Form Customization

Replace the default event form with your own custom form using the `renderEventForm` prop:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { EventFormProps, CalendarEvent } from 'scope-inspect-calendar'

function CustomEventForm(props: EventFormProps) {
  const { open, selectedEvent, onAdd, onUpdate, onDelete, onClose } = props

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {selectedEvent ? 'Edit Event' : 'New Event'}
        </h2>
        {/* Your custom form UI */}
        <div className="flex gap-2 justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save
              onClose()
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      renderEventForm={(props) => <CustomEventForm {...props} />}
    />
  )
}
```

## Resource Calendar Customization

### Custom Resource Rendering

For resource calendars, you can customize how resources are displayed:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'
import { MapPin, Users } from 'lucide-react'

function CustomResourceHeader(resource: Resource) {
  const getIcon = (resourceId: string | number) => {
    const id = String(resourceId)
    if (id.includes('room')) return <MapPin className="h-4 w-4" />
    if (id.includes('team')) return <Users className="h-4 w-4" />
    return null
  }

  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <div style={{ color: resource.color }}>{getIcon(resource.id)}</div>
      <div className="flex flex-col">
        <span className="font-medium">{resource.name}</span>
        <span className="text-xs opacity-75">Available</span>
      </div>
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

## Styling Tips

### Pro Tips

- **Use CSS variables** for consistent theming across all custom components
- **Consider accessibility** when customizing colors and contrast ratios
- **Test your custom components** with different screen sizes and zoom levels
- **Use the `cn()` utility function** for conditional styling (if available in your project)
- **Memoize custom renderers** to prevent unnecessary re-renders

### CSS Variables for Theming

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
  --calendar-text: #1f2937;
}

/* Use in custom components */
.custom-header {
  background-color: var(--calendar-primary);
  color: var(--calendar-background);
}
```

### Conditional Styling

```tsx
// Use clsx, tailwind-merge, or your own utility function
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

const cn = (...inputs: any[]) => twMerge(clsx(inputs))

const renderEvent = (event: CalendarEvent) => {
  return (
    <div
      className={cn(
        'rounded-md p-2 text-sm',
        event.allDay && 'bg-purple-100',
        !event.allDay && 'bg-blue-100',
        event.data?.priority === 'high' && 'border-l-4 border-red-500'
      )}
    >
      {event.title}
    </div>
  )
}
```

### Responsive Design

```tsx
const renderEvent = (event: CalendarEvent) => (
  <div className="rounded-md p-1 sm:p-2 text-xs sm:text-sm">
    <div className="truncate">{event.title}</div>
    {/* Hide description on mobile */}
    {event.description && (
      <div className="hidden sm:block text-xs opacity-75 mt-1 truncate">
        {event.description}
      </div>
    )}
  </div>
)
```

## Complete Example

Here's a complete example combining multiple customization options:

```tsx
import {
  ScopeInspectCalendar,
  useScopeInspectCalendarContext,
} from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { useState } from 'react'

function CustomHeader() {
  const { currentDate, nextPeriod, prevPeriod, today } =
    useScopeInspectCalendarContext()

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <button onClick={prevPeriod} className="px-3 py-1 bg-white/20 rounded">
        ←
      </button>
      <h2 className="text-xl font-bold">{currentDate.format('MMMM YYYY')}</h2>
      <button onClick={nextPeriod} className="px-3 py-1 bg-white/20 rounded">
        →
      </button>
    </div>
  )
}

function CustomEvent(event: CalendarEvent) {
  const { openEventForm } = useScopeInspectCalendarContext()

  return (
    <div
      className="rounded-md p-2 text-sm bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200"
      onClick={() => openEventForm(event)}
    >
      <div className="font-medium truncate">{event.title}</div>
      {event.description && (
        <div className="text-xs opacity-75 mt-1 truncate">
          {event.description}
        </div>
      )}
    </div>
  )
}

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        headerComponent={<CustomHeader />}
        viewHeaderClassName="bg-gray-50 font-semibold py-2"
        renderEvent={CustomEvent}
        stickyViewHeader={true}
      />
    </div>
  )
}
```

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Calendar Component API Reference](../api-reference/components/scope-inspect-calendar.md) - Complete props documentation
- [Resource Calendar Component API Reference](../api-reference/components/scope-inspect-resource-calendar.md) - Resource calendar customization
- [Theming & Styling Guide](./theming-and-styling.md) - Advanced styling options
- [Basic Usage Guide](../getting-started/basic-usage.md) - Usage fundamentals
