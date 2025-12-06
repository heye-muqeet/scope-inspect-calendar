# iCalendar Export

Export your calendar events to iCalendar (.ics) format for use in other calendar applications like Google Calendar, Apple Calendar, Outlook, and more.

The iCalendar export feature allows users to export their calendar events to the standard .ics format, ensuring compatibility with virtually all calendar applications. The implementation is fully RFC 5545 compliant and supports all event types including simple events, all-day events, and recurring events.

> **RFC 5545 Compliant**: The export feature follows the official iCalendar specification, ensuring maximum compatibility across calendar applications.

## Overview

ScopeInspect Calendar provides two utility functions for exporting events to iCalendar format:

- **`exportToICalendar`**: Converts events to iCalendar string format
- **`downloadICalendar`**: Exports events and triggers browser download

Both functions are exported from the package and can be used programmatically or integrated into custom UI components.

## Key Features

### Complete Event Support

- ✅ Simple events with title, description, location
- ✅ All-day events
- ✅ Recurring events with RRULE patterns
- ✅ Events with exception dates (EXDATE)
- ✅ Modified recurring instances (RECURRENCE-ID)

### Universal Compatibility

- ✅ Google Calendar
- ✅ Apple Calendar (macOS/iOS)
- ✅ Microsoft Outlook
- ✅ Mozilla Thunderbird
- ✅ CalDAV servers
- ✅ Any RFC 5545 compliant calendar application

## How to Use

### Programmatic Usage

#### Basic Export

```tsx
import { exportToICalendar, downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

// Get iCalendar string
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    description: 'Weekly team sync',
    location: 'Conference Room A',
  },
]

const icsContent = exportToICalendar(events, 'My Calendar')
console.log(icsContent) // iCalendar string

// Or download directly
downloadICalendar(events, 'my-calendar.ics', 'My Calendar')
```

#### Custom Export Button

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { useState } from 'react'

function CustomExportButton() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  const handleExport = () => {
    const filename = `my-calendar-${new Date().toISOString().split('T')[0]}.ics`
    downloadICalendar(events, filename, 'My Calendar')
  }

  return <button onClick={handleExport}>Export to iCalendar</button>
}
```

#### Using Calendar Context

```tsx
import {
  ScopeInspectCalendar,
  useScopeInspectCalendarContext,
} from 'scope-inspect-calendar'
import { downloadICalendar } from 'scope-inspect-calendar'

function ExportButton() {
  const { events } = useScopeInspectCalendarContext()

  const handleExport = () => {
    downloadICalendar(events, 'calendar.ics', 'My Calendar')
  }

  return <button onClick={handleExport}>Export Calendar</button>
}

function App() {
  return (
    <ScopeInspectCalendar events={events} headerComponent={<ExportButton />} />
  )
}
```

### Desktop Interface

The calendar header includes a built-in export button:

1. Look for the "Export" button in the top-right corner of the calendar header
2. Click the button to download the .ics file
3. The file will be automatically downloaded with a timestamped filename (e.g., `scope-inspect-calendar-2025-01-15.ics`)

### Mobile Interface

On mobile devices:

1. Tap the menu button (☰) in the top-right corner
2. Select "Export Calendar (.ics)" from the dropdown menu
3. The file will be downloaded to your device

## API Reference

### `exportToICalendar`

Converts an array of calendar events to RFC 5545 compliant iCalendar format.

```typescript
exportToICalendar(
  events: CalendarEvent[],
  calendarName?: string
): string
```

**Parameters:**

- `events` (required): Array of `CalendarEvent` objects to export
- `calendarName` (optional): Name of the calendar (default: `'ScopeInspect Calendar'`)

**Returns:**

- `string`: iCalendar format string

**Example:**

```tsx
import { exportToICalendar } from 'scope-inspect-calendar'

