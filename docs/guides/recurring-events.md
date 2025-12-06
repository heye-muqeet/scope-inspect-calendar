# Recurring Events

Create and manage repeating events with powerful RRULE-based recurrence patterns following the iCalendar specification.

The recurrence system in ScopeInspect Calendar supports creating repeating events using RRULE (Recurrence Rule) patterns based on the iCalendar RFC 5545 specification. Under the hood, it uses the powerful rrule.js library to generate recurring event instances, ensuring robust and reliable recurrence handling.

> **RFC 5545 Compliant**: The recurrence system uses the industry-standard RRULE format powered by rrule.js, ensuring compatibility with other calendar applications when exporting.

## Overview

Recurring events allow you to create a single event definition that automatically generates multiple occurrences based on a recurrence pattern. This is perfect for:

- Weekly team meetings
- Daily standups
- Monthly reviews
- Yearly anniversaries
- Custom schedules (e.g., every 2 weeks, first Monday of month)

## Key Features

### Flexible Patterns

- ✅ Daily, weekly, monthly, yearly recurrence
- ✅ Custom intervals (every 2 weeks, every 3 months, etc.)
- ✅ Specific weekdays (Mondays and Fridays)
- ✅ Month-specific patterns (last Friday of month)
- ✅ Count-based or date-based endings

### Advanced Management

- ✅ Exception dates (skip specific occurrences)
- ✅ Modified instances (edit individual occurrences)
- ✅ Dynamic generation within date ranges
- ✅ Efficient instance filtering
- ✅ Override detection and handling
- ✅ Google Calendar-style edit operations (this event, this and following, all events)

## Creating Recurring Events

### Basic Recurring Event

Create a recurring event by adding an `rrule` property to your event object:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

const weeklyMeeting: CalendarEvent = {
  id: 'weekly-standup',
  title: 'Weekly Team Standup',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T10:00:00'),
  description: 'Weekly team sync meeting',
  rrule: {
    freq: RRule.WEEKLY,
    interval: 1,
    byweekday: [RRule.MO], // Every Monday
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
    until: dayjs('2025-12-31T23:59:59').toDate(),
  },
}

function App() {
  return <ScopeInspectCalendar events={[weeklyMeeting]} />
}
```

### Common Recurrence Patterns

#### Daily Meetings

```tsx
const dailyStandup: CalendarEvent = {
  id: 'daily-standup',
  title: 'Daily Standup',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T09:30:00'),
  rrule: {
    freq: RRule.DAILY,
    interval: 1,
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
    count: 30, // 30 occurrences
  },
}
```

#### Bi-weekly Events

```tsx
const biWeeklyReview: CalendarEvent = {
  id: 'bi-weekly-review',
  title: 'Bi-weekly Review',
  start: dayjs('2025-08-04T14:00:00'),
  end: dayjs('2025-08-04T15:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    interval: 2, // Every 2 weeks
    byweekday: [RRule.FR], // Fridays
    dtstart: dayjs('2025-08-04T14:00:00').toDate(),
    until: dayjs('2026-08-04T14:00:00').toDate(),
  },
}
```

#### Monthly on Specific Weekday

```tsx
const monthlyMeeting: CalendarEvent = {
  id: 'monthly-meeting',
  title: 'Monthly Team Meeting',
  start: dayjs('2025-08-04T15:00:00'),
  end: dayjs('2025-08-04T16:00:00'),
  rrule: {
    freq: RRule.MONTHLY,
    byweekday: [RRule.FR.nth(-1)], // Last Friday of each month
    dtstart: dayjs('2025-08-04T15:00:00').toDate(),
    count: 12, // 12 months
  },
}
```

#### Work Week Days

```tsx
const workWeekEvents: CalendarEvent = {
  id: 'work-week',
  title: 'Work Day Event',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T17:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [
      RRule.MO,
      RRule.TU,
      RRule.WE,
      RRule.TH,
      RRule.FR,
    ],
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
    until: dayjs('2025-12-31T23:59:59').toDate(),
  },
}
```

#### Yearly Events

```tsx
const yearlyAnniversary: CalendarEvent = {
  id: 'anniversary',
  title: 'Company Anniversary',
  start: dayjs('2025-01-15'),
  end: dayjs('2025-01-15'),
  allDay: true,
  rrule: {
    freq: RRule.YEARLY,
    dtstart: dayjs('2025-01-15').toDate(),
    count: 10, // 10 years
  },
}
```

## Instance Generation

### Automatic Generation

The calendar automatically generates recurring event instances within the current view range using rrule.js internally. This happens transparently when navigating between different calendar views:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

// The calendar automatically generates instances
// when you provide a base recurring event
const events: CalendarEvent[] = [
  {
    id: 'weekly-standup',
    title: 'Weekly Team Standup',
    start: dayjs('2025-08-04T09:00:00'),
    end: dayjs('2025-08-04T10:00:00'),
    rrule: {
      freq: RRule.WEEKLY,
      byweekday: [RRule.MO],
      dtstart: dayjs('2025-08-04T09:00:00').toDate(),
      until: dayjs('2025-12-31T23:59:59').toDate(),
    },
  },
]

// Pass this to ScopeInspectCalendar and instances
// will be generated automatically for the current view
function App() {
  return <ScopeInspectCalendar events={events} />
}
```

