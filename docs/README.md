# ScopeInspect Calendar Documentation

Welcome to the comprehensive documentation for **ScopeInspect Calendar**, a powerful React calendar component library built with TypeScript, Tailwind CSS, and modern React patterns.

## 📚 Documentation Index

### Getting Started

New to ScopeInspect Calendar? Start here:

- **[Installation](./getting-started/installation.md)** - Install the package and dependencies
- **[Quick Start](./getting-started/quick-start.md)** - Create your first calendar in minutes
- **[Basic Usage](./getting-started/basic-usage.md)** - Learn the fundamentals
- **[Project Setup](./getting-started/project-setup.md)** - Configure Tailwind CSS and TypeScript

### Guides

Comprehensive guides for all features:

- **[Calendar Views](./guides/calendar-views.md)** - Month, Week, Day, and Year views
- **[Event Management](./guides/event-management.md)** - Add, edit, and delete events
- **[Drag & Drop](./guides/drag-and-drop.md)** - Move events with drag and drop
- **[Recurring Events](./guides/recurring-events.md)** - RFC 5545 recurring events
- **[Resource Calendar](./guides/resource-calendar.md)** - Multi-resource scheduling
- **[Visible Hours](./guides/visible-hours.md)** - Control displayed time range (Exclusive Feature)
- **[Business Hours](./guides/business-hours.md)** - Configure business hours
- **[Internationalization](./guides/internationalization.md)** - 100+ locales support
- **[Theming & Styling](./guides/theming-and-styling.md)** - Customize appearance
- **[Custom Rendering](./guides/custom-rendering.md)** - Custom event and resource rendering
- **[Performance Optimization](./guides/performance-optimization.md)** - Best practices

### API Reference

Complete API documentation:

#### Components
- **[ScopeInspectCalendar](./api-reference/components/scope-inspect-calendar.md)** - Main calendar component
- **[ScopeInspectResourceCalendar](./api-reference/components/scope-inspect-resource-calendar.md)** - Resource calendar component

#### Hooks
- **[useScopeInspectCalendarContext](./api-reference/hooks/use-scope-inspect-calendar-context.md)** - Calendar context hook
- **[useScopeInspectResourceCalendarContext](./api-reference/hooks/use-scope-inspect-resource-calendar-context.md)** - Resource calendar context hook

#### Types
- **[CalendarEvent](./api-reference/types/calendar-event.md)** - Event data structure
- **[Resource](./api-reference/types/resource.md)** - Resource data structure
- **[Props](./api-reference/types/props.md)** - Component props types
- **[Utilities](./api-reference/types/utilities.md)** - Utility types

#### Utilities
- **[exportToICalendar](./api-reference/utilities/export-icalendar.md)** - Export to iCalendar format
- **[downloadICalendar](./api-reference/utilities/export-icalendar.md)** - Download .ics file
- **[generateRecurringEvents](./api-reference/utilities/recurrence-handler.md)** - Generate recurring events
- **[isRecurringEvent](./api-reference/utilities/recurrence-handler.md)** - Check if event is recurring

### Advanced Topics

- **[Custom Event Form](./advanced/custom-event-form.md)** - Customize the event form
- **[State Management](./advanced/state-management.md)** - Integrate with state management
- **[Integration Patterns](./advanced/integration-patterns.md)** - Framework integrations
- **[Extending the Calendar](./advanced/extending-the-calendar.md)** - Advanced customization
- **[Testing](./advanced/testing.md)** - Testing strategies

### Examples

Real-world examples and use cases:

- **[Basic Calendar](./examples/basic-calendar.md)** - Simple calendar implementation
- **[Resource Booking](./examples/resource-booking.md)** - Room/equipment booking system
- **[Team Scheduling](./examples/team-scheduling.md)** - Team availability and scheduling
- **[Event Management App](./examples/event-management-app.md)** - Full-featured event app
- **[Full-Featured Demo](./examples/full-featured-demo.md)** - All features combined

### Migration

- **[Upgrading](./migration/upgrading.md)** - Version upgrade guides

### Reference