const icsString = exportToICalendar(events, 'My Personal Calendar')
// Use the string for API calls, email attachments, etc.
```

### `downloadICalendar`

Exports events and triggers a browser download of the .ics file.

```typescript
downloadICalendar(
  events: CalendarEvent[],
  filename?: string,
  calendarName?: string
): void
```

**Parameters:**

- `events` (required): Array of `CalendarEvent` objects to export
- `filename` (optional): Filename for the downloaded file (default: `'calendar.ics'`)
- `calendarName` (optional): Name of the calendar (default: `'ScopeInspect Calendar'`)

**Returns:**

- `void`: Triggers browser download

**Example:**

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'

// Basic usage
downloadICalendar(events)

// With custom filename
downloadICalendar(events, 'my-events.ics', 'My Calendar')
```

## Supported Event Properties

| Event Property | iCalendar Field | Description                            |
| -------------- | --------------- | -------------------------------------- |
| `title`        | `SUMMARY`       | Event title or summary                 |
| `description`  | `DESCRIPTION`   | Detailed event description             |
| `location`     | `LOCATION`      | Event location or venue                |
| `start`        | `DTSTART`       | Event start date and time              |
| `end`          | `DTEND`         | Event end date and time                |
| `uid`          | `UID`           | Unique identifier for the event        |
| `allDay`       | `VALUE=DATE`    | Formats dates for all-day events       |
| `rrule`        | `RRULE`         | Recurrence rules for repeating events  |
| `exdates`      | `EXDATE`        | Exception dates for recurring events   |
| `recurrenceId` | `RECURRENCE-ID` | Modified instances of recurring events |

### Generated Properties

The export function automatically generates the following iCalendar properties:

- `DTSTAMP` - Current timestamp when exported
- `CREATED` - Current timestamp (same as DTSTAMP)
- `LAST-MODIFIED` - Current timestamp (same as DTSTAMP)
- `STATUS` - Set to "CONFIRMED"
- `SEQUENCE` - Set to 0
- `TRANSP` - Set to "OPAQUE"

## Example iCalendar Output

Here's what the exported iCalendar content looks like:

```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//scope-inspect//ScopeInspect Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:My Calendar
X-WR-CALDESC:Exported from My Calendar
BEGIN:VTIMEZONE
TZID:UTC
BEGIN:STANDARD
DTSTART:19700101T000000
TZNAME:UTC
TZOFFSETFROM:+0000
TZOFFSETTO:+0000
END:STANDARD
END:VTIMEZONE
BEGIN:VEVENT
UID:event-1@scope-inspect.calendar
DTSTART:20250804T100000Z
DTEND:20250804T110000Z
SUMMARY:Team Meeting
DESCRIPTION:Weekly team sync
LOCATION:Conference Room A
DTSTAMP:20250804T120000Z
CREATED:20250804T120000Z
LAST-MODIFIED:20250804T120000Z
STATUS:CONFIRMED
SEQUENCE:0
TRANSP:OPAQUE
END:VEVENT
END:VCALENDAR
```

## Advanced Examples

### Export with Recurring Events

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'

const recurringEvent: CalendarEvent = {
  id: '1',
  title: 'Weekly Standup',
  start: new Date('2025-01-15T09:00:00'),
  end: new Date('2025-01-15T09:30:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO, RRule.WE, RRule.FR],
    dtstart: new Date('2025-01-15T09:00:00'),
  },
}

downloadICalendar([recurringEvent], 'recurring-events.ics')
```

### Export All-Day Events

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const allDayEvent: CalendarEvent = {
  id: '1',
  title: 'Holiday',
  start: new Date('2025-01-01'),
  end: new Date('2025-01-01'),
  allDay: true,
}

downloadICalendar([allDayEvent], 'holidays.ics')
```

### Export with Exception Dates

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'

const eventWithExceptions: CalendarEvent = {
  id: '1',
  title: 'Daily Meeting',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T10:30:00'),
  rrule: {
    freq: RRule.DAILY,
    dtstart: new Date('2025-01-15T10:00:00'),
  },
  exdates: [
    '2025-01-20T10:00:00.000Z', // Skip Jan 20
    '2025-01-25T10:00:00.000Z', // Skip Jan 25
  ],
}

