# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added

- **Initial release of scope-inspect-calendar**
- **Exclusive Feature: Visible Hours** - Control which time range is displayed on the calendar's vertical time scale, independent of business hours
  - `visibleHours` prop with `startTime` and `endTime` configuration
  - Works independently from `businessHours` (which controls interaction rules)
  - Supports all calendar views (Week, Day, Resource Calendar)
  - Default behavior: Shows all 24 hours if not specified
- Package rebranded from `@ilamy/calendar` to `scope-inspect-calendar`
- Updated repository links to `https://github.com/heye-muqeet/scope-inspect-calendar`
- Comprehensive README with Visible Hours documentation

### Features (Inherited from ilamy Calendar)

- Multiple calendar views: Month, Week, Day, and Year
- Resource Calendar for managing events across multiple resources
- Drag & Drop support with collision detection
- RFC 5545 Recurring Events with full RRULE support
- iCalendar Export (.ics file export)
- Internationalization with 100+ locales
- Customizable styling with Tailwind CSS
- Performance optimized with efficient date calculations
- Responsive design for all devices
- Full TypeScript support
- Advanced event management (all-day, multi-day, validation)

### Acknowledgments

This package is inspired by and built upon the excellent [ilamy Calendar](https://ilamy.dev) project by [@kcsujeet](https://github.com/kcsujeet). We've added customizations and enhancements, including the exclusive **Visible Hours** feature.

---

## Previous Versions (Based on ilamy Calendar)

The following changelog entries are from the original ilamy Calendar project that this package is based on:

### [v1.1.0] - ilamy Calendar

#### Features

- feat: add `renderEventForm` prop for custom event form support
- feat: add `businessHours` prop for restricting calendar interactions
- feat: add `timeFormat` prop to configure 12-hour or 24-hour time display

#### Breaking Changes

- **BREAKING:** `onCellClick` callback signature changed from `(start, end) => void` to `(info: CellClickInfo) => void`
- **BREAKING:** `openEventForm` now accepts `Partial<CalendarEvent>` as argument
- **BREAKING:** `ResourceCalendarEvent` type has been removed. `CalendarEvent` now includes `resourceId` and `resourceIds` properties directly

#### Fixes

- fix: resolve stale current date issue

### [v1.0.2] - ilamy Calendar

#### Features

- feat: add initialDate prop
- feat: enhance drag-and-drop functionality for calendar events with all-day and timed event conversions

#### Fixes

- fix: update package versions and improve ScrollArea component props handling
- fix: correct week/month range calculation for firstDayOfWeek
- fix: add month state management to DatePicker for dropdown navigation

### [v1.0.1] - ilamy Calendar

- fix: add data-testid to day view time cells, resolve CI failures and add type checking to pipeline

### [v1.0.0] - ilamy Calendar

- feat: add resource calendar

---

## Links

- [GitHub Repository](https://github.com/heye-muqeet/scope-inspect-calendar)
- [npm Package](https://www.npmjs.com/package/scope-inspect-calendar)
- [Inspired by ilamy Calendar](https://ilamy.dev)

[1.0.0]: https://github.com/heye-muqeet/scope-inspect-calendar/releases/tag/v1.0.0
