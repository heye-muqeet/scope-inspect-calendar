# Calendar Views

ScopeInspect Calendar supports four different views: Month, Week, Day, and Year. Each view provides a different perspective on your calendar events and is optimized for specific use cases.

## Overview

The calendar supports the following views:

- **Month View** - Monthly calendar grid with day cells
- **Week View** - Weekly timeline with hourly time slots
- **Day View** - Single day focus with detailed time slots
- **Year View** - Annual overview with month navigation

## View Types

```typescript
type CalendarView = 'month' | 'week' | 'day' | 'year'
```

## Setting the Initial View

Use the `initialView` prop to set which view displays when the calendar loads:

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week" // 'month' | 'week' | 'day' | 'year'
/>
```

## Switching Views

Users can switch views using the view controls in the calendar header, or programmatically:

```tsx
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomViewSwitcher() {
  const { view, setView } = useScopeInspectCalendarContext()

  return (
    <div>
      <button onClick={() => setView('month')}>Month</button>
      <button onClick={() => setView('week')}>Week</button>
      <button onClick={() => setView('day')}>Day</button>
      <button onClick={() => setView('year')}>Year</button>
    </div>
  )
}
```

## Month View

The Month View displays a traditional monthly calendar grid, perfect for getting an overview of events across the month.

### Features

- **Day Cells**: Each day is displayed as a cell in a grid
- **Event Indicators**: Events are shown as indicators or previews in day cells
- **Event Overflow**: When there are more events than can fit, a "+X more" indicator is shown
- **All-Day Events**: Displayed prominently at the top of day cells
- **Week Navigation**: Navigate by weeks or months
- **Week Start**: Configurable first day of the week

### Usage

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="month"
  dayMaxEvents={3} // Maximum events to show per day
/>
```

### Configuration

#### `dayMaxEvents`

Controls how many events are displayed per day before showing overflow:

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="month"
  dayMaxEvents={5} // Show up to 5 events, then "+X more"
/>
```

Default: `3`

### Event Display

In Month View, events are displayed as:

- **Event indicators**: Small colored bars or dots
- **Event titles**: Truncated to fit in day cells
- **All-day events**: Shown at the top of the day cell
- **Overflow indicator**: "+X more" when events exceed `dayMaxEvents`

### Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function MonthViewExample() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
    {
      id: '2',
      title: 'All Day Event',
      start: new Date('2025-01-20'),
      end: new Date('2025-01-20'),
      allDay: true,
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        initialView="month"
        dayMaxEvents={3}
        firstDayOfWeek="monday"
      />
    </div>
  )
}
```

## Week View

The Week View provides a detailed timeline showing a full week with hourly time slots. Perfect for scheduling and time management.

### Features

- **7-Day Display**: Shows a full week (Sunday to Saturday or Monday to Sunday)
- **Hourly Time Slots**: Vertical time grid with hourly divisions
- **Time Scale**: Configurable time format (12-hour or 24-hour)
- **Event Positioning**: Events are positioned precisely based on start/end times
- **Collision Detection**: Overlapping events are handled intelligently
- **All-Day Events Row**: Special row at the top for all-day events
- **Drag & Drop**: Move events between time slots and days
- **Visible Hours**: Control which time range is displayed

### Usage

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week"
  timeFormat="12-hour" // or "24-hour"
  visibleHours={{ startTime: 9, endTime: 17 }} // Show 9 AM to 5 PM
/>
```

### Configuration

#### `timeFormat`

Controls the time display format:

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week"
  timeFormat="24-hour" // "12-hour" | "24-hour"
/>
```

Default: `"12-hour"`

#### `visibleHours`

Controls which time range is displayed (exclusive feature):

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="week"
  visibleHours={{
    startTime: 9, // Show from 9 AM
    endTime: 17, // Show until 5 PM
  }}
/>
```

### Event Display

In Week View, events are displayed as:

- **Time-based blocks**: Events span their exact start/end times
- **Overlapping events**: Side-by-side when times overlap
- **All-day events**: In a dedicated row at the top
- **Event details**: Title, time, and optional description visible

### Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function WeekViewExample() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Morning Standup',
      start: new Date('2025-01-15T09:00:00'),
      end: new Date('2025-01-15T09:30:00'),
    },
    {
      id: '2',
      title: 'Client Meeting',
      start: new Date('2025-01-15T14:00:00'),
      end: new Date('2025-01-15T15:30:00'),
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        initialView="week"
        timeFormat="12-hour"
        visibleHours={{ startTime: 8, endTime: 18 }}
        firstDayOfWeek="monday"
      />
    </div>
  )
}
```

## Day View

The Day View focuses on a single day with maximum detail. Ideal for detailed daily planning and time blocking.

### Features

