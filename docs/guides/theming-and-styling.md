# Theming & Styling

Customize styles using Tailwind CSS v4's theming system. ScopeInspect Calendar ships no CSS - it relies entirely on your Tailwind configuration and the `@source` directive.

## Overview

ScopeInspect Calendar is built with Tailwind CSS v4 and ships zero CSS. Instead, it uses Tailwind utility classes and CSS custom properties exclusively. This means you have complete control over the visual appearance using your Tailwind configuration.

> **Caution**: You must register ScopeInspect Calendar as a source using Tailwind's `@source` directive so Tailwind can scan the library for utility classes.

## Required: Register ScopeInspect Calendar with Tailwind

In your main CSS file (e.g., `globals.css`, `index.css`, or `app.css`):

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

> **Note**: The `@source` directive tells Tailwind to scan the calendar package for classes and include them in your build. This is especially important since `node_modules` are typically ignored by Tailwind by default.

## How ScopeInspect Calendar Uses Colors

ScopeInspect Calendar uses Tailwind utility classes for all styling. Colors, spacing, typography, and other design tokens come from your Tailwind configuration. This means:

- **No CSS shipped**: The calendar has zero CSS dependencies
- **Full control**: You control all styling through Tailwind
- **Theme-aware**: Automatically respects your Tailwind theme configuration
- **Dark mode**: Works with Tailwind's dark mode system

## Color Customization

### Using Tailwind Theme Colors

The calendar uses standard Tailwind color utilities. Customize colors through your Tailwind configuration:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
}
```

### CSS Variables for Theming

Use CSS variables for dynamic theming:

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
  --calendar-text: #1f2937;
}

.dark {
  --calendar-primary: #60a5fa;
  --calendar-secondary: #a78bfa;
  --calendar-background: #1f2937;
  --calendar-border: #374151;
  --calendar-text: #f9fafb;
}
```

Then use these variables in your custom components:

```tsx
function CustomHeader() {
  return (
    <div
      style={{
        backgroundColor: 'var(--calendar-primary)',
        color: 'var(--calendar-background)',
      }}
    >
      {/* Header content */}
    </div>
  )
}
```

### Tailwind v4 Theme Variables

With Tailwind CSS v4, you can use the `@theme` directive to define theme variables:

```css
@theme inline {
  --color-calendar-primary: #3b82f6;
  --color-calendar-secondary: #8b5cf6;
  --color-calendar-background: #ffffff;
  --color-calendar-border: #e5e7eb;
}
```

Then use them as Tailwind classes:

```tsx
<div className="bg-calendar-primary text-calendar-background">
  Calendar Header
</div>
```

## Event Colors

Individual events can have custom colors by setting the `color` and `backgroundColor` properties:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: '#3b82f6', // Custom blue color
    color: 'black',
  },
  {
    id: '2',
    title: 'Personal Task',
    start: new Date('2025-01-15T14:00:00'),
    end: new Date('2025-01-15T15:00:00'),
    backgroundColor: '#ef4444', // Custom red color
    color: 'white',
  },
  {
    id: '3',
    title: 'Important Meeting',
    start: new Date('2025-01-15T16:00:00'),
    end: new Date('2025-01-15T17:00:00'),
    backgroundColor: '#10b981', // Custom green color
    color: 'white',
  },
]

function App() {
  return <ScopeInspectCalendar events={events} />
}
```

### Using Tailwind Color Classes

You can also use Tailwind color class names:

```tsx
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: 'bg-blue-500',
    color: 'text-white',
  },
  {
    id: '2',
    title: 'Personal Task',
    start: new Date('2025-01-15T14:00:00'),
    end: new Date('2025-01-15T15:00:00'),
    backgroundColor: 'bg-red-500',
    color: 'text-white',
  },
]
```

### Color Format Support

Event colors support multiple formats:

- **Hex colors**: `#3b82f6`, `#ef4444`
- **RGB/RGBA**: `rgb(59, 130, 246)`, `rgba(59, 130, 246, 0.8)`
- **HSL/HSLA**: `hsl(217, 91%, 60%)`, `hsla(217, 91%, 60%, 0.8)`
- **Named colors**: `blue`, `red`, `green`
- **Tailwind classes**: `bg-blue-500`, `text-white`

## Dark Mode Support

The calendar automatically works with Tailwind's dark mode system:

```css
/* In your CSS file */
.dark {
  --calendar-primary: #60a5fa;
  --calendar-background: #1f2937;
  --calendar-border: #374151;
  --calendar-text: #f9fafb;
}
```

