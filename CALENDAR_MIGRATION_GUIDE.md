# Calendar Migration Guide: Next.js App Router Integration

This guide provides step-by-step instructions for migrating the ilamy Calendar implementation from this project to a Next.js App Router project.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Integration Methods](#integration-methods)
4. [Project Structure](#project-structure)
5. [Step-by-Step Migration](#step-by-step-migration)
6. [Configuration Files](#configuration-files)
7. [Integration Scenarios](#integration-scenarios)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The calendar system consists of two main components:
- **IlamyCalendar**: Standard calendar with Month, Week, Day, and Year views
- **IlamyResourceCalendar**: Resource-based calendar for managing events across multiple resources

Both components share core functionality but have different use cases and layouts.

---

## Prerequisites

### Required Dependencies

Install these packages in your Next.js project:

```bash
npm install dayjs rrule @dnd-kit/core @dnd-kit/modifiers motion
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-checkbox
npm install @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area
npm install @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs
npm install @radix-ui/react-tooltip lucide-react react-day-picker
npm install class-variance-authority clsx tailwind-merge date-fns
```

Or using Bun:

```bash
bun add dayjs rrule @dnd-kit/core @dnd-kit/modifiers motion
bun add @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-checkbox
bun add @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-scroll-area
bun add @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tabs
bun add @radix-ui/react-tooltip lucide-react react-day-picker
bun add class-variance-authority clsx tailwind-merge date-fns
```

### Peer Dependencies

Ensure these are installed (usually already in Next.js projects):

- `react` ^19.1.0
- `react-dom` ^19.1.0
- `tailwindcss` ^4.1.11
- `tailwindcss-animate` ^1.0.7

---

## Integration Methods

Instead of manually copying files, you have several integration options:

> **⚠️ Important**: If you've cloned this repository and made customizations, **Method 1 will NOT work** for your customized version. Use **Method 2 (Local Package Linking)** or **Method 6 (Publish Your Own Package)** instead.

### 🚀 Quick Start: Customized Fork Integration

If you've cloned this repo and made customizations, here's the fastest way to use it in your Next.js project:

```bash
# 1. Build your customized calendar package
cd ilamy-calendar
bun run build

# 2. In your Next.js project, link to your local package
cd your-nextjs-project
bun add file:../ilamy-calendar

# 3. After making changes to calendar, rebuild:
cd ../ilamy-calendar
bun run build
```

Then use it in your Next.js app:

```typescript
// app/calendar/page.tsx
'use client'

import { IlamyCalendar } from '@ilamy/calendar'
// ... rest of your code
```

**See Method 2 below for detailed instructions.**

### Method 1: NPM Package Installation (For Published Package Only)

**Best for**: Using the published package without modifications

**⚠️ Limitations**: This method only works with the published `@ilamy/calendar` package on npm. If you've cloned the repo and made customizations, your changes won't be included. Use Method 2 or Method 6 for customized versions.

The calendar is published as an npm package `@ilamy/calendar`. This is the simplest approach when using the standard package without modifications.

#### Installation

```bash
npm install @ilamy/calendar
# or
bun add @ilamy/calendar
```

#### Usage

```typescript
// app/calendar/page.tsx
'use client'

import { IlamyCalendar } from '@ilamy/calendar'
import type { CalendarEvent } from '@ilamy/calendar'
import dayjs from 'dayjs'
// Import required dayjs plugins
import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'
// ... other plugins

export default function CalendarPage() {
  return (
    <IlamyCalendar
      events={[]}
      initialView="month"
    />
  )
}
```

**Pros:**
- ✅ Clean, simple installation
- ✅ Easy to update with `npm update`
- ✅ Version management via package.json
- ✅ No file duplication
- ✅ Works with standard build tools

**Cons:**
- ⚠️ Requires package to be published (or use local linking for development)
- ⚠️ Less flexibility for source code customization

**See**: `examples/nextjs/` for a complete working example

---

### Method 2: Local Package Linking (Recommended for Customized Forks)

**Best for**: Customized forks, active development, testing changes

**✅ Perfect for your scenario**: If you've cloned this repo and made customizations, this is the recommended method. You can link your customized local package to your Next.js project.

Use npm/yarn link or direct file path references. This works great when you have a customized version of the calendar.

#### Using npm link

```bash
# In calendar project directory
cd ilamy-calendar
npm link

# In your Next.js project
cd your-nextjs-project
npm link @ilamy/calendar
```

#### Using Bun Workspace / Direct File Path

If using Bun or npm/yarn, you can reference the local package directly:

```json
// your-nextjs-project/package.json
{
  "dependencies": {
    "@ilamy/calendar": "file:../ilamy-calendar"
  }
}
```

**Important Steps for Customized Fork:**

1. **Build your customized calendar package first:**
   ```bash
   cd ilamy-calendar
   bun run build  # Builds to dist/ directory
   ```

2. **Link or reference in your Next.js project:**
   ```bash
   # Option A: Using file path (simpler)
   cd your-nextjs-project
   bun add file:../ilamy-calendar
   
   # Option B: Using npm link (more flexible)
   cd ilamy-calendar
   npm link
   cd ../your-nextjs-project
   npm link @ilamy/calendar
   ```

3. **After making changes to calendar, rebuild:**
   ```bash
   cd ilamy-calendar
   bun run build
   # Changes will be reflected in Next.js project after rebuild
   ```

**Pros:**
- ✅ Use your customized version directly
- ✅ See changes after rebuilding
- ✅ No need to publish to npm registry
- ✅ Perfect for forked/customized versions
- ✅ Version controlled via git

**Cons:**
- ⚠️ Requires rebuilding package after changes (`bun run build`)
- ⚠️ Path management (use absolute paths or workspace configs)
- ⚠️ Both projects need to be on same machine/network

**Tip**: Consider using a monorepo (Method 4) if you frequently modify both projects.

---

### Method 3: Git Submodule

**Best for**: Private repositories, version-controlled source code access

Include the calendar repository as a git submodule to access source code directly.

#### Setup

```bash
cd your-nextjs-project
git submodule add https://github.com/kcsujeet/ilamy-calendar.git packages/ilamy-calendar
git submodule update --init --recursive
```

#### Usage

```json
// package.json
{
  "dependencies": {
    "@ilamy/calendar": "file:./packages/ilamy-calendar"
  }
}
```

**Pros:**
- ✅ Direct access to source code
- ✅ Can make custom modifications
- ✅ Version controlled via git commits
- ✅ Good for private/internal projects

**Cons:**
- ⚠️ More complex setup
- ⚠️ Requires git submodule management
- ⚠️ Team members need to initialize submodules

---

### Method 4: Monorepo Structure

**Best for**: Multiple projects sharing the calendar, large organizations

Use a monorepo tool (Turborepo, Nx, pnpm workspaces, etc.) to share code.

#### Example with pnpm workspaces

```json
// pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

```json
// apps/nextjs-app/package.json
{
  "dependencies": {
    "@ilamy/calendar": "workspace:*"
  }
}
```

**Pros:**
- ✅ Perfect for multiple projects
- ✅ Shared dependencies and tooling
- ✅ Atomic changes across projects
- ✅ Efficient builds with caching

**Cons:**
- ⚠️ Requires monorepo tooling setup
- ⚠️ More complex project structure
- ⚠️ Learning curve for team

---

### Method 5: Manual File Copy (Original Method)

**Best for**: Maximum customization, one-off integrations, learning

Copy source files directly into your project. See [Step-by-Step Migration](#step-by-step-migration) section below for details.

**Pros:**
- ✅ Full control over source code
- ✅ Easy to customize
- ✅ No package management overhead
- ✅ Can merge with your codebase structure

**Cons:**
- ⚠️ Harder to update
- ⚠️ File duplication
- ⚠️ Manual dependency management
- ⚠️ More maintenance overhead

---

### Method 6: Publish Your Own Package

**Best for**: Customized versions that need to be shared across multiple projects or teams

If you've made significant customizations and want to distribute your version as a package (public or private).

#### Steps

1. **Update package.json with your package name:**
   ```json
   {
     "name": "@your-org/ilamy-calendar",
     "version": "1.1.0-custom.1",
     "private": false,  // or true for private packages
     // ... rest of config
   }
   ```

2. **Build the package:**
   ```bash
   bun run build
   ```

3. **Publish to npm (public or private registry):**
   ```bash
   npm publish
   # or for private scoped packages
   npm publish --access restricted
   ```

4. **Install in your Next.js project:**
   ```bash
   bun add @your-org/ilamy-calendar
   ```

**Pros:**
- ✅ Version management via npm
- ✅ Easy distribution to multiple projects
- ✅ Can use private npm registries (GitHub Packages, npm Enterprise, etc.)
- ✅ Standard package management workflow
- ✅ Works with CI/CD pipelines

**Cons:**
- ⚠️ Requires publishing/registry setup
- ⚠️ Must rebuild and republish after changes
- ⚠️ Version management overhead
- ⚠️ Additional setup for private registries

---

## Which Method Should I Choose?

### Quick Decision Guide

| Your Situation | Recommended Method | Why |
|----------------|-------------------|-----|
| **Using standard package without modifications** | **Method 1: NPM Package** | Simplest, just install from npm |
| **✅ You cloned repo and made customizations** | **Method 2: Local Linking** | Use your customized version directly |
| **✅ Customized fork, multiple projects** | **Method 4: Monorepo** or **Method 6: Publish Your Own** | Share across projects efficiently |
| **✅ Customized fork, team distribution** | **Method 6: Publish Your Own Package** | Private npm registry, version control |
| **Active development on calendar** | **Method 2: Local Linking** | See changes quickly after rebuild |
| **Private/internal projects** | **Method 3: Git Submodule** | Version controlled access |
| **Heavy customization, one project** | **Method 5: Manual Copy** | Full control, merge into codebase |
| **Learning/experimentation** | **Method 5: Manual Copy** | Understand the codebase structure |

### For Your Specific Case (Cloned + Customized)

Since you've **cloned the repository and made customizations**, here are your best options:

1. **🏆 Method 2: Local Package Linking** (Recommended)
   - Best for: Single project, active development
   - Setup: Link your local calendar directory to your Next.js project
   - Workflow: Make changes → `bun run build` → Changes reflect in Next.js

2. **Method 4: Monorepo Structure**
   - Best for: Multiple projects using your customized calendar
   - Setup: Use pnpm/npm workspaces or Turborepo
   - Workflow: Changes automatically available across projects

3. **Method 6: Publish Your Own Package**
   - Best for: Sharing with team, multiple projects, CI/CD
   - Setup: Publish to npm (public or private registry)
   - Workflow: Build → Publish → Install in projects

4. **Method 5: Manual File Copy**
   - Best for: Heavy customization, merging into your codebase
   - Setup: Copy files directly (see Step-by-Step Migration)
   - Workflow: Modify files directly in your project

---

## Project Structure

### Files to Copy

Copy the following directory structure to your Next.js project:

```
your-nextjs-project/
├── src/
│   ├── components/
│   │   ├── all-events-dialog.tsx
│   │   ├── drag-and-drop/
│   │   │   ├── calendar-dnd-context.tsx
│   │   │   ├── dnd-utils.ts
│   │   │   └── event-drag-overlay.tsx
│   │   ├── draggable-event/
│   │   │   └── draggable-event.tsx
│   │   ├── droppable-cell.tsx
│   │   ├── event-form/
│   │   │   └── event-form.tsx
│   │   ├── grid-cell.tsx
│   │   ├── header/
│   │   │   ├── base-header.tsx
│   │   │   ├── index.tsx
│   │   │   ├── title-content.tsx
│   │   │   └── view-controls.tsx
│   │   ├── types.ts
│   │   └── ui/                    # Shadcn UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── date-picker.tsx
│   │       ├── dialog.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── popover.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       └── time-picker.tsx
│   ├── features/
│   │   ├── calendar/
│   │   │   ├── components/
│   │   │   │   ├── day-view/
│   │   │   │   │   ├── day-all-day-row.tsx
│   │   │   │   │   ├── day-events-layer.tsx
│   │   │   │   │   ├── day-header.tsx
│   │   │   │   │   ├── day-time-col.tsx
│   │   │   │   │   └── day-view.tsx
│   │   │   │   ├── ilamy-calendar.tsx
│   │   │   │   ├── month-view/
│   │   │   │   │   ├── day-cell.tsx
│   │   │   │   │   ├── month-header.tsx
│   │   │   │   │   ├── month-view.tsx
│   │   │   │   │   ├── types.ts
│   │   │   │   │   └── week-events-layer.tsx
│   │   │   │   ├── week-view/
│   │   │   │   │   ├── week-all-day-row.tsx
│   │   │   │   │   ├── week-day-col.tsx
│   │   │   │   │   ├── week-header.tsx
│   │   │   │   │   ├── week-time-grid.tsx
│   │   │   │   │   └── week-view.tsx
│   │   │   │   └── year-view/
│   │   │   │       └── year-view.tsx
│   │   │   ├── contexts/
│   │   │   │   └── calendar-context/
│   │   │   │       ├── context.ts
│   │   │   │       └── provider.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProcessedDayEvents.ts
│   │   │   │   └── useProcessedWeekEvents.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       ├── business-hours.ts
│   │   │       └── visible-hours.ts
│   │   ├── recurrence/
│   │   │   ├── components/
│   │   │   │   ├── recurrence-edit-dialog/
│   │   │   │   │   └── recurrence-edit-dialog.tsx
│   │   │   │   └── recurrence-editor/
│   │   │   │       └── recurrence-editor.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useRecurringEventActions.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── utils/
│   │   │       └── recurrence-handler.ts
│   │   └── resource-calendar/
│   │       ├── components/
│   │       │   ├── day-view/
│   │       │   │   ├── index.tsx
│   │       │   │   └── resource-day-horizontal.tsx
│   │       │   ├── ilamy-resource-calendar/
│   │       │   │   ├── ilamy-resource-calendar.tsx
│   │       │   │   ├── index.ts
│   │       │   │   └── resource-calendar-body.tsx
│   │       │   ├── month-view/
│   │       │   │   ├── index.tsx
│   │       │   │   └── resource-month-horizontal.tsx
│   │       │   ├── resource-event-grid.tsx
│   │       │   ├── resource-events-layer.tsx
│   │       │   └── week-view/
│   │       │       ├── index.tsx
│   │       │       └── resource-week-horizontal.tsx
│   │       ├── contexts/
│   │       │   └── resource-calendar-context/
│   │       │       ├── context.ts
│   │       │       ├── index.ts
│   │       │       └── provider.tsx
│   │       ├── hooks/
│   │       │   └── useProcessedResourceWeekEvents.ts
│   │       └── types/
│   │           └── index.ts
│   ├── hooks/
│   │   ├── use-calendar-engine.ts
│   │   └── use-smart-calendar-context.ts
│   ├── lib/
│   │   ├── configs/
│   │   │   └── dayjs-config.ts
│   │   ├── constants.ts
│   │   ├── translations/
│   │   │   ├── default.ts
│   │   │   └── types.ts
│   │   └── utils/
│   │       ├── date-utils.ts
│   │       ├── export-ical.ts
│   │       ├── generator.ts
│   │       ├── index.ts
│   │       └── position-week-events.ts
│   └── types/
│       └── index.ts (CalendarView, TimeFormat types)
```

---

## Step-by-Step Migration (Manual Copy Method)

This section covers Method 5: Manual File Copy. For other methods, see [Integration Methods](#integration-methods) above.

### Step 1: Install Dependencies

```bash
cd your-nextjs-project
npm install [all dependencies listed above]
# or
bun add [all dependencies listed above]
```

### Step 2: Copy Source Files

1. Copy the entire `src/features` directory to your Next.js project
2. Copy the entire `src/components` directory (excluding `demo` folder)
3. Copy the entire `src/lib` directory
4. Copy `src/types/index.ts` (or merge with your existing types)
5. Copy `src/hooks` directory

### Step 3: Update Import Paths

The calendar uses `@/` path aliases. Configure this in your Next.js project:

**`tsconfig.json`**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**`next.config.js` or `next.config.mjs`**:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... your existing config
}

module.exports = nextConfig
```

### Step 4: Configure Tailwind CSS

Ensure your `tailwind.config.js` includes the calendar's required utilities:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    // Include calendar components
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Calendar uses CSS variables for theming
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ... other color variables
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### Step 5: Configure Dayjs

The calendar requires dayjs with specific plugins. Ensure `src/lib/configs/dayjs-config.ts` is properly configured:

```typescript
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import localeData from 'dayjs/plugin/localeData'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(localeData)
dayjs.extend(customParseFormat)

export default dayjs
```

**Important**: Import this config file early in your app. In Next.js App Router, add it to your root layout or a client component that wraps the calendar.

### Step 6: Create Calendar Wrapper Component (Client Component)

Since the calendar uses React hooks and client-side features, create a client component wrapper:

**`src/components/calendar-wrapper.tsx`**:
```typescript
'use client'

import { IlamyCalendar } from '@/features/calendar/components/ilamy-calendar'
import { IlamyResourceCalendar } from '@/features/resource-calendar/components/ilamy-resource-calendar/ilamy-resource-calendar'
import type { CalendarEvent, WeekDays } from '@/components/types'
import type { CalendarView, TimeFormat } from '@/types'
import type { Resource } from '@/features/resource-calendar/types'
// Import dayjs config early
import '@/lib/configs/dayjs-config'

interface CalendarWrapperProps {
  type?: 'regular' | 'resource'
  events?: CalendarEvent[]
  resources?: Resource[]
  // ... other props
}

export function CalendarWrapper(props: CalendarWrapperProps) {
  if (props.type === 'resource') {
    return <IlamyResourceCalendar {...props} />
  }
  return <IlamyCalendar {...props} />
}
```

### Step 7: Use in Next.js App Router Page

**`app/calendar/page.tsx`**:
```typescript
import { CalendarWrapper } from '@/components/calendar-wrapper'
import type { CalendarEvent } from '@/components/types'

// This can be a server component that fetches data
export default async function CalendarPage() {
  // Fetch events from your API/database
  const events: CalendarEvent[] = await fetchEvents()
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <CalendarWrapper
        type="regular"
        events={events}
        initialView="month"
        firstDayOfWeek="sunday"
      />
    </div>
  )
}
```

---

## Configuration Files

### 1. Dayjs Configuration (`src/lib/configs/dayjs-config.ts`)

Already covered in Step 5. Ensure all plugins are imported and extended.

### 2. Constants (`src/lib/constants.ts`)

Check if any constants need adjustment for your project:
- `DAY_MAX_EVENTS_DEFAULT`: Default max events per day
- `WEEK_DAYS_NUMBER_MAP`: Mapping of week day names to numbers
- `EVENT_BAR_HEIGHT`: Height of event bars
- `GAP_BETWEEN_ELEMENTS`: Spacing between elements

### 3. Translations (`src/lib/translations/default.ts`)

Customize translations if needed. The calendar supports:
- Custom translation objects
- Translator functions
- Locale-based translations via dayjs

---

## Integration Scenarios

### Scenario 1: Basic Calendar Integration

**Use Case**: Simple event calendar with month/week/day views

```typescript
// app/events/page.tsx
'use client'

import { IlamyCalendar } from '@/features/calendar/components/ilamy-calendar'
import type { CalendarEvent } from '@/components/types'
import '@/lib/configs/dayjs-config'

export default function EventsPage() {
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Meeting',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T11:00:00'),
    },
  ]

  return (
    <div className="h-screen">
      <IlamyCalendar
        events={events}
        initialView="month"
        onEventAdd={(event) => {
          // Handle event creation
          console.log('Event added:', event)
        }}
        onEventUpdate={(event) => {
          // Handle event update
          console.log('Event updated:', event)
        }}
        onEventDelete={(event) => {
          // Handle event deletion
          console.log('Event deleted:', event)
        }}
      />
    </div>
  )
}
```

### Scenario 2: Resource Calendar Integration

**Use Case**: Managing events across multiple resources (rooms, equipment, etc.)

```typescript
// app/resources/page.tsx
'use client'

import { IlamyResourceCalendar } from '@/features/resource-calendar/components/ilamy-resource-calendar/ilamy-resource-calendar'
import type { CalendarEvent } from '@/components/types'
import type { Resource } from '@/features/resource-calendar/types'
import '@/lib/configs/dayjs-config'

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      id: 'room-1',
      title: 'Conference Room A',
      color: '#1e40af',
      backgroundColor: '#dbeafe',
      position: 1,
    },
    {
      id: 'room-2',
      title: 'Conference Room B',
      color: '#059669',
      backgroundColor: '#d1fae5',
      position: 2,
    },
  ]

  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date('2024-01-15T10:00:00'),
      end: new Date('2024-01-15T11:00:00'),
      resourceId: 'room-1',
    },
  ]

  return (
    <div className="h-screen">
      <IlamyResourceCalendar
        resources={resources}
        events={events}
        initialView="week"
        onEventAdd={(event) => {
          // Handle event creation with resource
          console.log('Event added:', event)
        }}
      />
    </div>
  )
}
```

### Scenario 3: With Business Hours and Visible Hours

**Use Case**: Restricting event creation to business hours and controlling visible time range

```typescript
'use client'

import { IlamyCalendar } from '@/features/calendar/components/ilamy-calendar'
import type { CalendarEvent, WeekDays } from '@/components/types'
import '@/lib/configs/dayjs-config'

export default function BusinessCalendarPage() {
  const businessHours = {
    daysOfWeek: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] as WeekDays[],
    startTime: 9, // 9 AM
    endTime: 17, // 5 PM
  }

  const visibleHours = {
    startTime: 8, // Show from 8 AM
    endTime: 20, // Show until 8 PM
  }

  return (
    <IlamyCalendar
      events={[]}
      businessHours={businessHours}
      visibleHours={visibleHours}
      initialView="week"
    />
  )
}
```

### Scenario 4: Server-Side Data Fetching

**Use Case**: Fetching events from API/database

```typescript
// app/calendar/page.tsx
import { CalendarWrapper } from '@/components/calendar-wrapper'
import type { CalendarEvent } from '@/components/types'

async function fetchEvents(): Promise<CalendarEvent[]> {
  // Fetch from your API
  const res = await fetch('https://api.example.com/events', {
    cache: 'no-store', // or 'force-cache' for static data
  })
  return res.json()
}

export default async function CalendarPage() {
  const events = await fetchEvents()

  return (
    <div className="h-screen">
      <CalendarWrapper
        type="regular"
        events={events}
        initialView="month"
      />
    </div>
  )
}
```

### Scenario 5: Custom Event Rendering

**Use Case**: Customizing how events are displayed

```typescript
'use client'

import { IlamyCalendar } from '@/features/calendar/components/ilamy-calendar'
import type { CalendarEvent } from '@/components/types'
import '@/lib/configs/dayjs-config'

export default function CustomCalendarPage() {
  const renderEvent = (event: CalendarEvent) => {
    return (
      <div className="bg-blue-500 text-white p-1 rounded">
        <div className="font-bold">{event.title}</div>
        <div className="text-xs">
          {event.start.format('HH:mm')} - {event.end.format('HH:mm')}
        </div>
      </div>
    )
  }

  return (
    <IlamyCalendar
      events={[]}
      renderEvent={renderEvent}
      initialView="month"
    />
  )
}
```

---

## Troubleshooting

### Issue 1: "Cannot find module '@/...'"

**Solution**: Ensure `tsconfig.json` has the path alias configured:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Issue 2: Dayjs plugins not working

**Solution**: Ensure `dayjs-config.ts` is imported before using the calendar:
```typescript
// At the top of your page/component
import '@/lib/configs/dayjs-config'
```

### Issue 3: Calendar not rendering

**Solution**: 
1. Ensure the component is a Client Component (`'use client'`)
2. Check browser console for errors
3. Verify all dependencies are installed
4. Ensure Tailwind CSS is properly configured

### Issue 4: Styling issues

**Solution**:
1. Ensure Tailwind CSS is configured with the calendar's content paths
2. Check that `tailwindcss-animate` plugin is installed
3. Verify CSS variables are defined in your global CSS

### Issue 5: Events not appearing

**Solution**:
1. Check event data format matches `CalendarEvent` interface
2. Ensure `start` and `end` dates are valid Date objects or dayjs instances
3. Verify events are within the visible date range
4. Check if `visibleHours` or `businessHours` are filtering out events

### Issue 6: Drag and drop not working

**Solution**:
1. Ensure `@dnd-kit/core` and `@dnd-kit/modifiers` are installed
2. Check that `disableDragAndDrop` is not set to `true`
3. Verify the calendar is wrapped in `CalendarDndContext` (already included in components)

### Issue 7: TypeScript errors

**Solution**:
1. Ensure all type definitions are copied (`src/components/types.ts`, `src/types/index.ts`)
2. Check that TypeScript version is compatible (^5.0.0)
3. Verify all imports use correct paths

---

## Next Steps

1. **Customize Styling**: Adjust Tailwind classes and CSS variables to match your design system
2. **Add Translations**: Implement your translation system if needed
3. **Connect to Backend**: Integrate with your API for event CRUD operations
4. **Add Features**: Extend the calendar with custom features as needed
5. **Optimize Performance**: Consider memoization and code splitting for large event lists

---

## Additional Resources

- Check the demo implementation in `src/components/demo/demo-page.tsx` for complete usage examples
- Review component prop types in `src/features/calendar/types/index.ts` and `src/features/resource-calendar/types/index.ts`
- See test files for usage patterns and edge cases

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the component source code and type definitions
3. Check browser console for detailed error messages

---

**Last Updated**: Based on calendar implementation as of current project state

