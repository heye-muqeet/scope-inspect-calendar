# Internationalization

Comprehensive guide to internationalizing your calendar with custom translations, locales, and formatting.

The calendar supports comprehensive internationalization through multiple approaches: locale-based formatting, custom translations object, or translator functions. If both translations and translator are provided, the translator function takes priority.

## Overview

ScopeInspect Calendar provides flexible internationalization (i18n) support through:

- **Locale-based formatting**: Automatic date/time formatting based on locale
- **Custom translations object**: Static translations for all UI text
- **Translator function**: Dynamic translations or integration with i18n libraries
- **100+ locales**: Full dayjs locale support for date formatting

## Basic Locale Setup

The simplest way to internationalize your calendar is by setting the `locale` and `timezone` props. This will automatically format dates according to the specified locale.

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function InternationalCalendar() {
  return (
    <ScopeInspectCalendar
      events={events}
      locale="fr" // French locale for date formatting
      timezone="Europe/Paris" // Paris timezone
      firstDayOfWeek="monday"
    />
  )
}
```

### Supported Locales

The calendar supports all dayjs locales (100+ languages). Common examples:

- `en` - English
- `fr` - French
- `de` - German
- `es` - Spanish
- `it` - Italian
- `pt` - Portuguese
- `ja` - Japanese
- `zh` - Chinese
- `ar` - Arabic
- `ru` - Russian

And many more. See the [dayjs locale documentation](https://github.com/iamkun/dayjs/tree/dev/src/locale) for the complete list.

## Custom Translations

For more control over the text displayed in your calendar, you can provide a custom translations object. This allows you to translate button labels, view names, and other UI text.

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { Translations } from 'scope-inspect-calendar'

const frenchTranslations: Translations = {
  today: 'Aujourd\'hui',
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  year: 'Année',
  previous: 'Précédent',
  next: 'Suivant',
  create: 'Créer',
  edit: 'Modifier',
  delete: 'Supprimer',
  cancel: 'Annuler',
  // ... add all required translation keys
}

function TranslatedCalendar() {
  return (
    <ScopeInspectCalendar
      events={events}
      locale="fr"
      translations={frenchTranslations}
      firstDayOfWeek="monday"
    />
  )
}
```

## Translator Function

For dynamic translations or integration with existing i18n libraries, you can provide a translator function. This function receives a translation key and optional parameters, and should return the translated string.

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { TranslatorFunction, TranslationKey } from 'scope-inspect-calendar'

function TranslatorCalendar() {
  const translator: TranslatorFunction = (key: TranslationKey | string) => {
    const translations: Record<string, string> = {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      year: 'Année',
      previous: 'Précédent',
      next: 'Suivant',
      create: 'Créer',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      // ... add all required translations
    }

    return translations[key] || key
  }

  return (
    <ScopeInspectCalendar
      events={events}
      locale="fr"
      translator={translator}
      firstDayOfWeek="monday"
    />
  )
}
```

### Translator with Options

While the base `TranslatorFunction` type doesn't include options, you can extend it for more complex scenarios:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { TranslationKey } from 'scope-inspect-calendar'

function AdvancedTranslatorCalendar() {
  const translator = (key: TranslationKey | string, options?: { count?: number }) => {
    const translations: Record<string, string> = {
      today: 'Aujourd\'hui',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      year: 'Année',
      events: 'événements',
      event: 'événement',
      // ... other translations
    }

    // Handle pluralization
    if (options?.count !== undefined) {
      if (key === 'events' || key === 'event') {
        return options.count === 1 ? translations.event : translations.events
      }
    }

    return translations[key] || key
  }

  return (
    <ScopeInspectCalendar
      events={events}
      locale="fr"
      translator={translator as any}
      firstDayOfWeek="monday"
    />
  )
}
```

## Integration with i18n Libraries

You can easily integrate the calendar with popular i18n libraries like react-i18next, react-intl, or others.

### react-i18next Integration

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useTranslation } from 'react-i18next'
import type { TranslationKey } from 'scope-inspect-calendar'

function I18nCalendar() {
  const { t, i18n } = useTranslation()

  const translator = (key: TranslationKey | string) => {
    return t(`calendar.${key}`)
  }

  return (
    <ScopeInspectCalendar
      events={events}
      locale={i18n.language}
      translator={translator}
      firstDayOfWeek="monday"
    />
  )
}
```

### react-intl Integration

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useIntl } from 'react-intl'
import type { TranslationKey } from 'scope-inspect-calendar'

function IntlCalendar() {
  const intl = useIntl()

  const translator = (key: TranslationKey | string) => {
    return intl.formatMessage(
      { id: `calendar.${key}` },
      {}
    )
  }

  return (
    <ScopeInspectCalendar
      events={events}
      locale={intl.locale}
      translator={translator}
      firstDayOfWeek="monday"
    />
  )
}
```

### Next.js i18n Integration

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import { useRouter } from 'next/router'
import type { TranslationKey } from 'scope-inspect-calendar'
import translations from '../i18n/translations'