- **[RFC 5545](./reference/rfc-5545.md)** - iCalendar standard reference
- **[rrule.js](./reference/rrule.js.md)** - Recurrence rule library
- **[Translation Usage](./reference/translation-usage.md)** - Internationalization guide

### Troubleshooting

- **[Common Issues](./troubleshooting/common-issues.md)** - Solutions to common problems
- **[FAQ](./troubleshooting/faq.md)** - Frequently asked questions
- **[Debugging](./troubleshooting/debugging.md)** - Debug strategies

## 🚀 Quick Links

### Most Popular Guides

1. **[Quick Start](./getting-started/quick-start.md)** - Get started in 5 minutes
2. **[Event Management](./guides/event-management.md)** - Learn to manage events
3. **[Resource Calendar](./guides/resource-calendar.md)** - Multi-resource scheduling
4. **[Recurring Events](./guides/recurring-events.md)** - Set up recurring events
5. **[Visible Hours](./guides/visible-hours.md)** - Exclusive feature guide

### API Quick Reference

- **[ScopeInspectCalendar Props](./api-reference/components/scope-inspect-calendar.md#props)**
- **[CalendarEvent Type](./api-reference/types/calendar-event.md)**
- **[Resource Type](./api-reference/types/resource.md)**

## 🎯 Key Features

### Core Features

- 🗓️ **Multiple Views**: Month, Week, Day, and Year views with smooth transitions
- 📊 **Resource Calendar**: Visualize and manage events across multiple resources with timeline layout
- 🎯 **Drag & Drop**: Move events between dates and time slots with collision detection
- 🔄 **RFC 5545 Recurring Events**: Full RRULE support with Google Calendar-style operations
  - **RRULE Patterns**: Daily, Weekly, Monthly, Yearly with complex frequencies
  - **Smart Operations**: Edit "this event", "this and following", or "all events"
  - **Exception Handling**: EXDATE exclusions and modified instance support
  - **rrule.js Integration**: Battle-tested library for robust recurrence generation
- 📤 **iCalendar Export**: RFC 5545 compliant .ics file export with proper recurring event handling
- 🌍 **Internationalization**: 100+ locales with dayjs and configurable week start days
- 🎨 **Customizable Styling**:
  - Flexible theming with Tailwind CSS and CSS variables
  - Custom event rendering with render props
  - Configurable colors, fonts, and spacing
- ⚡ **Performance Optimized**:
  - On-demand recurring event generation
  - Efficient date range calculations
  - Minimal re-renders with optimized React patterns
- 📱 **Responsive Design**: Adaptive layouts for desktop, tablet, and mobile
- 🔧 **Developer Experience**:
  - Full TypeScript support with comprehensive type definitions
  - IntelliSense and autocompletion
  - Extensive JSDoc documentation
  - Test-driven development with 100% test coverage
- 🎛️ **Advanced Event Management**:
  - All-day events with proper timezone handling
  - Multi-day events with smart positioning
  - Event validation and error handling
  - Bulk operations and batch updates

### ✨ Exclusive Feature: Visible Hours

**Visible Hours** is a unique customization that allows you to control which time range is displayed on the calendar's vertical time scale, independent of business hours. This feature is perfect for focusing on specific time periods (e.g., business hours, working shifts) without affecting event creation or editing capabilities.

**Key Benefits:**

- 🎯 **Focus on Relevant Times**: Show only the hours that matter to your users
- 🔄 **Independent from Business Hours**: Display settings are separate from interaction rules
- 📊 **Better UX**: Reduce visual clutter by hiding irrelevant time slots
- ⚡ **Performance**: Fewer DOM nodes when showing fewer hours

## 📦 Installation

```bash
# Using npm
npm install scope-inspect-calendar

# Using yarn
yarn add scope-inspect-calendar

# Using pnpm
pnpm add scope-inspect-calendar

# Using bun
bun add scope-inspect-calendar
```

## 🚀 Quick Start

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { CalendarEvent } from 'scope-inspect-calendar'

function App() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Meeting',
      start: new Date('2025-01-15T10:00:00'),
      end: new Date('2025-01-15T11:00:00'),
    },
  ]

  return (
    <ScopeInspectCalendar
      events={events}
      visibleHours={{ startTime: 9, endTime: 17 }}
    />
  )
}
```

## 📖 Usage Examples

### Basic Calendar

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

<ScopeInspectCalendar
  events={events}
  initialView="month"
  onEventClick={(event) => console.log('Event clicked:', event)}
/>
```