### Handling Overrides

The system automatically handles modified instances and exception dates:

#### Modified Instances

When you modify a single occurrence of a recurring event, it creates a new event with a `recurrenceId` that matches the original occurrence time.

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

// Base recurring event
const weeklyStandup: CalendarEvent = {
  id: 'weekly-standup',
  title: 'Weekly Team Standup',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T10:00:00'),
  uid: 'weekly-standup@scope-inspect.calendar',
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
  },
}

// Modified instance for a specific occurrence
const modifiedInstance: CalendarEvent = {
  id: 'weekly-standup-modified',
  title: 'Extended Team Standup',
  start: dayjs('2025-08-11T09:00:00'),
  end: dayjs('2025-08-11T11:00:00'), // Extended duration
  recurrenceId: '2025-08-11T09:00:00.000Z', // Original occurrence time
  uid: 'weekly-standup@scope-inspect.calendar', // Same UID as base event
}

// Use both events together
const events = [weeklyStandup, modifiedInstance]
```

#### Exception Dates

Use `exdates` to skip specific occurrences without creating modified instances.

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

const recurringEvent: CalendarEvent = {
  id: 'weekly-meeting',
  title: 'Weekly Meeting',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T10:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
  },
  exdates: [
    '2025-08-18T09:00:00.000Z', // Skip this Monday
    '2025-08-25T09:00:00.000Z', // Skip this Monday too
  ],
}
```

## RRULE Properties

The RRULE object supports the following properties based on the iCalendar specification. These properties are processed by rrule.js to generate recurring event instances.