```tsx
// Toggle dark mode
function App() {
  const [isDark, setIsDark] = useState(false)

  return (
    <div className={isDark ? 'dark' : ''}>
      <ScopeInspectCalendar events={events} />
    </div>
  )
}
```

## Custom Component Styling

### Header Styling

Customize the header using `headerClassName`:

```tsx
<ScopeInspectCalendar
  events={events}
  headerClassName="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
/>
```

### View Header Styling

Customize day headers using `viewHeaderClassName`:

```tsx
<ScopeInspectCalendar
  events={events}
  viewHeaderClassName="bg-gray-100 text-gray-700 font-semibold py-3 border-b"
/>
```

### Custom Event Styling

Use `renderEvent` for complete control:

```tsx
const renderEvent = (event: CalendarEvent) => (
  <div
    className="rounded-lg p-2 shadow-md"
    style={{
      backgroundColor: event.backgroundColor || '#3b82f6',
      color: event.color || 'white',
    }}
  >
    {event.title}
  </div>
)

<ScopeInspectCalendar
  events={events}
  renderEvent={renderEvent}
/>
```

## Learn More

For comprehensive color customization options, theming strategies, and advanced techniques, refer to the official Tailwind CSS documentation:

### Color Customization

Learn about color palettes, custom colors, and opacity modifiers.