### Visible Hours Configuration

The `visibleHours` prop controls which time range is displayed on the calendar's vertical time scale. This is **completely independent** from `businessHours`, which controls when events can be created or edited.

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

// Show only business hours (9 AM to 5 PM)
<ScopeInspectCalendar
  events={events}
  visibleHours={{
    startTime: 9,  // 9:00 AM
    endTime: 17    // 5:00 PM
  }}
/>

// Show morning hours only (6 AM to 12 PM)
<ScopeInspectCalendar
  events={events}
  visibleHours={{
    startTime: 6,
    endTime: 12
  }}
/>

// Show afternoon/evening hours (12 PM to 10 PM)
<ScopeInspectCalendar
  events={events}
  visibleHours={{
    startTime: 12,
    endTime: 22
  }}
/>

// Default: Show all 24 hours (if not specified)
<ScopeInspectCalendar events={events} />
```

### Visible Hours vs Business Hours

**Important**: `visibleHours` and `businessHours` serve different purposes:

- **`visibleHours`**: Controls **what is displayed** on the time scale (UI only)
- **`businessHours`**: Controls **when interactions are allowed** (event creation/editing restrictions)

You can use them together:

```tsx
<ScopeInspectCalendar
  events={events}
  // Display only 8 AM to 6 PM
  visibleHours={{ startTime: 8, endTime: 18 }}
  // But allow event creation/editing only during 9 AM to 5 PM
  businessHours={{
    daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    startTime: 9,
    endTime: 17,
  }}
/>
```

### Resource Calendar

```tsx
import { ScopeInspectResourceCalendar } from 'scope-inspect-calendar'

const resources = [
  { id: '1', name: 'Room A' },
  { id: '2', name: 'Room B' },
]

<ScopeInspectResourceCalendar
  resources={resources}
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }}
/>
```

### Recurring Events

```tsx
import { ScopeInspectCalendar, RRule } from 'scope-inspect-calendar'

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

<ScopeInspectCalendar events={[recurringEvent]} />
```

## 📚 API Reference

### ScopeInspectCalendar Props

| Prop                 | Type                                  | Default     | Description                                                                     |
| -------------------- | ------------------------------------- | ----------- | ------------------------------------------------------------------------------- |
| `events`             | `CalendarEvent[]`                     | `[]`        | Array of events to display                                                      |
| `visibleHours`       | `VisibleHours`                        | `undefined` | **Exclusive feature**: Controls which time range is displayed on the time scale |
| `businessHours`      | `BusinessHours`                       | `undefined` | Controls when events can be created/edited                                      |
| `initialView`        | `CalendarView`                        | `'month'`   | Initial calendar view                                                           |
| `firstDayOfWeek`     | `WeekDays`                            | `'sunday'`  | First day of the week                                                           |
| `onEventClick`       | `(event: CalendarEvent) => void`      | -           | Callback when event is clicked                                                  |
| `onCellClick`        | `(info: CellClickInfo) => void`       | -           | Callback when cell is clicked                                                   |
| `onEventAdd`         | `(event: CalendarEvent) => void`      | -           | Callback when event is added                                                    |
| `onEventUpdate`      | `(event: CalendarEvent) => void`      | -           | Callback when event is updated                                                  |
| `onEventDelete`      | `(event: CalendarEvent) => void`      | -           | Callback when event is deleted                                                  |
| `locale`             | `string`                              | `'en'`      | Locale for date/time formatting                                                 |
| `timeFormat`         | `'12-hour' \| '24-hour'`              | `'12-hour'` | Time display format                                                             |
| `disableDragAndDrop` | `boolean`                             | `false`     | Disable drag and drop                                                           |
| `renderEvent`        | `(event: CalendarEvent) => ReactNode` | -           | Custom event renderer                                                           |

### VisibleHours Interface

```typescript
interface VisibleHours {
  /**
   * Start time for visible hours in 24-hour format (0-24).
   * Hours before this time will not be displayed.
   * @default 0
   */
  startTime?: number

