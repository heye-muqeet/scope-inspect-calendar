# scope-inspect-calendar

A powerful, full-featured React calendar component library built with TypeScript, Tailwind CSS, and modern React patterns. This package includes customizations and enhancements, including the exclusive **Visible Hours** feature.

![Calendar Preview](https://github.com/user-attachments/assets/d289f034-0d26-4a1c-a997-dfa1ad26aa7a)

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

## 📖 Usage

### Basic Calendar

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
;<ScopeInspectCalendar
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
  recurrence: {
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

## 📚 Documentation

Comprehensive documentation is available in the [`docs`](./docs) directory:

### Getting Started

- **[Installation](./docs/getting-started/installation.md)** - Install the package and dependencies
- **[Quick Start](./docs/getting-started/quick-start.md)** - Create your first calendar in minutes
- **[Basic Usage](./docs/getting-started/basic-usage.md)** - Learn the fundamentals
- **[Project Setup](./docs/getting-started/project-setup.md)** - Configure Tailwind CSS and TypeScript

### Guides

- **[Calendar Views](./docs/guides/calendar-views.md)** - Month, Week, Day, and Year views
- **[Event Management](./docs/guides/event-management.md)** - Add, edit, and delete events
- **[Drag & Drop](./docs/guides/drag-and-drop.md)** - Move events with drag and drop
- **[Recurring Events](./docs/guides/recurring-events.md)** - RFC 5545 recurring events
- **[Resource Calendar](./docs/guides/resource-calendar.md)** - Multi-resource scheduling
- **[Visible Hours](./docs/guides/visible-hours.md)** - Control displayed time range (Exclusive Feature)
- **[Business Hours](./docs/guides/business-hours.md)** - Configure business hours
- **[Internationalization](./docs/guides/internationalization.md)** - 100+ locales support
- **[Theming & Styling](./docs/guides/theming-and-styling.md)** - Customize appearance
- **[Custom Rendering](./docs/guides/custom-rendering.md)** - Custom event and resource rendering
- **[Performance Optimization](./docs/guides/performance-optimization.md)** - Best practices

### API Reference

#### Components

- **[ScopeInspectCalendar](./docs/api-reference/components/scope-inspect-calendar.md)** - Main calendar component
- **[ScopeInspectResourceCalendar](./docs/api-reference/components/scope-inspect-resource-calendar.md)** - Resource calendar component

#### Hooks

- **[useScopeInspectCalendarContext](./docs/api-reference/hooks/use-scope-inspect-calendar-context.md)** - Calendar context hook
- **[useScopeInspectResourceCalendarContext](./docs/api-reference/hooks/use-scope-inspect-resource-calendar-context.md)** - Resource calendar context hook

#### Types

- **[CalendarEvent](./docs/api-reference/types/calendar-event.md)** - Event data structure
- **[Resource](./docs/api-reference/types/resource.md)** - Resource data structure
- **[Props](./docs/api-reference/types/props.md)** - Component props types
- **[Utilities](./docs/api-reference/types/utilities.md)** - Utility types

#### Utilities

- **[exportToICalendar](./docs/api-reference/utilities/export-icalendar.md)** - Export to iCalendar format
- **[downloadICalendar](./docs/api-reference/utilities/export-icalendar.md)** - Download .ics file
- **[generateRecurringEvents](./docs/api-reference/utilities/recurrence-handler.md)** - Generate recurring events
- **[isRecurringEvent](./docs/api-reference/utilities/recurrence-handler.md)** - Check if event is recurring

### Advanced Topics

- **[Custom Event Form](./docs/advanced/custom-event-form.md)** - Customize the event form
- **[State Management](./docs/advanced/state-management.md)** - Integrate with state management
- **[Integration Patterns](./docs/advanced/integration-patterns.md)** - Framework integrations
- **[Extending the Calendar](./docs/advanced/extending-the-calendar.md)** - Advanced customization
- **[Testing](./docs/advanced/testing.md)** - Testing strategies

### Examples

- **[Basic Calendar](./docs/examples/basic-calendar.md)** - Simple calendar implementation
- **[Resource Booking](./docs/examples/resource-booking.md)** - Room/equipment booking system
- **[Team Scheduling](./docs/examples/team-scheduling.md)** - Team availability and scheduling
- **[Event Management App](./docs/examples/event-management-app.md)** - Full-featured event app
- **[Full-Featured Demo](./docs/examples/full-featured-demo.md)** - All features combined

### Reference

- **[RFC 5545](./docs/reference/rfc-5545.md)** - iCalendar standard reference
- **[rrule.js](./docs/reference/rrule.js.md)** - Recurrence rule library
- **[Translation Usage](./docs/reference/translation-usage.md)** - Internationalization guide

### Troubleshooting

- **[Common Issues](./docs/troubleshooting/common-issues.md)** - Solutions to common problems
- **[FAQ](./docs/troubleshooting/faq.md)** - Frequently asked questions
- **[Debugging](./docs/troubleshooting/debugging.md)** - Debug strategies

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This package includes customizations and enhancements, including the exclusive **Visible Hours** feature, to better serve specific use cases.

## 👤 Author

**Engr. Abdul Muqeet**

- GitHub: [@heye-muqeet](https://github.com/heye-muqeet)
- Repository: [scope-inspect-calendar](https://github.com/heye-muqeet/scope-inspect-calendar)

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/heye-muqeet/scope-inspect-calendar/issues)
- 💬 **Questions**: Open a discussion on GitHub
- 📧 **Email**: Check GitHub profile for contact information

## 🔗 Links

- [GitHub Repository](https://github.com/heye-muqeet/scope-inspect-calendar)
- [npm Package](https://www.npmjs.com/package/scope-inspect-calendar)

---

Made with ❤️ by Engr. Abdul Muqeet