function NextI18nCalendar() {
  const router = useRouter()
  const { locale } = router

  const translator = (key: TranslationKey | string) => {
    return translations[locale]?.[key] || key
  }

  return (
    <ScopeInspectCalendar
      events={events}
      locale={locale}
      translator={translator}
      firstDayOfWeek={locale === 'en' ? 'sunday' : 'monday'}
    />
  )
}
```

## Available Translation Keys

The calendar supports a comprehensive set of translation keys for all UI elements including common actions, event properties, recurrence options, view types, days of the week, and months.

### Using TranslationKey Type

```tsx
import type { TranslationKey } from 'scope-inspect-calendar'

// The TranslationKey type includes all available keys:
// - Common actions: today, create, update, delete, cancel, export
// - Event related: event, events, title, description, location, allDay, etc.
// - Recurrence: repeat, daily, weekly, monthly, yearly, etc.
// - View types: month, week, day, year
// - Days of week: sunday, monday, tuesday, etc.
// - Months: january, february, march, etc.

const myTranslator = (key: TranslationKey) => {
  // Your translation logic here
  return translations[key] || key
}
```

### Complete Translation Keys List

The `Translations` interface includes all available keys:

#### Common Actions
- `today`, `create`, `new`, `update`, `delete`, `cancel`, `export`

#### Event Related
- `event`, `events`, `newEvent`, `title`, `description`, `location`, `allDay`
- `startDate`, `endDate`, `startTime`, `endTime`, `color`

#### Event Form
- `createEvent`, `editEvent`, `addNewEvent`, `editEventDetails`
- `eventTitlePlaceholder`, `eventDescriptionPlaceholder`, `eventLocationPlaceholder`

#### Recurrence
- `repeat`, `repeats`, `customRecurrence`
- `daily`, `weekly`, `monthly`, `yearly`
- `interval`, `repeatOn`, `never`, `count`, `every`, `ends`, `after`, `occurrences`, `on`

#### Recurrence Edit Dialog
- `editRecurringEvent`, `deleteRecurringEvent`
- `editRecurringEventQuestion`, `deleteRecurringEventQuestion`
- `thisEvent`, `thisEventDescription`
- `thisAndFollowingEvents`, `thisAndFollowingEventsDescription`
- `allEvents`, `allEventsDescription`
- `onlyChangeThis`, `changeThisAndFuture`, `changeEntireSeries`
- `onlyDeleteThis`, `deleteThisAndFuture`, `deleteEntireSeries`

#### View Types
- `month`, `week`, `day`, `year`, `more`

#### Resource Calendar
- `resources`, `resource`, `time`, `date`
- `noResourcesVisible`, `addResourcesOrShowExisting`

#### Days of Week
- `sunday`, `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`
- `sun`, `mon`, `tue`, `wed`, `thu`, `fri`, `sat` (short forms)

#### Months
- `january`, `february`, `march`, `april`, `may`, `june`
- `july`, `august`, `september`, `october`, `november`, `december`

## Types

TypeScript type definitions for internationalization features.

```typescript
// Translations object interface
interface Translations {
  today: string
  month: string
  week: string
  day: string
  year: string
  // ... many more keys (see complete list above)
}

// Translation key type (exported from package)
type TranslationKey = keyof Translations

// Translator function type
type TranslatorFunction = (key: TranslationKey | string) => string

// Example usage
const frenchTranslations: Translations = {
  today: 'Aujourd\'hui',
  month: 'Mois',
  week: 'Semaine',
  day: 'Jour',
  year: 'Année',
  // ... complete all required keys
}

const dynamicTranslator: TranslatorFunction = (key) => {
  // Custom translation logic
  return getTranslation(key)
}
```

## Best Practices

### Priority Order

When both `translations` and `translator` are provided, the translator function takes priority. Use this to your advantage:

- **Provide fallback translations** with the `translations` prop
- **Use `translator`** for dynamic or complex translation logic
- **The translator can fall back** to the static translations when needed

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { Translations, TranslatorFunction } from 'scope-inspect-calendar'

const fallbackTranslations: Translations = {
  today: 'Today',
  month: 'Month',
  // ... all keys as fallback
}

function SmartCalendar() {
  const translator: TranslatorFunction = (key) => {
    // Try dynamic translation first
    const dynamic = getDynamicTranslation(key)
    if (dynamic) return dynamic

    // Fall back to static translations
    return fallbackTranslations[key] || key
  }

  return (
    <ScopeInspectCalendar
      events={events}
      translations={fallbackTranslations}
      translator={translator}
    />
  )
}
```

### Performance

- **Memoize your translator function** to avoid unnecessary re-renders
- **Use static translations objects** when possible for better performance
- **Consider lazy loading translations** for large applications

```tsx
import { useMemo } from 'react'
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { TranslatorFunction } from 'scope-inspect-calendar'

function OptimizedCalendar() {
  const translator = useMemo<TranslatorFunction>(() => {
    return (key) => {
      // Expensive translation lookup
      return expensiveTranslationFunction(key)
    }
  }, [/* dependencies */])

  return (
    <ScopeInspectCalendar
      events={events}
      translator={translator}
    />
  )
}
```

### Locale Setup

