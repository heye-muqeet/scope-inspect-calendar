# Visible Hours Feature - Implementation Documentation

## Executive Summary

This document outlines the implementation plan for adding a `visibleHours` feature to the ilamy Calendar system. This feature will allow users to control which time range is displayed on the calendar's vertical time scale, independent of `businessHours` which controls event creation/editing restrictions.

---

## 1. Current State Analysis

### 1.1 Business Hours (Current Implementation)

**Purpose**: Controls when calendar interactions are allowed (event creation/editing restrictions)

**Current Usage**:
- **Event Form** (`src/components/event-form/event-form.tsx`):
  - Sets `minTime` and `maxTime` for time pickers
  - Disables date selection for non-business days
  - Lines 253-258: Restricts time selection within business hours

- **Week View** (`src/features/calendar/components/week-view/week-day-col.tsx`):
  - Disables time cells outside business hours (line 43: `disabled={!isBusiness}`)
  - Uses `isBusinessHour` utility to check each hour slot

- **Day View** (`src/features/calendar/components/day-view/day-view.tsx`):
  - Disables 15-minute time slots outside business hours (line 83: `disabled={!isBusiness}`)
  - Checks business hours for each 15-minute interval

- **Business Hours Utility** (`src/features/calendar/utils/business-hours.ts`):
  - `isBusinessDay()`: Checks if a date is a business day
  - `isBusinessHour()`: Checks if a specific hour/minute is within business hours

**Type Definition** (`src/components/types.ts`):
```typescript
export interface BusinessHours {
  daysOfWeek?: WeekDays[]
  startTime?: number  // 0-24
  endTime?: number    // 0-24
}
```

### 1.2 Time Scale Rendering (Current Implementation)

**Hardcoded 24-Hour Display**: All time-based views currently display all 24 hours (0-23) regardless of any settings.

**Affected Components**:

1. **Regular Calendar - Week View**:
   - `src/features/calendar/components/week-view/week-time-grid.tsx` (line 7-9):
     ```typescript
     const hours = Array.from({ length: 24 }, (_, i) => i).map((hour) =>
       dayjs().hour(hour).minute(0)
     )
     ```
   - `src/features/calendar/components/week-view/week-day-col.tsx`:
     - Uses the `hours` array from `week-time-grid.tsx`
     - Renders 24 time slots per day

2. **Regular Calendar - Day View**:
   - `src/features/calendar/components/day-view/day-view.tsx` (line 14-16):
     ```typescript
     const hours = Array.from({ length: 24 }, (_, i) => i).map((hour) => {
       return dayjs().hour(hour).minute(0)
     })
     ```
   - `src/features/calendar/components/day-view/day-time-col.tsx` (line 5-7):
     - Same hardcoded 24-hour array
     - Renders time labels for all 24 hours

3. **Resource Calendar - Week View**:
   - `src/features/resource-calendar/components/week-view/resource-week-horizontal.tsx` (line 27-31):
     ```typescript
     const weekHours = useMemo(() => {
       return weekDays.flatMap((day) =>
         Array.from({ length: 24 }, (_, hour) => day.hour(hour).minute(0))
       )
     }, [weekDays])
     ```

4. **Resource Calendar - Day View**:
   - `src/features/resource-calendar/components/day-view/resource-day-horizontal.tsx` (line 19-23):
     ```typescript
     const dayHours = useMemo(() => {
       return Array.from({ length: 24 }, (_, hour) =>
         currentDate.hour(hour).minute(0)
       )
     }, [currentDate])
     ```

### 1.3 Context and Props Flow

**Calendar Context** (`src/features/calendar/contexts/calendar-context/context.ts`):
- Line 56: `businessHours?: BusinessHours` in context type
- Line 100: Exposed in simplified context return

**Calendar Provider** (`src/features/calendar/contexts/calendar-context/provider.tsx`):
- Line 36: `businessHours?: BusinessHours` in props
- Line 68: Passed to `useCalendarEngine`
- Line 80: Passed to calendar engine hook

**Calendar Component** (`src/features/calendar/components/ilamy-calendar.tsx`):
- Receives `businessHours` prop
- Passes to `CalendarProvider`