  /**
   * End time for visible hours in 24-hour format (0-24).
   * Hours at or after this time will not be displayed.
   * @default 24
   */
  endTime?: number
}
```

**Examples:**

- `{ startTime: 9, endTime: 17 }` - Show 9 AM to 5 PM
- `{ startTime: 0, endTime: 12 }` - Show midnight to noon
- `{ startTime: 18, endTime: 24 }` - Show 6 PM to midnight
- `undefined` - Show all 24 hours (default)

### BusinessHours Interface

```typescript
interface BusinessHours {
  /**
   * Days of the week when business hours apply
   */
  daysOfWeek?: WeekDays[]

  /**
   * Start time in 24-hour format (0-24)
   */
  startTime?: number

  /**
   * End time in 24-hour format (0-24)
   */
  endTime?: number
}
```

## 🎨 Customization

### Custom Event Rendering

```tsx
<ScopeInspectCalendar
  events={events}
  renderEvent={(event) => (
    <div className="custom-event">
      <strong>{event.title}</strong>
      <span>{event.start.format('HH:mm')}</span>
    </div>
  )}
/>
```

### Custom Styling

The calendar uses Tailwind CSS and CSS variables for theming. Override CSS variables to customize colors:

```css
:root {
  --calendar-primary: #3b82f6;
  --calendar-secondary: #8b5cf6;
  --calendar-background: #ffffff;
  --calendar-border: #e5e7eb;
}
```

## 🔧 Advanced Usage

### Using Calendar Context

```tsx
import { useScopeInspectCalendarContext } from 'scope-inspect-calendar'

function CustomComponent() {
  const { currentDate, view, events, setView, nextPeriod, prevPeriod } =
    useScopeInspectCalendarContext()

  return (
    <div>
      <button onClick={prevPeriod}>Previous</button>
      <span>{currentDate.format('MMMM YYYY')}</span>
      <button onClick={nextPeriod}>Next</button>
    </div>
  )
}
```

### Exporting Events to iCalendar

```tsx
import { exportToICalendar, downloadICalendar } from 'scope-inspect-calendar'

// Get iCalendar string
const icsContent = exportToICalendar(events, 'My Calendar')

// Or download directly
downloadICalendar(events, 'my-calendar.ics', 'My Calendar')
```

## 📝 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  CalendarEvent,
  ScopeInspectCalendarProps,
  VisibleHours,
  BusinessHours,
  CalendarView,
} from 'scope-inspect-calendar'
```

## 📖 Documentation Structure

This documentation is organized into logical sections:

1. **Getting Started** - Installation and basic setup
2. **Guides** - Feature-by-feature documentation
3. **API Reference** - Complete API documentation
4. **Advanced Topics** - Advanced usage patterns
5. **Examples** - Real-world use cases
6. **Migration** - Upgrade and migration guides
7. **Reference** - Standards and specifications
8. **Troubleshooting** - Problem solving

## 🔍 Search Tips

- Use your browser's search (Ctrl+F / Cmd+F) to find specific topics
- Check the [FAQ](./troubleshooting/faq.md) for common questions
- Browse [Examples](./examples/) for use case inspiration
- Refer to [API Reference](./api-reference/) for detailed API docs

## 💡 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 👤 Author

**Engr. Abdul Muqeet**

- GitHub: [@heye-muqeet](https://github.com/heye-muqeet)
- Repository: [scope-inspect-calendar](https://github.com/heye-muqeet/scope-inspect-calendar)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/heye-muqeet/scope-inspect-calendar/issues)
- 💬 **Questions**: Open a discussion on GitHub
- 📧 **Email**: Check GitHub profile for contact information

## 🔗 External Resources

- [GitHub Repository](https://github.com/heye-muqeet/scope-inspect-calendar)
- [npm Package](https://www.npmjs.com/package/scope-inspect-calendar)
- [RFC 5545 Specification](https://tools.ietf.org/html/rfc5545)
- [rrule.js Documentation](https://github.com/jkbrzt/rrule)

---

**Last Updated**: 2025-01-XX  
**Version**: 1.1.2  
**Status**: Active Development
