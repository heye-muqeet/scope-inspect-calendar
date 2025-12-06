# Basic Usage

Learn the fundamentals of using ScopeInspect Calendar, including setup, props, callbacks, and common patterns.

## Basic Setup

Before using ScopeInspect Calendar, you need to configure Tailwind CSS and optionally Day.js. Follow these essential setup steps:

### 1. Configure Tailwind CSS

Since ScopeInspect Calendar is built with Tailwind CSS v4, you need to register the source path in your CSS file to ensure all component styles are included.

**In your main CSS file** (e.g., `src/index.css`, `src/app/globals.css`, or `src/styles/global.css`):

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

> **Note**: The `@source` directive tells Tailwind to scan the calendar package for classes and include them in your build. This is especially important since `node_modules` are typically ignored by Tailwind by default.

**For Tailwind CSS v4 with Vite** (Next.js, Astro, Vite projects):

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";
```

**For traditional Tailwind CSS setup**, ensure the package is included in your `tailwind.config.js`:

```js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/scope-inspect-calendar/dist/**/*.{js,ts,jsx,tsx}',
  ],
}
```

### 2. Configure Day.js (Optional)

If you are using Day.js and have installed it as a dependency in your project, you might need to extend the plugins that are required for this library.

**Create a dayjs configuration file** (e.g., `src/lib/dayjs-config.ts` or `src/configs/dayjs-config.ts`):

```typescript
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import isBetween from 'dayjs/plugin/isBetween.js'
import minMax from 'dayjs/plugin/minMax.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import localeData from 'dayjs/plugin/localeData.js'

// Extend dayjs with plugins
dayjs.extend(weekday)
dayjs.extend(weekOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)
dayjs.extend(minMax)
dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(localeData)

export default dayjs
```

> **Note**: The minimum required plugins are `isSameOrAfter`, `isSameOrBefore`, `timezone`, and `utc`. However, the calendar uses additional plugins for enhanced functionality. If you're using the calendar with Date objects or ISO strings only, you may only need the minimum plugins.

**Then import it in your app** (before using the calendar):

```tsx
// Import dayjs config early in your app
import './lib/dayjs-config'

// Or import it in your main entry file
import './configs/dayjs-config'
```

> **Note**: These plugins are required for proper date handling and timezone support within the calendar component. If you're using the calendar with Date objects or ISO strings, this step is optional.

### 3. Import and Use the Calendar

Now you can start using the calendar with minimal configuration:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

export default function MyCalendar() {
  return (
    <div className="p-6" style={{ height: '600px' }}>
      <ScopeInspectCalendar />
    </div>
  )
}
```

**With events:**

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