**Resource Calendar** (`src/features/resource-calendar/components/ilamy-resource-calendar/ilamy-resource-calendar.tsx`):
- Receives `businessHours` prop
- Passes to `ResourceCalendarProvider`

---

## 2. Requirements

### 2.1 Functional Requirements

1. **Visible Hours Setting**:
   - Users can configure a time range (startTime, endTime) that controls which hours are displayed
   - Default: Show all 24 hours (0-24) if not specified
   - Range: 0-24 hours (24-hour format)

2. **Independence from Business Hours**:
   - `visibleHours` and `businessHours` are completely independent
   - `visibleHours` only affects UI display (what's shown)
   - `businessHours` only affects interaction rules (what's allowed)

3. **Display Behavior**:
   - Only hours within `visibleHours` range should be rendered on the time scale
   - Time labels should only show for visible hours
   - Time slots/cells should only exist for visible hours
   - Grid rows should only exist for visible hours

4. **Event Display**:
   - **Events are completely unaffected by visibleHours**
   - Events render normally regardless of visible hours configuration
   - Events can span outside visible hours and will display fully
   - No clipping, truncation, or positioning adjustments needed
   - All-day events are unaffected

5. **Current Time Indicator**:
   - No special handling needed - if current time is outside visible hours, it simply won't be visible (that part of the time scale isn't rendered)
   - If current time is within visible hours, use normal position calculation
   - No offset adjustments needed - indicator position is relative to the visible time scale

6. **Scroll Behavior**:
   - Calendar should scroll to show visible hours range
   - Scroll position should be maintained when switching views

### 2.2 Non-Functional Requirements

1. **Backward Compatibility**:
   - If `visibleHours` is not provided, default to showing all 24 hours
   - Existing calendars without `visibleHours` should work unchanged

2. **Performance**:
   - No significant performance degradation
   - Efficient filtering of hours array

3. **Type Safety**:
   - Full TypeScript support
   - Proper type definitions

---

## 3. Architecture Plan

### 3.1 Type Definition

**New Type** (`src/components/types.ts`):
```typescript
/**
 * Configuration for visible hours on the calendar.
 * Controls which time range is displayed on the calendar's vertical time scale.
 * This is independent from businessHours which controls interaction rules.
 */
export interface VisibleHours {
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

**Key Differences from BusinessHours**:
- No `daysOfWeek` property (visible hours apply to all days)
- Simpler structure (only start/end time)
- Different purpose (display vs. interaction)

### 3.2 Data Flow

```
User Input (Demo Settings)
    ↓
demo-page.tsx (State)
    ↓
IlamyCalendar / IlamyResourceCalendar (Props)
    ↓
CalendarProvider / ResourceCalendarProvider (Props)
    ↓
CalendarContext / ResourceCalendarContext (Context)
    ↓
Time Scale Components (Week/Day Views)
    ↓
Filter hours array based on visibleHours
    ↓
Render only visible hours
```

### 3.3 Utility Functions

**New Utility** (`src/features/calendar/utils/visible-hours.ts`):
```typescript
/**
 * Generates an array of hour objects within the visible hours range
 * @param visibleHours - Optional visible hours configuration
 * @returns Array of dayjs objects representing visible hours
 */
export function getVisibleHours(
  visibleHours?: VisibleHours
): dayjs.Dayjs[]

/**
 * Checks if a specific hour is within visible hours
 * @param hour - Hour to check (0-23)
 * @param visibleHours - Optional visible hours configuration
 * @returns true if hour should be displayed
 */
export function isVisibleHour(
  hour: number,
  visibleHours?: VisibleHours
): boolean

/**
 * Calculates the total number of visible hours
 * @param visibleHours - Optional visible hours configuration
 * @returns Number of visible hours (default: 24)
 */
export function getVisibleHoursCount(
  visibleHours?: VisibleHours
): number
```

---

## 4. Implementation Plan

### 4.1 Phase 1: Type Definitions and Utilities

**Files to Modify**:

1. **`src/components/types.ts`**:
   - Add `VisibleHours` interface (after `BusinessHours`)

2. **`src/features/calendar/utils/visible-hours.ts`** (NEW):
   - Create utility functions for visible hours
   - Implement `getVisibleHours()`, `isVisibleHour()`, `getVisibleHoursCount()`
   - Add unit tests

### 4.2 Phase 2: Context Integration

**Files to Modify**:

1. **`src/features/calendar/contexts/calendar-context/context.ts`**:
   - Add `visibleHours?: VisibleHours` to `CalendarContextType` (line 56 area)
   - Add to `UseIlamyCalendarContextReturn` (line 100 area)

2. **`src/features/calendar/contexts/calendar-context/provider.tsx`**:
   - Add `visibleHours?: VisibleHours` to `CalendarProviderProps` (line 36 area)
   - Pass `visibleHours` to context value (line 131 area)
   - Pass to `useCalendarEngine` if needed

3. **`src/features/resource-calendar/contexts/resource-calendar-context/context.ts`**:
   - Inherits from `CalendarContextType`, so automatically gets `visibleHours`

4. **`src/features/resource-calendar/contexts/resource-calendar-context/provider.tsx`**:
   - Add `visibleHours?: VisibleHours` to props interface
   - Pass to `ResourceCalendarProvider`

### 4.3 Phase 3: Component Props

**Files to Modify**:

1. **`src/features/calendar/types/index.ts`**:
   - Add `visibleHours?: VisibleHours` to `IlamyCalendarProps` (after `businessHours`, line 160 area)

2. **`src/features/calendar/components/ilamy-calendar.tsx`**:
   - Add `visibleHours` prop
   - Pass to `CalendarProvider`

3. **`src/features/resource-calendar/components/ilamy-resource-calendar/ilamy-resource-calendar.tsx`**:
   - Add `visibleHours` prop
   - Pass to `ResourceCalendarProvider`

4. **`src/features/resource-calendar/contexts/resource-calendar-context/provider.tsx`**:
   - Add `visibleHours` to interface extending `CalendarProviderProps`
   - Pass to context

### 4.4 Phase 4: Time Scale Rendering (Core Changes)

**Files to Modify**:

1. **`src/features/calendar/components/week-view/week-time-grid.tsx`**:
   - Import `getVisibleHours` utility
   - Replace hardcoded `hours` array with filtered version from context
   - Update grid rows calculation: `grid-rows-[repeat(${visibleHoursCount},minmax(60px, 1fr))]`
   - Update time labels rendering to use visible hours only
   - Current time indicator: No changes needed (existing calculation works relative to visible time scale)

2. **`src/features/calendar/components/week-view/week-day-col.tsx`**:
   - Get `visibleHours` from context
   - Filter hours array before mapping
   - Update cell rendering to only show visible hours

3. **`src/features/calendar/components/day-view/day-view.tsx`**:
   - Get `visibleHours` from context
   - Replace hardcoded `hours` array with filtered version
   - Update container height calculation: `${visibleHoursCount * 60}px`
   - Filter hours before mapping to time slots
   - Current time indicator: No changes needed (existing calculation works relative to visible time scale)

4. **`src/features/calendar/components/day-view/day-time-col.tsx`**:
   - Get `visibleHours` from context
   - Replace hardcoded `hours` array with filtered version
   - Only render time labels for visible hours

5. **`src/features/resource-calendar/components/week-view/resource-week-horizontal.tsx`**:
   - Get `visibleHours` from context
   - Filter `weekHours` to only include visible hours
   - Update time header row to only show visible hours

6. **`src/features/resource-calendar/components/day-view/resource-day-horizontal.tsx`**:
   - Get `visibleHours` from context
   - Filter `dayHours` to only include visible hours
   - Update time header row to only show visible hours

### 4.5 Phase 5: Event Positioning (NOT NEEDED)

**Files to Review**:
- **No changes needed** - Events are completely independent of visibleHours
- Event positioning calculations remain unchanged
- Events render normally regardless of visible hours configuration

### 4.6 Phase 6: Demo Integration

**Files to Modify**:

1. **`src/components/demo/demo-page.tsx`**:
   - Add `visibleHours` state (similar to `businessHours`)
   - Pass to calendar components
   - Pass to settings component

2. **`src/components/demo/demo-calendar-settings.tsx`**:
   - Add `visibleHours` props to interface
   - Add UI controls for visible hours (start time, end time inputs)
   - Place in settings panel (after business hours section)

---

## 5. Detailed File Changes

### 5.1 New Files

1. **`src/features/calendar/utils/visible-hours.ts`**:
   - Utility functions for visible hours calculations
   - ~100 lines

2. **`src/features/calendar/utils/visible-hours.test.ts`**:
   - Unit tests for visible hours utilities
   - ~150 lines

### 5.2 Modified Files Summary

| File | Changes | Complexity |
|------|---------|------------|
| `src/components/types.ts` | Add `VisibleHours` interface | Low |
| `src/features/calendar/utils/visible-hours.ts` | NEW - Utility functions | Medium |
| `src/features/calendar/contexts/calendar-context/context.ts` | Add `visibleHours` to context | Low |
| `src/features/calendar/contexts/calendar-context/provider.tsx` | Add `visibleHours` prop and pass to context | Low |
| `src/features/calendar/types/index.ts` | Add `visibleHours` to props interface | Low |
| `src/features/calendar/components/ilamy-calendar.tsx` | Add `visibleHours` prop | Low |
| `src/features/calendar/components/week-view/week-time-grid.tsx` | Filter hours, update grid rows | Medium |
| `src/features/calendar/components/week-view/week-day-col.tsx` | Filter hours array | Low |
| `src/features/calendar/components/day-view/day-view.tsx` | Filter hours, update height | Medium |
| `src/features/calendar/components/day-view/day-time-col.tsx` | Filter hours array | Low |
| `src/features/resource-calendar/contexts/resource-calendar-context/provider.tsx` | Add `visibleHours` prop | Low |
| `src/features/resource-calendar/components/ilamy-resource-calendar/ilamy-resource-calendar.tsx` | Add `visibleHours` prop | Low |
| `src/features/resource-calendar/components/week-view/resource-week-horizontal.tsx` | Filter hours | Medium |
| `src/features/resource-calendar/components/day-view/resource-day-horizontal.tsx` | Filter hours | Medium |
| `src/components/demo/demo-page.tsx` | Add state and pass props | Low |
| `src/components/demo/demo-calendar-settings.tsx` | Add UI controls | Medium |

**Note**: Event layer components (week-events-layer.tsx, day-events-layer.tsx, resource-event-grid.tsx) require **NO changes** - events are unaffected by visibleHours.

**Total**: 17 files (2 new, 15 modified)

---

## 6. Implementation Details

### 6.1 Hour Filtering Logic

**Pattern to Use**:
```typescript
const visibleHours = getVisibleHours(visibleHoursConfig)
// Instead of:
const hours = Array.from({ length: 24 }, (_, i) => i).map((hour) =>
  dayjs().hour(hour).minute(0)
)
```

**Default Behavior** (when `visibleHours` is undefined):
- Show all 24 hours (0-23)
- Maintain backward compatibility

### 6.2 Grid Layout Adjustments

**Week View Grid**:
- Current: `grid-rows-[repeat(24,minmax(60px, 1fr))]`
- New: `grid-rows-[repeat(${visibleHoursCount},minmax(60px, 1fr))]`
- Use dynamic class or inline style

**Day View Height**:
- Current: `${hours.length * 60}px` (always 1440px)
- New: `${visibleHoursCount * 60}px` (dynamic)

### 6.3 Current Time Indicator

**Position Calculation**:
- Current: `top: ${(dayjs().hour() + dayjs().minute() / 60) * 60}px`
- New: **No changes needed** - use existing calculation
- If current time is outside visible hours, the indicator simply won't be visible (that part of the time scale isn't rendered)
- If current time is within visible hours, the existing position calculation works correctly relative to the visible time scale
- **Key Point**: The indicator position is relative to the rendered time scale, so no offset adjustments are needed

### 6.4 Event Rendering

**Events Spanning Outside Visible Hours**:
- **No changes needed** - Events are completely independent of visibleHours
- Events render using their original positioning calculations
- Events can span outside visible hours and will display fully
- No clipping, truncation, or positioning adjustments required
- Time scale filtering does not affect event rendering at all

---

## 7. Testing Strategy

### 7.1 Unit Tests

1. **Visible Hours Utilities** (`visible-hours.test.ts`):
   - Test `getVisibleHours()` with various configurations
   - Test `isVisibleHour()` edge cases
   - Test `getVisibleHoursCount()` calculations
   - Test default behavior (undefined visibleHours)

2. **Business Hours Utilities** (existing):
   - Ensure no regression
   - Verify independence from visibleHours

### 7.2 Component Tests

1. **Week View**:
   - Test that only visible hours are rendered
   - Test grid row count matches visible hours
   - Test time labels only show visible hours
   - Test current time indicator (if within visible hours, should appear; if outside, won't be visible)

2. **Day View**:
   - Test that only visible hours are rendered
   - Test container height matches visible hours
   - Test time slots only exist for visible hours
   - Test current time indicator (if within visible hours, should appear; if outside, won't be visible)

3. **Resource Calendar Views**:
   - Same tests as regular calendar

### 7.3 Integration Tests

1. **Demo Page**:
   - Test visible hours settings UI
   - Test that changes reflect in calendar
   - Test independence from business hours

2. **Event Rendering**:
   - **Verify events are unaffected** - Events should render normally regardless of visibleHours
   - Test events spanning outside visible hours (should display fully)
   - Test events within visible hours (should display normally)
   - Test all-day events (should be unaffected)
   - Verify no event positioning changes occur

### 7.4 Edge Cases

1. **Boundary Conditions**:
   - `startTime = 0, endTime = 24` (all hours)
   - `startTime = 0, endTime = 12` (morning only)
   - `startTime = 12, endTime = 24` (afternoon only)
   - `startTime = 6, endTime = 22` (typical work day)

2. **Current Time**:
   - Current time before visible hours (indicator won't be visible - that part of time scale isn't rendered)
   - Current time after visible hours (indicator won't be visible - that part of time scale isn't rendered)
   - Current time within visible hours (indicator appears normally using existing position calculation)
   - **No special logic needed** - indicator naturally won't be visible if outside the rendered time scale

3. **Events**:
   - Event starts before visible hours, ends within (should display fully)
   - Event starts within visible hours, ends after (should display fully)
   - Event completely outside visible hours (should still display fully)
   - **Key Point**: Events are never affected by visibleHours - they always render normally

---

## 8. Migration and Backward Compatibility

### 8.1 Backward Compatibility

- **Default Behavior**: If `visibleHours` is not provided, show all 24 hours
- **No Breaking Changes**: Existing code without `visibleHours` will work unchanged
- **Optional Prop**: `visibleHours` is optional in all interfaces

### 8.2 Migration Path

1. **For Existing Users**:
   - No action required
   - Calendar continues to show all 24 hours
   - Can optionally add `visibleHours` prop

2. **For New Users**:
   - Can immediately use `visibleHours` prop
   - Recommended: Set based on typical usage patterns

---

## 9. Performance Considerations

### 9.1 Optimization Strategies

1. **Memoization**:
   - Memoize filtered hours arrays in components
   - Use `useMemo` for expensive calculations

2. **Efficient Filtering**:
   - Filter hours array once per render
   - Cache filtered results when visibleHours doesn't change

3. **Grid Updates**:
   - Only recalculate grid when visibleHours changes
   - Use React keys properly to avoid unnecessary re-renders

### 9.2 Performance Impact

- **Expected Impact**: Minimal
- **Filtering Overhead**: Negligible (24 items max)
- **Rendering Impact**: Potentially better (fewer DOM nodes)

---

## 10. Documentation Updates

### 10.1 Code Documentation

1. **Type Definitions**: JSDoc comments for `VisibleHours` interface
2. **Utility Functions**: JSDoc comments for all utility functions
3. **Component Props**: Update prop documentation

### 10.2 User Documentation

1. **README Updates**: Document `visibleHours` prop
2. **API Documentation**: Add to component API docs
3. **Examples**: Add usage examples

---

## 11. Implementation Checklist

### Phase 1: Foundation
- [ ] Create `VisibleHours` type definition
- [ ] Create `visible-hours.ts` utility file
- [ ] Write unit tests for utilities
- [ ] Verify tests pass

### Phase 2: Context Integration
- [ ] Add `visibleHours` to `CalendarContextType`
- [ ] Add `visibleHours` to `CalendarProviderProps`
- [ ] Pass `visibleHours` through context
- [ ] Add to resource calendar context
- [ ] Verify context propagation

### Phase 3: Component Props
- [ ] Add `visibleHours` to `IlamyCalendarProps`
- [ ] Add `visibleHours` to `IlamyCalendar` component
- [ ] Add `visibleHours` to `IlamyResourceCalendar` component
- [ ] Verify props flow

### Phase 4: Time Scale Rendering
- [ ] Update `week-time-grid.tsx`
- [ ] Update `week-day-col.tsx`
- [ ] Update `day-view.tsx`
- [ ] Update `day-time-col.tsx`
- [ ] Update `resource-week-horizontal.tsx`
- [ ] Update `resource-day-horizontal.tsx`
- [ ] Test all views render correctly

### Phase 5: Event Positioning (SKIPPED)
- [x] **No changes needed** - Events are independent of visibleHours
- [x] Events render normally regardless of visible hours
- [ ] Verify events display correctly (no regression testing)

### Phase 6: Demo Integration
- [ ] Add `visibleHours` state to demo page
- [ ] Add UI controls to settings
- [ ] Test demo functionality
- [ ] Verify settings persistence

### Phase 7: Testing
- [ ] Write unit tests
- [ ] Write component tests
- [ ] Write integration tests
- [ ] Test edge cases
- [ ] Verify backward compatibility

### Phase 8: Documentation
- [ ] Update type documentation
- [ ] Update component documentation
- [ ] Update README if needed
- [ ] Add usage examples

---

## 12. Risk Assessment

### 12.1 Low Risk
- Type definitions
- Context integration
- Utility functions

### 12.2 Medium Risk
- Time scale rendering changes
- Grid layout adjustments
- ~~Current time indicator positioning~~ (NOT APPLICABLE - no changes needed)

### 12.3 High Risk
- ~~Event positioning calculations~~ (NOT APPLICABLE - events unaffected)
- ~~Events spanning outside visible hours~~ (NOT APPLICABLE - events unaffected)
- Grid layout adjustments (medium risk, not high)

### 12.4 Mitigation Strategies
- Comprehensive testing
- Incremental implementation
- Feature flag (if needed)
- Rollback plan

---

## 13. Success Criteria

1. ✅ Users can configure visible hours independently from business hours
2. ✅ Only visible hours are displayed on time scale
3. ✅ Events render normally and are completely unaffected by visible hours
4. ✅ Current time indicator works correctly (naturally not visible if outside rendered time scale)
5. ✅ No performance degradation
6. ✅ Backward compatible (works without visibleHours)
7. ✅ All tests pass
8. ✅ Demo page includes visible hours controls

---

## 14. Timeline Estimate

- **Phase 1-2**: 2-3 hours (Foundation + Context)
- **Phase 3**: 1 hour (Props)
- **Phase 4**: 4-6 hours (Time Scale Rendering - most complex)
- **Phase 5**: 0 hours (Event Positioning - SKIPPED, events unaffected)
- **Phase 6**: 2 hours (Demo Integration)
- **Phase 7**: 2-3 hours (Testing - simplified, no event positioning tests)
- **Phase 8**: 1 hour (Documentation)

**Total Estimate**: 12-16 hours (reduced due to no event positioning changes)

---

## 15. Notes and Considerations

1. **Current Time Indicator**: No special handling needed - if outside visible hours, it simply won't be visible (that part of time scale isn't rendered)
2. **Scroll Position**: May want to auto-scroll to visible hours on load
3. **Event Rendering**: Events are completely independent - no special handling needed
4. **Mobile Responsiveness**: Ensure visible hours work well on mobile
5. **Accessibility**: Ensure time labels are accessible with screen readers
6. **Time Scale Only**: Remember - visibleHours ONLY affects the time scale display, nothing else (events, indicators, etc. are unaffected)

---

## End of Documentation

This document provides a comprehensive plan for implementing the `visibleHours` feature. Follow the phases sequentially and test thoroughly at each stage.