- **Single Day Focus**: Shows one day at a time
- **Hourly Time Slots**: Detailed hourly breakdown
- **Precise Event Positioning**: Exact time-based event placement
- **All-Day Events**: Displayed at the top
- **Time Navigation**: Navigate day by day
- **Visible Hours**: Control displayed time range

### Usage

```tsx
<ScopeInspectCalendar
  events={events}
  initialView="day"
  visibleHours={{ startTime: 6, endTime: 22 }} // Show 6 AM to 10 PM
/>
```

### Configuration

Same configuration options as Week View:

- `timeFormat` - Time display format
- `visibleHours` - Time range to display

### Event Display

In Day View, events are displayed similarly to Week View but with:

- **Full day width**: Events span the full width of the day column
- **Maximum detail**: More space for event information
- **Better readability**: Easier to see event details

### Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function DayViewExample() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Deep Work Session',
      start: new Date('2025-01-15T09:00:00'),
      end: new Date('2025-01-15T12:00:00'),
      description: 'Focused work time',
    },
    {
      id: '2',
      title: 'Lunch Break',
      start: new Date('2025-01-15T12:30:00'),
      end: new Date('2025-01-15T13:30:00'),
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        initialView="day"
        timeFormat="24-hour"
        visibleHours={{ startTime: 8, endTime: 20 }}
      />
    </div>
  )
}
```

## Year View

The Year View provides an annual overview, showing all 12 months in a grid layout. Great for long-term planning and seeing event density across the year.

### Features

- **12-Month Grid**: All months displayed in a grid
- **Event Density**: Visual indicators of event density per month
- **Month Navigation**: Click months to navigate
- **Overview**: Quick view of the entire year
- **Compact Display**: Optimized for overview, not detail

### Usage

```tsx
<ScopeInspectCalendar events={events} initialView="year" />
```

### Event Display

In Year View, events are displayed as:

- **Density indicators**: Visual representation of event density
- **Month highlights**: Months with events are highlighted
- **Click to navigate**: Click a month to switch to Month View

### Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function YearViewExample() {
  const events: CalendarEvent[] = [
    // Events spread across the year
    {
      id: '1',
      title: 'Q1 Planning',
      start: new Date('2025-01-15'),
      end: new Date('2025-01-15'),
      allDay: true,
    },
    {
      id: '2',
      title: 'Mid-Year Review',
      start: new Date('2025-06-15'),
      end: new Date('2025-06-15'),
      allDay: true,
    },
  ]

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar events={events} initialView="year" />
    </div>
  )
}
```

## View Transitions

The calendar includes smooth transitions when switching between views:

```tsx
// View transitions are automatic
// Users can switch via header controls or programmatically
const { view, setView } = useScopeInspectCalendarContext()

// Switch to week view
setView('week')
```

## View-Specific Props

Some props are more relevant to specific views:

### Month View

- `dayMaxEvents` - Control event overflow

### Week/Day View

- `timeFormat` - Time display format
- `visibleHours` - Time range to display
- `businessHours` - Business hours configuration

### All Views

- `firstDayOfWeek` - Week start day
- `locale` - Locale for date formatting
- `onViewChange` - Callback when view changes

## Listening to View Changes

Use the `onViewChange` callback to react to view changes:

```tsx
const handleViewChange = (view: CalendarView) => {
  console.log('View changed to:', view)
  // Save to analytics, update state, etc.
}

;<ScopeInspectCalendar events={events} onViewChange={handleViewChange} />
```

## Programmatic View Control

Access view controls via the context hook:

```tsx
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomControls() {
  const { view, setView, nextPeriod, prevPeriod, today } =
    useScopeInspectCalendarContext()

  return (
    <div>
      <button onClick={() => setView('month')}>Month</button>
      <button onClick={() => setView('week')}>Week</button>
      <button onClick={() => setView('day')}>Day</button>
      <button onClick={() => setView('year')}>Year</button>
      <button onClick={prevPeriod}>Previous</button>
      <button onClick={today}>Today</button>
      <button onClick={nextPeriod}>Next</button>
    </div>
  )
}
```

## Best Practices

### Choosing the Right View

- **Month View**: Use for overview and planning
- **Week View**: Use for weekly scheduling and time management
- **Day View**: Use for detailed daily planning
- **Year View**: Use for annual overview and long-term planning

### Performance Considerations

- Month View handles large numbers of events efficiently
- Week/Day Views are optimized for time-based events
- Year View provides quick overview without loading all event details

### User Experience

- Allow users to switch views easily
- Remember user's preferred view (localStorage)
- Provide view-specific shortcuts
- Show appropriate controls for each view

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Basic Usage](../getting-started/basic-usage.md) - Usage fundamentals
- [API Reference](../api-reference/components/scope-inspect-calendar.md) - Complete API docs
- [Theming & Styling](./theming-and-styling.md) - Customize calendar appearance
