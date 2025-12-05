# scope-inspect-calendar

A powerful, full-featured React calendar component library built with TypeScript, Tailwind CSS, and modern React patterns. This package is inspired by [ilamy Calendar](https://ilamy.dev) with customizations and enhancements, including the exclusive **Visible Hours** feature.

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
import { IlamyCalendar } from 'scope-inspect-calendar'
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
    <IlamyCalendar
      events={events}
      visibleHours={{ startTime: 9, endTime: 17 }}
    />
  )
}
```

## 📖 Usage

### Basic Calendar

```tsx
import { IlamyCalendar } from 'scope-inspect-calendar'
;<IlamyCalendar
  events={events}
  initialView="month"
  onEventClick={(event) => console.log('Event clicked:', event)}
/>
```

### Visible Hours Configuration

The `visibleHours` prop controls which time range is displayed on the calendar's vertical time scale. This is **completely independent** from `businessHours`, which controls when events can be created or edited.

```tsx
import { IlamyCalendar } from 'scope-inspect-calendar'

// Show only business hours (9 AM to 5 PM)
<IlamyCalendar
  events={events}
  visibleHours={{
    startTime: 9,  // 9:00 AM
    endTime: 17    // 5:00 PM
  }}
/>

// Show morning hours only (6 AM to 12 PM)
<IlamyCalendar
  events={events}
  visibleHours={{
    startTime: 6,
    endTime: 12
  }}
/>

// Show afternoon/evening hours (12 PM to 10 PM)
<IlamyCalendar
  events={events}
  visibleHours={{
    startTime: 12,
    endTime: 22
  }}
/>

// Default: Show all 24 hours (if not specified)
<IlamyCalendar events={events} />
```

### Visible Hours vs Business Hours

**Important**: `visibleHours` and `businessHours` serve different purposes:

- **`visibleHours`**: Controls **what is displayed** on the time scale (UI only)
- **`businessHours`**: Controls **when interactions are allowed** (event creation/editing restrictions)

You can use them together:

```tsx
<IlamyCalendar
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
import { IlamyResourceCalendar } from 'scope-inspect-calendar'

const resources = [
  { id: '1', name: 'Room A' },
  { id: '2', name: 'Room B' },
]

<IlamyResourceCalendar
  resources={resources}
  events={events}
  visibleHours={{ startTime: 9, endTime: 17 }}
/>
```

### Recurring Events

```tsx
import { IlamyCalendar, RRule } from 'scope-inspect-calendar'

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

<IlamyCalendar events={[recurringEvent]} />
```

## 📚 API Reference

### IlamyCalendar Props

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
<IlamyCalendar
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
import { useIlamyCalendarContext } from 'scope-inspect-calendar'

function CustomComponent() {
  const { currentDate, view, events, setView, nextPeriod, prevPeriod } =
    useIlamyCalendarContext()

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
import { exportToICS } from 'scope-inspect-calendar'

const icsContent = exportToICS(events)
// Download or share the .ics file
```

## 📝 TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import type {
  CalendarEvent,
  IlamyCalendarProps,
  VisibleHours,
  BusinessHours,
  CalendarView,
} from 'scope-inspect-calendar'
```

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

This package is inspired by and built upon the excellent [ilamy Calendar](https://ilamy.dev) project. We've added customizations and enhancements, including the exclusive **Visible Hours** feature, to better serve specific use cases.

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
- [Inspired by ilamy Calendar](https://ilamy.dev)

---

Made with ❤️ by Engr. Abdul Muqeet
