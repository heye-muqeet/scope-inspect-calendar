# FAQ

Frequently asked questions about ScopeInspect Calendar.

## Overview

This FAQ covers common questions about installation, usage, framework integration, features, internationalization, and troubleshooting.

## General Questions

### How do I install ScopeInspect Calendar?

See the [Installation Guide](../getting-started/installation.md) for detailed instructions.

Quick installation:

```bash
npm install scope-inspect-calendar
npm install react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
```

### Is ScopeInspect Calendar free?

Yes, ScopeInspect Calendar is open-source and free to use under the MIT License.

### What React versions are supported?

ScopeInspect Calendar supports React 19.1.0 and above.

### Does ScopeInspect Calendar support TypeScript?

Yes, ScopeInspect Calendar is built with TypeScript and provides full type definitions. All components, hooks, and utilities are fully typed.

### Which CSS framework does ScopeInspect Calendar use?

ScopeInspect Calendar is built with Tailwind CSS v4 and ships no CSS. You need to configure Tailwind to scan the package using the `@source` directive:

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";
```

See the [Project Setup Guide](../getting-started/project-setup.md) for complete configuration instructions.

## Usage

### How do I customize event colors?

You can set custom colors for events by adding `color` and `backgroundColor` properties to your event objects:

```tsx
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: '#3b82f6', // Custom blue background
    color: 'white', // Custom text color
  },
  {
    id: '2',
    title: 'Personal Task',
    start: new Date('2025-01-15T14:00:00'),
    end: new Date('2025-01-15T15:00:00'),
    backgroundColor: '#ef4444', // Custom red background
    color: 'white',
  },
]
```

See the [Theming & Styling Guide](../guides/theming-and-styling.md) for more details.

### How do I add drag and drop functionality?

The calendar includes built-in drag and drop support that is enabled by default. To disable it, use the `disableDragAndDrop` prop:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

;<ScopeInspectCalendar
  events={events}
  disableDragAndDrop={true}
  // ... other props
/>
```

Drag and drop is enabled by default. See the [Basic Usage Guide](../getting-started/basic-usage.md) for more details.

### How do I use the Visible Hours feature?

The `visibleHours` prop is an exclusive feature that controls which time range is displayed on the calendar's vertical time scale:

```tsx
<ScopeInspectCalendar
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }} // Show 9 AM to 5 PM
/>
```

See the [README.md](../../README.md) for Visible Hours documentation and examples.

## Framework Integration

### Can I use this with Next.js?

Yes! ScopeInspect Calendar works perfectly with Next.js, Vite, Create React App, and any other React framework. Just make sure to install the required peer dependencies. When using with Next.js, you need to use client directives:

```tsx
'use client'

import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useState } from 'react'
import type { CalendarEvent } from 'scope-inspect-calendar'

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])

  return (
    <ScopeInspectCalendar
      events={events}
      // ... other props
    />
  )
}
```

See the [Project Setup Guide](../getting-started/project-setup.md) for Next.js-specific configuration.

### Can I use this with Astro?

Absolutely! ScopeInspect Calendar works great with Astro. However, when using the calendar with Astro, you must use the `client:only` directive instead of other client directives like `client:load` because the calendar doesn't work properly with other directives:

```astro
---
// In your .astro file
import { CalendarDemo } from '../components/calendar-demo'
---

<CalendarDemo client:only="react" />

<!-- NOT recommended for this calendar -->
<!-- <CalendarDemo client:load /> -->
<!-- <CalendarDemo client:idle /> -->
```

See the [Project Setup Guide](../getting-started/project-setup.md) for Astro-specific configuration.

### Can I use this with Vite?

Yes! ScopeInspect Calendar works perfectly with Vite. Just ensure Tailwind CSS is properly configured with the `@source` directive.

### Can I use this with Create React App?

Yes, but you may need to configure Tailwind CSS manually or use CRACO since Create React App doesn't support Tailwind CSS out of the box.

## Features