- **Always set the `locale` prop** for proper date formatting
- **Consider setting `firstDayOfWeek`** based on locale conventions
- **Use appropriate timezone settings** for your users' locations

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'

function LocaleAwareCalendar() {
  // Detect user locale
  const userLocale = navigator.language || 'en'
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  // Set first day of week based on locale
  const firstDayOfWeek = userLocale.startsWith('en') ? 'sunday' : 'monday'

  return (
    <ScopeInspectCalendar
      events={events}
      locale={userLocale}
      timezone={userTimezone}
      firstDayOfWeek={firstDayOfWeek}
    />
  )
}
```

## Complete Example

Here's a complete example combining locale, translations, and translator function:

```tsx
import { ScopeInspectCalendar } from 'scope-inspect-calendar'
import type { Translations, TranslatorFunction } from 'scope-inspect-calendar'
import { useMemo } from 'react'

const spanishTranslations: Translations = {
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  year: 'Año',
  previous: 'Anterior',
  next: 'Siguiente',
  create: 'Crear',
  edit: 'Editar',
  update: 'Actualizar',
  delete: 'Eliminar',
  cancel: 'Cancelar',
  export: 'Exportar',
  event: 'Evento',
  events: 'Eventos',
  newEvent: 'Nuevo evento',
  title: 'Título',
  description: 'Descripción',
  location: 'Ubicación',
  allDay: 'Todo el día',
  startDate: 'Fecha de inicio',
  endDate: 'Fecha de fin',
  startTime: 'Hora de inicio',
  endTime: 'Hora de fin',
  color: 'Color',
  createEvent: 'Crear evento',
  editEvent: 'Editar evento',
  addNewEvent: 'Agregar nuevo evento',
  editEventDetails: 'Editar detalles del evento',
  eventTitlePlaceholder: 'Título del evento',
  eventDescriptionPlaceholder: 'Descripción del evento',
  eventLocationPlaceholder: 'Ubicación del evento',
  repeat: 'Repetir',
  repeats: 'Repite',
  customRecurrence: 'Recurrencia personalizada',
  daily: 'Diario',
  weekly: 'Semanal',
  monthly: 'Mensual',
  yearly: 'Anual',
  interval: 'Intervalo',
  repeatOn: 'Repetir en',
  never: 'Nunca',
  count: 'Cantidad',
  every: 'Cada',
  ends: 'Termina',
  after: 'Después de',
  occurrences: 'Ocurrencias',
  on: 'En',
  editRecurringEvent: 'Editar evento recurrente',
  deleteRecurringEvent: 'Eliminar evento recurrente',
  editRecurringEventQuestion: '¿Cómo desea editar este evento?',
  deleteRecurringEventQuestion: '¿Cómo desea eliminar este evento?',
  thisEvent: 'Solo este evento',
  thisEventDescription: 'Solo cambiar este evento',
  thisAndFollowingEvents: 'Este y siguientes eventos',
  thisAndFollowingEventsDescription: 'Cambiar este evento y todos los siguientes',
  allEvents: 'Todos los eventos',
  allEventsDescription: 'Cambiar toda la serie',
  onlyChangeThis: 'Solo cambiar este',
  changeThisAndFuture: 'Cambiar este y futuros',
  changeEntireSeries: 'Cambiar toda la serie',
  onlyDeleteThis: 'Solo eliminar este',
  deleteThisAndFuture: 'Eliminar este y futuros',
  deleteEntireSeries: 'Eliminar toda la serie',
  more: 'Más',
  resources: 'Recursos',
  resource: 'Recurso',
  time: 'Hora',
  date: 'Fecha',
  noResourcesVisible: 'No hay recursos visibles',
  addResourcesOrShowExisting: 'Agregar recursos o mostrar existentes',
  sunday: 'Domingo',
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sun: 'Dom',
  mon: 'Lun',
  tue: 'Mar',
  wed: 'Mié',
  thu: 'Jue',
  fri: 'Vie',
  sat: 'Sáb',
  january: 'Enero',
  february: 'Febrero',
  march: 'Marzo',
  april: 'Abril',
  may: 'Mayo',
  june: 'Junio',
  july: 'Julio',
  august: 'Agosto',
  september: 'Septiembre',
  october: 'Octubre',
  november: 'Noviembre',
  december: 'Diciembre',
}

function SpanishCalendar() {
  const translator = useMemo<TranslatorFunction>(() => {
    return (key) => {
      return spanishTranslations[key] || key
    }
  }, [])

  return (
    <ScopeInspectCalendar
      events={events}
      locale="es"
      timezone="Europe/Madrid"
      firstDayOfWeek="monday"
      translations={spanishTranslations}
      translator={translator}
    />
  )
}
```

## Related Documentation

- **[README.md](../../README.md)** - Main documentation index
- [Calendar Component API Reference](../api-reference/components/scope-inspect-calendar.md) - Component props including locale and translation props
- [Resource Calendar Component API Reference](../api-reference/components/scope-inspect-resource-calendar.md) - Resource calendar with i18n support
- [Translation Usage Reference](../translation-usage.md) - Additional translation examples