> **rrule.js Documentation**: For comprehensive documentation of all RRULE properties and advanced patterns, refer to the [rrule.js documentation](https://github.com/jkbrzt/rrule).

| Property   | Type        | Description                  | Example                  |
| ---------- | ----------- | ---------------------------- | ------------------------ |
| `freq`     | Frequency   | How often the event repeats  | `RRule.DAILY`            |
| `interval` | `number`    | Interval between occurrences | `2` (every 2 weeks)      |
| `byweekday` | `Weekday[]` | Specific days of the week    | `[RRule.MO, RRule.FR]`   |
| `bymonthday` | `number[]`  | Specific days of the month   | `[1, 15]` (1st and 15th) |
| `bymonth`  | `number[]`  | Specific months              | `[1, 7]` (Jan and July)  |
| `dtstart`  | `Date`      | Start date for recurrence    | `new Date('2025-08-04')` |
| `until`    | `Date`      | End date for recurrence      | `new Date('2025-12-31')` |
| `count`    | `number`    | Number of occurrences        | `10` (10 times)          |

> **Note**: You cannot use both `until` and `count` in the same RRULE. Choose one termination method.

### Frequency Values

- `RRule.DAILY` - Daily recurrence
- `RRule.WEEKLY` - Weekly recurrence
- `RRule.MONTHLY` - Monthly recurrence
- `RRule.YEARLY` - Yearly recurrence

### Weekday Values

- `RRule.MO` - Monday
- `RRule.TU` - Tuesday
- `RRule.WE` - Wednesday
- `RRule.TH` - Thursday
- `RRule.FR` - Friday
- `RRule.SA` - Saturday
- `RRule.SU` - Sunday

### Weekday with Position

You can specify the position of a weekday in a month:

- `RRule.MO.nth(1)` - First Monday
- `RRule.MO.nth(2)` - Second Monday
- `RRule.MO.nth(-1)` - Last Monday
- `RRule.FR.nth(-2)` - Second to last Friday

## Advanced Examples

### Complex Recurrence Pattern

First Monday of every quarter:

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

const quarterlyMeeting: CalendarEvent = {
  id: 'quarterly-review',
  title: 'Quarterly Business Review',
  start: dayjs('2025-01-06T14:00:00'), // First Monday of 2025
  end: dayjs('2025-01-06T16:00:00'),
  rrule: {
    freq: RRule.MONTHLY,
    interval: 3, // Every 3 months
    byweekday: [RRule.MO.nth(1)], // First Monday
    dtstart: dayjs('2025-01-06T14:00:00').toDate(),
  },
}
```

### Event with Exceptions and Modifications

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

// Base recurring event
const weeklyStandup: CalendarEvent = {
  id: 'standup',
  title: 'Team Standup',
  start: dayjs('2025-08-04T09:00:00'),
  end: dayjs('2025-08-04T09:30:00'),
  uid: 'standup-series@scope-inspect.calendar',
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO, RRule.WE, RRule.FR],
    dtstart: dayjs('2025-08-04T09:00:00').toDate(),
    until: dayjs('2025-12-31T23:59:59').toDate(),
  },
  exdates: [
    // Skip these specific dates
    '2025-08-15T09:00:00.000Z', // Summer vacation
    '2025-11-29T09:00:00.000Z', // Thanksgiving week
  ],
}

// Modified instance for a different time
const modifiedStandup: CalendarEvent = {
  id: 'standup-modified-aug-20',
  title: 'Extended Team Standup + Planning',
  start: dayjs('2025-08-20T10:00:00'), // Different time
  end: dayjs('2025-08-20T11:00:00'),   // Longer duration
  recurrenceId: '2025-08-20T09:00:00.000Z', // Original time
  uid: 'standup-series@scope-inspect.calendar', // Same UID as parent
}

// Use both events together
const events = [weeklyStandup, modifiedStandup]
```

### Working with Multiple Time Zones

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

// All times should be in consistent timezone
const globalMeeting: CalendarEvent = {
  id: 'global-sync',
  title: 'Global Team Sync',
  start: dayjs.utc('2025-08-04T14:00:00'), // 2 PM UTC
  end: dayjs.utc('2025-08-04T15:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: dayjs.utc('2025-08-04T14:00:00').toDate(),
    count: 26, // 6 months
  },
}
```

## Editing Recurring Events

ScopeInspect Calendar supports Google Calendar-style operations for editing recurring events:

### Edit Options

When editing a recurring event, you can choose one of three scopes:

1. **This Event Only** - Edit only the selected occurrence
2. **This and Following Events** - Edit the selected occurrence and all future occurrences
3. **All Events** - Edit all occurrences in the series

### Programmatic Editing

```tsx
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

function EditRecurringEvent() {
  const { updateRecurringEvent } = useScopeInspectCalendarContext()

  const handleEdit = (event: CalendarEvent) => {
    // Edit only this occurrence
    updateRecurringEvent(
      event,
      {
        title: 'Modified Meeting Title',
        start: dayjs('2025-08-11T10:00:00'),
        end: dayjs('2025-08-11T11:00:00'),
      },
      {
        scope: 'this',
        eventDate: dayjs('2025-08-11T09:00:00'),
      }
    )

    // Edit this and all following occurrences
    updateRecurringEvent(
      event,
      { title: 'New Meeting Title' },
      {
        scope: 'following',
        eventDate: dayjs('2025-08-11T09:00:00'),
      }
    )

    // Edit all occurrences
    updateRecurringEvent(
      event,
      { title: 'Updated Meeting Title' },
      {
        scope: 'all',
        eventDate: dayjs('2025-08-11T09:00:00'),
      }
    )
  }

  return <div>{/* Your UI */}</div>
}
```

## Best Practices

### Consistent UIDs

Use consistent UIDs across the base event and all modified instances to ensure proper override detection:

```tsx
const baseEvent: CalendarEvent = {
  id: 'meeting-1',
  title: 'Weekly Meeting',
  uid: 'weekly-meeting@scope-inspect.calendar', // Set explicit UID
  // ... other properties
}

const modifiedInstance: CalendarEvent = {
  id: 'meeting-1-modified',
  title: 'Weekly Meeting (Modified)',
  uid: 'weekly-meeting@scope-inspect.calendar', // Same UID
  recurrenceId: '2025-08-11T09:00:00.000Z',
  // ... other properties
}
```

### Date Handling

Always use consistent timezone handling. Convert to UTC for storage and use local timezone for display:

```tsx
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

// For storage/export
const event: CalendarEvent = {
  start: dayjs.utc('2025-08-04T14:00:00'),
  end: dayjs.utc('2025-08-04T15:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    dtstart: dayjs.utc('2025-08-04T14:00:00').toDate(),
  },
}
```

### Performance Optimization

Generate instances only for the current view range. The calendar automatically handles this during navigation:

```tsx
// The calendar automatically generates instances
// only for the visible date range
<ScopeInspectCalendar
  events={recurringEvents}
  initialView="month" // Only generates instances for current month
/>
```

### Exception Handling

- **Use exception dates (`exdates`)** for simple cancellations
- **Use modified instances (`recurrenceId`)** for changes to time, duration, or other properties

```tsx
// Simple cancellation - use exdates
const eventWithCancellation: CalendarEvent = {
  // ... base event
  exdates: ['2025-08-18T09:00:00.000Z'], // Skip this date
}

// Time change - use modified instance
const modifiedInstance: CalendarEvent = {
  // ... modified properties
  recurrenceId: '2025-08-18T09:00:00.000Z', // Original time
  start: dayjs('2025-08-18T10:00:00'), // New time
}
```

## Integration with Other Features

### iCalendar Export

Recurring events are automatically converted to proper RRULE format when exporting to .ics files, maintaining compatibility with other calendar applications:

```tsx
import { exportToICalendar } from 'scope-inspect-calendar'

const icsContent = exportToICalendar(recurringEvents, 'My Calendar')
// RRULE is properly formatted in the exported file
```

See the [iCalendar Export Guide](./ical-export.md) for more details.

### Calendar Views

All calendar views (month, week, day, year) automatically handle recurring events, generating and displaying instances as needed for the current view range:

```tsx
<ScopeInspectCalendar
  events={recurringEvents}
  initialView="month" // Shows all instances in the month
/>

<ScopeInspectCalendar
  events={recurringEvents}
  initialView="week" // Shows all instances in the week
/>
```

### Resource Calendar

Recurring events work seamlessly with resource calendars:

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import dayjs from 'dayjs'

const recurringResourceEvent: CalendarEvent = {
  id: 'room-booking',
  title: 'Weekly Room Booking',
  start: dayjs('2025-08-04T10:00:00'),
  end: dayjs('2025-08-04T11:00:00'),
  resourceId: 'room-a',
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: dayjs('2025-08-04T10:00:00').toDate(),
  },
}

<ScopeInspectResourceCalendar
  resources={resources}
  events={[recurringResourceEvent]}
/>
```

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [RFC 5545 Reference](../reference/rfc-5545.md) - Complete iCalendar specification reference
- [rrule.js Reference](../reference/rrule.js.md) - Complete rrule.js API reference
- [iCalendar Export Guide](./ical-export.md) - Exporting recurring events
- [Calendar Views Guide](./calendar-views.md) - Viewing recurring events
- [API Reference](../api-reference/components/scope-inspect-calendar.md) - Component props