### Can I customize the appearance of the calendar?

Yes, you can customize the calendar extensively using:

- **Tailwind CSS classes** via `headerClassName` and `viewHeaderClassName` props
- **Custom components** via `headerComponent` and `renderEvent` props
- **Theme configuration** through Tailwind CSS variables

See the [Custom Rendering Guide](../guides/custom-rendering.md) and [Theming & Styling Guide](../guides/theming-and-styling.md) for details.

### Does it support multiple languages?

Yes, ScopeInspect Calendar supports internationalization with:

- **100+ locales** via dayjs for date formatting
- **Custom translations** via `translations` prop
- **Translator functions** via `translator` prop for integration with i18n libraries

See the [Internationalization Guide](../guides/internationalization.md) for details.

### Can I export events to iCalendar format?

Yes, ScopeInspect Calendar includes built-in iCalendar export functionality:

```tsx
import { exportToICalendar, downloadICalendar } from 'scope-inspect-calendar'

// Get iCalendar string
const icsContent = exportToICalendar(events, 'My Calendar')

// Or download directly
downloadICalendar(events, 'my-calendar.ics', 'My Calendar')
```

See the [iCalendar Export Guide](../guides/ical-export.md) for details.

### Does it support recurring events?

Yes, ScopeInspect Calendar fully supports recurring events with RRULE patterns following RFC 5545:

```tsx
import { RRule } from 'rrule'

const recurringEvent: CalendarEvent = {
  id: '1',
  title: 'Weekly Meeting',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T11:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: new Date('2025-01-15T10:00:00'),
  },
}
```

See the [Recurring Events Guide](../guides/recurring-events.md) for complete documentation.

### Can I use custom fonts?

Absolutely! The calendar inherits font styles from its parent container. You can use any web font or custom font family with Tailwind CSS font utilities:

```tsx
<div className="font-sans">
  <ScopeInspectCalendar events={events} />
</div>
```

Or configure fonts in your Tailwind config:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
}
```

### Is the calendar responsive?

Yes, the calendar is fully responsive and works great on desktop, tablet, and mobile devices. It automatically adapts its layout based on screen size using Tailwind CSS responsive utilities.

### What is the Visible Hours feature?

**Visible Hours** is an exclusive feature that allows you to control which time range is displayed on the calendar's vertical time scale, independent of business hours. This is perfect for focusing on specific time periods without affecting event creation or editing capabilities.

```tsx
<ScopeInspectCalendar
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }} // Show only 9 AM to 5 PM
/>
```

See the [README.md](../../README.md) for Visible Hours documentation and examples.

## Internationalization

### How do I handle timezone support?

Timezone is handled with the `timezone` prop. The calendar uses dayjs's timezone support internally. If you change the timezone while the component is already rendered, you might need to re-render the component:

```tsx
import { useState } from 'react'
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function TimezoneCalendar() {
  const [timezone, setTimezone] = useState('America/New_York')
  const [calendarKey, setCalendarKey] = useState(0)

  const handleTimezoneChange = (newTimezone: string) => {
    setTimezone(newTimezone)
    // Force re-render to apply timezone changes
    setCalendarKey((prev) => prev + 1)
  }

  return (
    <ScopeInspectCalendar
      key={calendarKey}
      timezone={timezone}
      events={events}
      // ... other props
    />
  )
}
```

### How do I handle locale support?

Locale is handled with the `locale` prop. The calendar uses dayjs's locale setting internally. If you change the locale while the component is already rendered, you might need to re-render the component:

```tsx
import { useState } from 'react'
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function LocaleCalendar() {
  const [locale, setLocale] = useState('en')
  const [calendarKey, setCalendarKey] = useState(0)

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale)
    // Force re-render to apply locale changes
    setCalendarKey((prev) => prev + 1)
  }

  return (
    <ScopeInspectCalendar
      key={calendarKey}
      locale={locale}
      events={events}
      // ... other props
    />
  )
}
```

## Troubleshooting

### Why aren't calendar styles showing up?

Make sure you've registered the calendar package in your Tailwind CSS configuration using the `@source` directive:

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";
```