- [Tailwind CSS Colors Documentation](https://tailwindcss.com/docs/customizing-colors)
- [Color Palette Guide](https://tailwindcss.com/docs/customizing-colors#color-palette-reference)

### @source Directive

Learn how to use the `@source` directive to scan npm packages for classes.

- [Tailwind CSS @source Documentation](https://tailwindcss.com/docs/content-configuration#scanning-additional-paths)

### v4 Upgrade Guide

Migrating from Tailwind CSS v3? Learn about CSS-based configuration and removed features.

- [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

## Advanced Theming

### Custom Theme Configuration

Create a comprehensive theme configuration:

```css
@theme inline {
  /* Calendar-specific colors */
  --color-calendar-primary: #3b82f6;
  --color-calendar-secondary: #8b5cf6;
  --color-calendar-success: #10b981;
  --color-calendar-warning: #f59e0b;
  --color-calendar-danger: #ef4444;

  /* Calendar layout */
  --color-calendar-background: #ffffff;
  --color-calendar-border: #e5e7eb;
  --color-calendar-text: #1f2937;
  --color-calendar-muted: #6b7280;

  /* Calendar spacing */
  --spacing-calendar-cell: 0.5rem;
  --spacing-calendar-header: 1rem;
}
```

### Component-Level Theming

Apply different themes to different calendar instances:

```tsx
// Light theme calendar
<ScopeInspectCalendar
  events={events}
  headerClassName="bg-blue-50 border-blue-200"
/>

// Dark theme calendar
<ScopeInspectCalendar
  events={events}
  headerClassName="bg-gray-800 border-gray-700 text-white"
/>
```

### Responsive Styling

Use Tailwind's responsive utilities for adaptive styling:

```tsx
<ScopeInspectCalendar
  events={events}
  headerClassName="p-2 sm:p-4 md:p-6"
  viewHeaderClassName="text-xs sm:text-sm md:text-base"
/>
```

## Best Practices

### Performance

- **Use Tailwind's JIT mode** for optimal performance
- **Avoid inline styles** when possible - use Tailwind classes
- **Leverage CSS variables** for dynamic theming without re-renders

### Accessibility

- **Maintain contrast ratios**: Ensure text is readable on colored backgrounds
- **Use semantic colors**: Use color plus other indicators (icons, text) for important information
- **Test with screen readers**: Ensure custom components are accessible

### Consistency

- **Use design tokens**: Define colors, spacing, and typography in your Tailwind config
- **Create reusable styles**: Use Tailwind's `@apply` directive for common patterns
- **Document your theme**: Keep a style guide for your team

## Example: Complete Theme Setup

Here's a complete example of setting up a custom theme:

```css
/* globals.css */
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";

@theme inline {
  /* Brand colors */
  --color-brand-primary: #3b82f6;
  --color-brand-secondary: #8b5cf6;

  /* Calendar colors */
  --color-calendar-bg: #ffffff;
  --color-calendar-border: #e5e7eb;
  --color-calendar-text: #1f2937;
  --color-calendar-header: #f9fafb;

  /* Event colors */
  --color-event-default: #3b82f6;
  --color-event-important: #ef4444;
  --color-event-success: #10b981;
}

.dark {
  --color-calendar-bg: #1f2937;
  --color-calendar-border: #374151;
  --color-calendar-text: #f9fafb;
  --color-calendar-header: #111827;
}
```

```tsx
// App.tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: 'var(--color-event-default)',
    color: 'white',
  },
]

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      headerClassName="bg-calendar-header border-b border-calendar-border"
      viewHeaderClassName="bg-calendar-header text-calendar-text font-semibold"
    />
  )
}
```

## Visual States and Cell Styling

The calendar provides automatic visual styling for different cell states to improve user experience and clarity.

### Past Time Greying

Past time slots are automatically greyed out to provide visual feedback about historical time periods. Unlike unavailable slots, past slots remain **fully interactive** - users can still click, hover, and interact with them.

#### Features

- ✅ Automatic detection of past time slots
- ✅ Visual greying with reduced opacity
- ✅ Remains fully interactive (clickable, hoverable, droppable)
- ✅ Works for both day-level and hour-level cells
- ✅ Current time slot is excluded from greying

#### Behavior

- **Day-level cells**: Days before today are greyed out
- **Hour-level cells**: Time slots before the current time are greyed out
- **Current cell**: The current day/hour is never greyed out
- **Interactivity**: Past cells remain fully functional for viewing historical data

#### Visual Styling

Past slots use:
- Background: `bg-secondary/40` (40% opacity)
- Text: `text-muted-foreground/60` (60% opacity)

This creates a subtle, non-intrusive visual indication that the time has passed while maintaining readability.

#### Example

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function App() {
  return (
    <ScopeInspectCalendar
      type="timeline" // or "agenda"
      resources={resources}
      events={events}
      // Past slots will be automatically greyed out
    />
  )
}
```

**No additional configuration needed** - past time greying works automatically for all calendar views.

### Visual Distinction: Unavailable vs Past Slots

The calendar provides clear visual distinction between two types of greyed-out cells:

1. **Unavailable Slots** - Truly blocked/unavailable (business hours, blocked slots, time-offs)
2. **Past Slots** - Historical time periods (still interactive)

#### Unavailable Slots

- **Background**: `bg-secondary` (full opacity, darker)
- **Text**: `text-muted-foreground` (full opacity)
- **Pattern**: Diagonal stripe pattern overlay
- **Interactivity**: Disabled (`pointer-events-none`)
- **Cursor**: Default cursor (not clickable)

**Visual appearance**: Darker grey background with diagonal stripes, clearly indicating the slot is blocked.

#### Past Slots

- **Background**: `bg-secondary/40` (40% opacity, lighter)
- **Text**: `text-muted-foreground/60` (60% opacity)
- **Pattern**: None (solid background)
- **Interactivity**: Fully enabled (clickable, hoverable, droppable)
- **Cursor**: Pointer cursor (clickable)

**Visual appearance**: Lighter grey background without pattern, indicating historical time that's still accessible.

#### Comparison Table

| Feature | Unavailable Slots | Past Slots |
|---------|-------------------|------------|
| Background Opacity | 100% (full) | 40% (reduced) |
| Text Opacity | 100% (full) | 60% (reduced) |
| Pattern | Diagonal stripes | None |
| Clickable | ❌ No | ✅ Yes |
| Hoverable | ❌ No | ✅ Yes |
| Droppable | ❌ No | ✅ Yes |
| Visual Intent | Blocked/Unavailable | Historical |

#### Use Cases

**Unavailable Slots:**
- Business hours outside working time
- Resource-specific blocked slots (meetings, breaks)
- Time-off periods
- Recurring unavailable patterns

**Past Slots:**
- Viewing historical calendar data
- Reviewing past events
- Analyzing time usage
- Exporting historical information

#### Example

```tsx
const resource: Resource = {
  id: 'john-doe',
  name: 'John Doe',
  availableSlots: {
    // This creates UNAVAILABLE slots (with diagonal pattern)
    // for times outside the defined schedule
    recurring: {
      mon: {
        schedule: [{ start: '09:00', end: '17:00' }],
        enabled: true,
      },
    },
  },
}

// Past slots are automatically greyed out (lighter, no pattern)
// when viewing dates/times before the current moment
```

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Project Setup Guide](../getting-started/project-setup.md) - Tailwind CSS configuration
- [Custom Rendering Guide](./custom-rendering.md) - Component customization
- [Resource Calendar Guide](../resource-calendar.md) - Resource availability configuration
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Official Tailwind CSS docs