export default function MyCalendar() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ]

  return (
    <div className="p-6" style={{ height: '600px' }}>
      <ScopeInspectCalendar events={events} />
    </div>
  )
}
```

## Component Props

### Essential Props

#### `events`

An array of calendar events to display:

```tsx
<ScopeInspectCalendar
  events={[
    {
      id: '1',
      title: 'Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ]}
/>
```

#### `initialView`

Set the initial calendar view:

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week" // 'month' | 'week' | 'day' | 'year'
/>
```

#### `firstDayOfWeek`

Configure which day starts the week:

```tsx
<ScopeInspectCalendar
  events={events}
  firstDayOfWeek="monday" // 'sunday' | 'monday' | 'tuesday' | ...
/>
```

### Event Callbacks

#### `onEventClick`

Called when a user clicks on an event:

```tsx
const handleEventClick = (event: CalendarEvent) => {
  console.log('Event clicked:', event.title)
}

;<ScopeInspectCalendar events={events} onEventClick={handleEventClick} />
```

#### `onEventAdd`

Called when a new event is created:

```tsx
const handleEventAdd = (event: CalendarEvent) => {
  // Save to your backend
  console.log('Event added:', event)
}

;<ScopeInspectCalendar events={events} onEventAdd={handleEventAdd} />
```

#### `onEventUpdate`

Called when an event is modified:

```tsx
const handleEventUpdate = (event: CalendarEvent) => {
  // Update in your backend
  console.log('Event updated:', event)
}

;<ScopeInspectCalendar events={events} onEventUpdate={handleEventUpdate} />
```

#### `onEventDelete`

Called when an event is deleted:

```tsx
const handleEventDelete = (event: CalendarEvent) => {
  // Delete from your backend
  console.log('Event deleted:', event)
}

;<ScopeInspectCalendar events={events} onEventDelete={handleEventDelete} />
```

#### `onCellClick`

Called when a calendar cell (date/time slot) is clicked:

```tsx
const handleCellClick = (info: CellClickInfo) => {
  console.log('Cell clicked:', info.start, info.end)
}

;<ScopeInspectCalendar events={events} onCellClick={handleCellClick} />
```

#### `onViewChange`

Called when the calendar view changes:

```tsx
const handleViewChange = (view: CalendarView) => {
  console.log('View changed to:', view)
}

;<ScopeInspectCalendar events={events} onViewChange={handleViewChange} />
```

#### `onDateChange`

Called when the current date changes (navigation):

```tsx
const handleDateChange = (date: dayjs.Dayjs) => {
  console.log('Date changed to:', date.format('YYYY-MM-DD'))
}

;<ScopeInspectCalendar events={events} onDateChange={handleDateChange} />
```

## Event Data Structure

### Basic Event

```tsx
const event: CalendarEvent = {
  id: '1',
  title: 'Team Meeting',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T11:00:00'),
}
```

### Event with Optional Properties

```tsx
const event: CalendarEvent = {
  id: '1',
  title: 'Team Meeting',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T11:00:00'),
  description: 'Weekly team sync',
  location: 'Conference Room A',
  color: '#3b82f6',
  backgroundColor: '#dbeafe',
  allDay: false,
}
```

### All-Day Event

```tsx
const event: CalendarEvent = {
  id: '1',
  title: 'Holiday',
  start: new Date('2025-01-15'),
  end: new Date('2025-01-15'),
  allDay: true,
}
```

## Date Formats

The calendar accepts dates in multiple formats:

```tsx
// Date object
start: new Date('2025-01-15T10:00:00')

// ISO string
start: '2025-01-15T10:00:00.000Z'

// dayjs object
import dayjs from 'dayjs'
start: dayjs('2025-01-15T10:00:00')
```

## Common Patterns

### Managing Events State

```tsx
import { useState } from 'react'
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function App() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event])
  }

  const handleEventUpdate = (event: CalendarEvent) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)))
  }

  const handleEventDelete = (event: CalendarEvent) => {
    setEvents(events.filter((e) => e.id !== event.id))
  }

  return (
    <ScopeInspectCalendar
      events={events}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
    />
  )
}
```

### Disabling Interactions

```tsx
<ScopeInspectCalendar
  events={events}
  disableCellClick={true} // Disable cell clicks
  disableEventClick={true} // Disable event clicks
  disableDragAndDrop={true} // Disable drag & drop
/>
```

### Custom Event Rendering

```tsx
const renderEvent = (event: CalendarEvent) => {
  return (
    <div className="custom-event">
      <strong>{event.title}</strong>
      {event.description && <p>{event.description}</p>}
    </div>
  )
}

;<ScopeInspectCalendar events={events} renderEvent={renderEvent} />
```

### Locale Configuration

```tsx
<ScopeInspectCalendar
  events={events}
  locale="en" // Set locale
  firstDayOfWeek="monday" // Set week start
  timeFormat="24-hour" // 12-hour or 24-hour
/>
```

## Styling

### Container Height

The calendar needs a defined height:

```tsx
<div style={{ height: '600px' }}>
  <ScopeInspectCalendar events={events} />
</div>
```

Or with Tailwind:

```tsx
<div className="h-[600px]">
  <ScopeInspectCalendar events={events} />
</div>
```

### Custom CSS Variables

Override default colors:

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
}
```

## Complete Example

```tsx
import { useState } from 'react'
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function CalendarApp() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
      description: 'Weekly sync',
      location: 'Room A',
    },
  ])

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event])
  }

  const handleEventUpdate = (event: CalendarEvent) => {
    setEvents(events.map((e) => (e.id === event.id ? event : e)))
  }

  const handleEventDelete = (event: CalendarEvent) => {
    setEvents(events.filter((e) => e.id !== event.id))
  }

  return (
    <div style={{ height: '600px', padding: '20px' }}>
      <ScopeInspectCalendar
        events={events}
        initialView="month"
        firstDayOfWeek="monday"
        locale="en"
        timeFormat="12-hour"
        onEventAdd={handleEventAdd}
        onEventUpdate={handleEventUpdate}
        onEventDelete={handleEventDelete}
        visibleHours={{ startTime: 9, endTime: 17 }}
      />
    </div>
  )
}

export default CalendarApp
```

## Next Steps

- **[Calendar Views](../guides/calendar-views.md)** - Learn about different view types
- **[Event Management](../guides/event-management.md)** - Advanced event operations
- **[Drag & Drop](../guides/drag-and-drop.md)** - Enable drag and drop functionality
- **[API Reference](../api-reference/components/scope-inspect-calendar.md)** - Complete API documentation

## Related Documentation

- [Quick Start](./quick-start.md)
- [Project Setup](./project-setup.md)
- [Calendar Views Guide](../guides/calendar-views.md)