Also ensure that:

1. Tailwind CSS v4 is installed and configured
2. The `@source` directive is in your main CSS file
3. Your CSS file is imported in your application
4. Tailwind is properly scanning the calendar package

See the [Usage Guide](../getting-started/basic-usage.md) and [Project Setup Guide](../getting-started/project-setup.md) for more details.

### Why am I getting "isSameOrBefore is not a function" error?

This error occurs when you have Day.js installed as a dependency in your project and the required plugins are not loaded. Although Day.js is exported from this library, your Day.js instance will be used, which may cause errors if the required plugins are not loaded.

To fix this, you need to extend Day.js with the required plugins in your application:

```typescript
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(timezone)
dayjs.extend(utc)
```

Add this configuration early in your application, preferably in your main entry file (e.g., `main.tsx`, `index.tsx`, or `_app.tsx`).

See the [Basic Usage Guide](../getting-started/basic-usage.md) for complete Day.js configuration.

### Why are events not displaying?

Check the following:

1. **Events format**: Ensure events have `id`, `title`, `start`, and `end` properties
2. **Date format**: Events can use `Date` objects, dayjs objects, or ISO strings
3. **Date range**: Events must fall within the visible date range of the current view
4. **Event normalization**: The calendar automatically normalizes event dates

```tsx
// Correct event format
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
  },
]
```

### Why is drag and drop not working?

Check the following:

1. **Drag and drop is enabled**: Ensure `disableDragAndDrop` is not set to `true`
2. **Event handlers**: Make sure `onEventUpdate` is provided to handle drag events
3. **Event IDs**: Events must have unique `id` values
4. **Browser support**: Ensure your browser supports drag and drop APIs

```tsx
<ScopeInspectCalendar
  events={events}
  onEventUpdate={(event) => {
    // Handle event update after drag
    console.log('Event moved:', event)
  }}
/>
```

### Why are recurring events not generating instances?

Check the following:

1. **RRULE format**: Ensure the `rrule` property is correctly formatted
2. **Date range**: Instances are only generated for the visible date range
3. **dtstart**: The `dtstart` property in `rrule` should match the event's start date
4. **Exception dates**: Check if `exdates` are excluding the dates you expect

```tsx
const recurringEvent: CalendarEvent = {
  id: '1',
  title: 'Weekly Meeting',
  start: dayjs('2025-01-15T10:00:00'),
  end: dayjs('2025-01-15T11:00:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO],
    dtstart: dayjs('2025-01-15T10:00:00').toDate(), // Must match start
  },
}
```

### Why is the calendar not responsive?

The calendar uses Tailwind CSS responsive utilities. Ensure:

1. **Tailwind is configured**: Tailwind CSS must be properly set up
2. **Viewport meta tag**: Your HTML includes `<meta name="viewport" content="width=device-width, initial-scale=1">`
3. **Container height**: The calendar container should have a defined height

```tsx
<div style={{ height: '600px' }}>
  <ScopeInspectCalendar events={events} />
</div>
```

### Why are translations not working?

Check the following:

1. **Locale prop**: Ensure the `locale` prop is set correctly
2. **Translations object**: If using `translations`, ensure all required keys are provided
3. **Translator function**: If using `translator`, ensure it returns strings for all keys
4. **Day.js locale**: Ensure the dayjs locale is loaded for the specified locale

```tsx
// Correct usage
<ScopeInspectCalendar
  events={events}
  locale="fr"
  translations={frenchTranslations} // Or use translator prop
/>
```

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Installation Guide](../getting-started/installation.md) - Installation instructions
- [Quick Start Guide](../getting-started/quick-start.md) - Get started quickly
- [Basic Usage Guide](../getting-started/basic-usage.md) - Usage fundamentals
- [Project Setup Guide](../getting-started/project-setup.md) - Framework setup