downloadICalendar([eventWithExceptions], 'events-with-exceptions.ics')
```

### Export Modified Recurring Instances

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'
import { RRule } from 'rrule'

const baseEvent: CalendarEvent = {
  id: '1',
  title: 'Weekly Meeting',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T11:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: new Date('2025-01-15T10:00:00'),
  },
  uid: 'weekly-meeting@scope-inspect.calendar',
}

const modifiedInstance: CalendarEvent = {
  id: '1-modified',
  title: 'Weekly Meeting (Changed Time)',
  start: new Date('2025-01-22T14:00:00'), // Different time
  end: new Date('2025-01-22T15:00:00'),
  recurrenceId: '2025-01-22T10:00:00.000Z', // Original occurrence time
  uid: 'weekly-meeting@scope-inspect.calendar', // Same UID as parent
}

downloadICalendar([baseEvent, modifiedInstance], 'modified-recurring.ics')
```

### Server-Side Export

```tsx
import { exportToICalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

// In a Next.js API route or server endpoint
export async function GET(request: Request) {
  const events: CalendarEvent[] = await fetchEventsFromDatabase()

  const icsContent = exportToICalendar(events, 'My Calendar')

  return new Response(icsContent, {
    headers: {
      'Content-Type': 'text/calendar;charset=utf-8',
      'Content-Disposition': 'attachment; filename="calendar.ics"',
    },
  })
}
```

## Character Escaping

Special characters in event text are properly escaped according to RFC 5545:

- Backslashes (`\`) → `\\`
- Semicolons (`;`) → `\;`
- Commas (`,`) → `\,`
- Newlines (`\n`) → `\\n`
- Carriage returns are removed

## Timezone Handling

- All times are exported in UTC format
- Timezone information is included in the calendar header
- Date-only events use `VALUE=DATE` format for all-day events
- The calendar includes a UTC timezone definition in the exported file

## Best Practices

### Event Filtering

Filter events before exporting to include only relevant ones:

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'
import dayjs from 'dayjs'

const handleExport = () => {
  // Export only events from the current month
  const currentMonth = dayjs()
  const monthStart = currentMonth.startOf('month')
  const monthEnd = currentMonth.endOf('month')

  const filteredEvents = events.filter((event) => {
    return event.start.isAfter(monthStart) && event.start.isBefore(monthEnd)
  })

  downloadICalendar(filteredEvents, 'current-month.ics')
}
```

### Custom Calendar Names

Use meaningful calendar names for better organization:

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'

// Personal calendar
downloadICalendar(personalEvents, 'personal.ics', 'Personal Calendar')

// Work calendar
downloadICalendar(workEvents, 'work.ics', 'Work Calendar')

// Team calendar
downloadICalendar(teamEvents, 'team.ics', 'Team Calendar')
```

### Error Handling

```tsx
import { downloadICalendar } from 'scope-inspect-calendar'

const handleExport = () => {
  try {
    if (events.length === 0) {
      alert('No events to export')
      return
    }

    downloadICalendar(events, 'calendar.ics', 'My Calendar')
  } catch (error) {
    console.error('Export failed:', error)
    alert('Failed to export calendar. Please try again.')
  }
}
```

## Compatibility

The exported `.ics` files are compatible with:

- ✅ Google Calendar
- ✅ Apple Calendar (macOS/iOS)
- ✅ Microsoft Outlook
- ✅ Mozilla Thunderbird
- ✅ CalDAV servers
- ✅ Any RFC 5545 compliant calendar application

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [RFC 5545 Reference](../reference/rfc-5545.md) - Complete iCalendar specification reference
- [Recurring Events Guide](./recurring-events.md) - Understanding recurring events in exports
- [Calendar Component API Reference](../api-reference/components/scope-inspect-calendar.md) - Component props and methods
