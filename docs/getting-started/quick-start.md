# Quick Start

Get up and running with ScopeInspect Calendar in minutes. This guide will help you create your first calendar component.

## Minimal Example

Here's the simplest way to use ScopeInspect Calendar:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function App() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ]

  return <ScopeInspectCalendar events={events} />
}

export default App
```

That's it! You now have a fully functional calendar.

## Step-by-Step Setup

### 1. Import the Component

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
```

### 2. Import Types (Optional but Recommended)

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
```

### 3. Define Your Events

Events are defined as an array of `CalendarEvent` objects:

```tsx
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
  },
  {
    id: '2',
    title: 'Lunch Break',
    start: new Date('2025-01-15T12:00:00'),
    end: new Date('2025-01-15T13:00:00'),
  },
]
```

### 4. Render the Calendar

```tsx
<ScopeInspectCalendar events={events} />
```

## Complete Example

Here's a more complete example with some common configurations:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { useState } from 'react'

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ])

  const handleEventClick = (event: CalendarEvent) => {
    console.log('Event clicked:', event)
  }

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event])
    console.log('Event added:', event)
  }

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        initialView="month"
        onEventClick={handleEventClick}
        onEventAdd={handleEventAdd}
        visibleHours={{ startTime: 9, endTime: 17 }}
      />
    </div>
  )
}

export default App
```

## Key Concepts

### Events

Events are the core data structure. Each event must have:

- `id`: Unique identifier
- `title`: Display name
- `start`: Start date/time
- `end`: End date/time

### Views

The calendar supports four views:

- `month` - Monthly calendar view (default)
- `week` - Weekly view with time slots
- `day` - Single day view
- `year` - Annual overview

### Visible Hours

The `visibleHours` prop controls which time range is displayed:

```tsx
<ScopeInspectCalendar
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }} // Show 9 AM to 5 PM
/>
```

## What's Next?

Now that you have a basic calendar working:

1. **[Basic Usage](./basic-usage.md)** - Learn about props, callbacks, and event handling
2. **[Calendar Views](../guides/calendar-views.md)** - Explore different view types
3. **[Recurring Events](../guides/recurring-events.md)** - Create recurring events
4. **[Resource Calendar](../guides/resource-calendar.md)** - Use multiple resources

## Common Patterns

### Handling Event Clicks

```tsx
const handleEventClick = (event: CalendarEvent) => {
  alert(`Clicked: ${event.title}`)
}

;<ScopeInspectCalendar events={events} onEventClick={handleEventClick} />
```

### Adding Events

```tsx
const handleEventAdd = (event: CalendarEvent) => {
  // Save to your backend or state
  console.log('New event:', event)
}

;<ScopeInspectCalendar events={events} onEventAdd={handleEventAdd} />
```

### Custom Initial View

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week" // Start in week view
/>
```

## Troubleshooting

**Calendar not displaying?**

- Ensure Tailwind CSS is configured
- Check that the container has a defined height
- Verify events array is not empty

**Events not showing?**

- Check event date ranges
- Ensure events are within the visible date range
- Verify event data structure

**Styling issues?**

- Make sure Tailwind CSS is properly set up
- Check for CSS conflicts
- Verify Tailwind classes are not purged

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Installation](./installation.md)
- [Project Setup](./project-setup.md)
- [Basic Usage](./basic-usage.md)
- [API Reference](../api-reference/components/scope-inspect-calendar.md)
