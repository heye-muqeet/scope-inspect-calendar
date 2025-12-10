# ScopeInspect Calendar

<div align="center">
<!-- 
![Calendar Preview](https://github.com/user-attachments/assets/d289f034-0d26-4a1c-a997-dfa1ad26aa7a) -->

**A powerful, full-featured React calendar component library built with TypeScript, Tailwind CSS, and modern React patterns.**

[![React](https://img.shields.io/badge/React-19.1.0+-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11+-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Installation](#-installation) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Usage Examples](#-usage-examples)

</div>

---

## ✨ Overview

ScopeInspect Calendar is a comprehensive React calendar component library that provides everything you need to build sophisticated scheduling applications. Built with modern web technologies and best practices, it offers a rich feature set while maintaining excellent performance and developer experience.

### Why ScopeInspect Calendar?

- 🎯 **Production-Ready**: Battle-tested in real-world applications
- 🚀 **Performance Optimized**: Efficient rendering and minimal re-renders
- 🎨 **Highly Customizable**: Tailwind CSS theming and custom rendering
- 📱 **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile
- 🔒 **Type-Safe**: Full TypeScript support with comprehensive type definitions
- 🌍 **Internationalized**: 100+ locales with dayjs integration
- ⚡ **Modern Stack**: Built with React 19, Tailwind CSS v4, and latest best practices

---

## 🎯 Key Features

### Core Features

- **🗓️ Multiple Views**: Month, Week, Day, and Year views with smooth animated transitions
- **📊 Unified Calendar Component**: Single `ScopeInspectCalendar` component supporting both agenda (standard) and timeline (resource) views via `type` prop
- **📊 Resource Calendar**: Timeline layout for visualizing and managing events across multiple resources (team members, rooms, equipment)
  - Single resource events via `resourceId`
  - Cross-resource events via `resourceIds` (events spanning multiple resources)
- **🎯 Drag & Drop**: Move events between dates and time slots with automatic collision detection
- **🔄 RFC 5545 Recurring Events**: Full RRULE support with Google Calendar-style operations
  - Daily, Weekly, Monthly, Yearly recurrence patterns with complex frequencies
  - Edit operations: "This event only", "This and following", or "All events"
  - Exception dates (EXDATE) to exclude specific occurrences
  - Modified instance support with RECURRENCE-ID
  - rrule.js integration for robust recurrence generation
- **🎛️ Event Types**: Support for various event configurations
  - All-day events with proper timezone handling
  - Multi-day events with smart positioning and display
  - Timed events with start and end times
  - Single and cross-resource event assignments
- **📞 Event Lifecycle Callbacks**: Complete event management integration
  - `onEventAdd`: Triggered when new events are created
  - `onEventUpdate`: Called when events are modified (dragged, resized, edited)
  - `onEventDelete`: Invoked when events are removed
  - `onEventClick`: Handles event click interactions
  - `onCellClick`: Responds to calendar cell clicks with date/time info
  - `onViewChange`: Fires when calendar view changes
  - `onDateChange`: Notifies when navigation changes the current date
- **🎨 Custom Rendering**: Full control over component rendering
  - `renderEvent`: Custom event component rendering
  - `renderResource`: Custom resource cell rendering for timeline views
  - `renderEventForm`: Custom event form component
- **⏰ Business Hours**: Restrict calendar interactions to specific days and time ranges
- **👁️ Visible Hours**: Control which time range is displayed on the calendar's vertical time scale, independent of business hours
- **⏱️ Slot Duration**: Customize time slot granularity in day and week views
  - 30-minute slots for detailed scheduling
  - 60-minute (1-hour) slots for standard hourly views
  - Automatically adjusts grid lines, time labels, and cell click behavior
- **⏰ Resource Availability**: Flexible availability management for team members
  - Available Slots: Define only available times using inverted logic - all other times are blocked
  - Blocked Slots: Define unavailable times with one-time or recurring RRULE patterns
  - Supports recurring weekly schedules and one-time date-specific schedules
  - One-time slots override recurring schedules for precise control
  - Exception dates (EXDATE) to exclude specific occurrences from recurrence
- **⏮️ Past Time Greying**: Automatic visual indication of past time slots
  - Past cells are greyed out but remain fully interactive
  - Works for both day-level and hour-level cells
- **🎨 Visual Distinction**: Clear differentiation between unavailable and past slots
  - Unavailable slots: Darker background with diagonal pattern (truly blocked, non-interactive)
  - Past slots: Lighter opacity, no pattern (historical but accessible)
- **🕐 Time Format**: Flexible time display options
  - 12-hour format (e.g., "1:00 PM", "11:30 AM")
  - 24-hour format (e.g., "13:00", "23:30")
- **🌍 Internationalization**: Comprehensive locale and timezone support
  - 100+ locales with dayjs integration
  - Configurable first day of the week (Sunday through Saturday)
  - Timezone support for accurate date/time handling
  - Custom translation system with `translations` object or `translator` function
- **📤 iCalendar Export**: RFC 5545 compliant .ics file export
  - Proper recurring event handling with RRULE
  - EXDATE support for exceptions
  - Full event metadata preservation
- **🎨 Customizable Styling**: Complete visual control
  - Flexible theming with Tailwind CSS v4 and CSS variables
  - Custom event colors and backgrounds (hex, rgb, hsl, CSS classes)
  - Custom header components and styling
  - View header customization with sticky positioning
  - Configurable colors, fonts, and spacing
- **📊 Event Overflow Handling**: Smart event display in month view
  - Configurable maximum events per day (`dayMaxEvents`)
  - "+X more" indicator for additional events
  - Click to view all events in a dialog
- **🔒 Interaction Controls**: Fine-grained control over user interactions
  - `disableCellClick`: Disable calendar cell clicks
  - `disableEventClick`: Disable event click interactions
  - `disableDragAndDrop`: Disable drag-and-drop functionality
- **🔧 Context API & Hooks**: Programmatic calendar control
  - `useScopeInspectCalendarContext`: Access calendar state and methods
  - Navigation methods: `nextPeriod`, `prevPeriod`, `today`, `setCurrentDate`
  - View management: `setView`, view state access
  - Event management: `addEvent`, `updateEvent`, `deleteEvent`
  - Utility methods: `getEventsForDateRange`, `getEventsForResource` (timeline view)
- **⚡ Performance Optimized**: Efficient rendering and memory management
  - On-demand recurring event generation
  - Efficient date range calculations
  - Minimal re-renders with optimized React patterns
  - Smart event processing and caching
- **📱 Responsive Design**: Adaptive layouts for all screen sizes
  - Desktop, tablet, and mobile optimizations
  - Responsive grid layouts
  - Touch-friendly interactions
- **🔧 Developer Experience**: Best-in-class developer tools
  - Full TypeScript support with comprehensive type definitions
  - IntelliSense and autocompletion
  - Extensive JSDoc documentation
  - Test-driven development with comprehensive test coverage

---

## 📦 Installation

> **Note**: This package is distributed as a **private GitHub repository**. You'll need a Personal Access Token (PAT) to install it.

### Prerequisites

- GitHub account with access to the private repository
- npm (version 6.0.0 or higher) or compatible package manager
- Node.js installed
- React 19.1.0+ and React DOM 19.1.0+
- Tailwind CSS 4.1.11+ and tailwindcss-animate 1.0.7+

### Quick Installation

1. **Create a GitHub Personal Access Token** with `repo` scope
2. **Set environment variable**:

```bash
   # Windows PowerShell
   $env:GITHUB_TOKEN = "ghp_your_token_here"

   # Linux/Mac
   export GITHUB_TOKEN="ghp_your_token_here"
```

3. **Create `.npmrc` file** in your project root:
   ```
   //github.com/heye-muqeet/scope-inspect-calendar.git:_authToken=${GITHUB_TOKEN}
   ```
4. **Install the package**:
   ```bash
   npm install git+https://github.com/heye-muqeet/scope-inspect-calendar.git#main
   ```
5. **Install peer dependencies**:
   ```bash
   npm install react@^19.1.0 react-dom@^19.1.0 tailwindcss@^4.1.11 tailwindcss-animate@^1.0.7
   ```

### Detailed Installation Guide

For complete step-by-step instructions, including:

- Creating and managing Personal Access Tokens
- Setting up environment variables permanently
- Team setup and CI/CD configuration
- Troubleshooting common issues

👉 **[See the complete Installation Guide](./docs/getting-started/installation.md)**

---

## 🚀 Quick Start

### 1. Configure Tailwind CSS

Add the `@source` directive to your main CSS file:

```css
@import 'tailwindcss';
@source "../node_modules/scope-inspect-calendar/dist";

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Basic Calendar

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

  return (
    <div style={{ height: '600px' }}>
      <ScopeInspectCalendar
        events={events}
        onEventClick={(event) => console.log('Event clicked:', event)}
      />
    </div>
  )
}
```

### 3. With Visible Hours (Exclusive Feature)

```tsx
<ScopeInspectCalendar
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }} // Show 9 AM to 5 PM
/>
```

### 4. Resource Calendar (Timeline View)

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { Resource } from 'scope-inspect-calendar'

const resources: Resource[] = [
  { id: '1', name: 'Room A' },
  { id: '2', name: 'Room B' },
]

<ScopeInspectCalendar
  type="timeline" // Use timeline view for resources
  resources={resources}
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }}
/>
```

---

## 📖 Usage Examples

### Basic Calendar with Events

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: '#3b82f6',
    color: 'white',
  },
]

function App() {
  return (
    <ScopeInspectCalendar
      events={events}
      initialView="month"
      onEventClick={(event) => console.log('Clicked:', event)}
      onEventAdd={(event) => console.log('Added:', event)}
      onEventUpdate={(event) => console.log('Updated:', event)}
      onEventDelete={(event) => console.log('Deleted:', event)}
    />
  )
}
```

### Recurring Events

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { RRule } from 'rrule'
import type { CalendarEvent } from 'scope-inspect-calendar'

const recurringEvent: CalendarEvent = {
  id: '1',
  title: 'Weekly Team Standup',
  start: new Date('2025-01-15T10:00:00'),
  end: new Date('2025-01-15T10:30:00'),
  rrule: {
    freq: RRule.WEEKLY,
    byweekday: [RRule.MO, RRule.WE, RRule.FR],
    dtstart: new Date('2025-01-15T10:00:00'),
  },
}

<ScopeInspectCalendar events={[recurringEvent]} />
```

### Custom Event Rendering

```tsx
<ScopeInspectCalendar
  events={events}
  renderEvent={(event) => (
    <div className="custom-event p-2 rounded shadow">
      <strong>{event.title}</strong>
      <span className="text-sm">{event.start.format('HH:mm')}</span>
    </div>
  )}
/>
```

### Using Calendar Context

```tsx
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomHeader() {
  const { currentDate, view, setView, nextPeriod, prevPeriod } =
    useScopeInspectCalendarContext()

  return (
    <div className="flex items-center gap-4">
      <button onClick={prevPeriod}>←</button>
      <span>{currentDate.format('MMMM YYYY')}</span>
      <button onClick={nextPeriod}>→</button>
      <select value={view} onChange={(e) => setView(e.target.value)}>
        <option value="month">Month</option>
        <option value="week">Week</option>
        <option value="day">Day</option>
      </select>
    </div>
  )
}
```

### Export to iCalendar

```tsx
import { exportToICalendar, downloadICalendar } from 'scope-inspect-calendar'

// Get iCalendar string
const icsContent = exportToICalendar(events, 'My Calendar')

// Or download directly
downloadICalendar(events, 'my-calendar.ics', 'My Calendar')
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs`](./docs) directory:

### Getting Started

- **[Installation](./docs/getting-started/installation.md)** - Complete installation guide with PAT setup
- **[Quick Start](./docs/getting-started/quick-start.md)** - Create your first calendar in minutes
- **[Basic Usage](./docs/getting-started/basic-usage.md)** - Learn the fundamentals
- **[Project Setup](./docs/getting-started/project-setup.md)** - Configure Tailwind CSS and TypeScript

### Guides

- **[Calendar Views](./docs/guides/calendar-views.md)** - Month, Week, Day, and Year views
- **[Recurring Events](./docs/guides/recurring-events.md)** - RFC 5545 recurring events with RRULE
- **[Resource Calendar](./docs/resource-calendar.md)** - Multi-resource scheduling with timeline view
- **[Resource Availability](./docs/resource-calendar.md#resource-availability)** - Available slots and blocked slots for team members
- **[Past Time Greying](./docs/guides/theming-and-styling.md#past-time-greying)** - Visual indication of past time periods
- **[Visual Distinction](./docs/guides/theming-and-styling.md#visual-distinction-unavailable-vs-past-slots)** - Clear differentiation between unavailable and past slots
- **[Internationalization](./docs/guides/internationalization.md)** - 100+ locales support
- **[Theming & Styling](./docs/guides/theming-and-styling.md)** - Customize appearance
- **[Custom Rendering](./docs/guides/custom-rendering.md)** - Custom event and resource rendering
- **[iCalendar Export](./docs/guides/ical-export.md)** - Export events to .ics format

### API Reference

#### Components

- **[ScopeInspectCalendar](./docs/api-reference/components/scope-inspect-calendar.md)** - Unified calendar component (supports both agenda and timeline views)

#### Hooks

- **[useScopeInspectCalendarContext](./docs/api-reference/hooks/use-scope-inspect-calendar-context.md)** - Calendar context hook (works for both agenda and timeline views)

### Reference

- **[RFC 5545](./docs/reference/rfc-5545.md)** - iCalendar standard reference
- **[rrule.js](./docs/reference/rrule.js.md)** - Recurrence rule library

### Troubleshooting

- **[FAQ](./docs/troubleshooting/faq.md)** - Frequently asked questions

---

## 🎨 Customization

### Theming with Tailwind CSS

The calendar uses Tailwind CSS v4 and ships no CSS. Customize colors using CSS variables:

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
}
```

See the [Theming & Styling Guide](./docs/guides/theming-and-styling.md) for complete customization options.

### Custom Event Colors

```tsx
const events: CalendarEvent[] = [
  {
    id: '1',
    title: 'Meeting',
    start: new Date('2025-01-15T10:00:00'),
    end: new Date('2025-01-15T11:00:00'),
    backgroundColor: '#3b82f6', // Custom background
    color: 'white', // Custom text color
  },
]
```

---

## 🔧 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  CalendarEvent,
  ScopeInspectCalendarProps,
  VisibleHours,
  BusinessHours,
  CalendarView,
  Resource,
} from 'scope-inspect-calendar'
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This package includes customizations and enhancements, including the exclusive **Visible Hours** feature, to better serve specific use cases.

---

## 👤 Author

**Engr. Abdul Muqeet**

- GitHub: [@heye-muqeet](https://github.com/heye-muqeet)
- Repository: [scope-inspect-calendar](https://github.com/heye-muqeet/scope-inspect-calendar)

---

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/heye-muqeet/scope-inspect-calendar/issues)
- 💬 **Questions**: Open a discussion on GitHub
- 📧 **Email**: Check GitHub profile for contact information

---

## 🔗 Links

- [GitHub Repository](https://github.com/heye-muqeet/scope-inspect-calendar)
- [Installation Guide](./docs/getting-started/installation.md)
- [Documentation](./docs)

---

<div align="center">

Made with ❤️ by Engr. Abdul Muqeet

</div>
