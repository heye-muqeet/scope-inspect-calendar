import { describe, expect, it } from 'bun:test'
import {
  getVisibleHours,
  isVisibleHour,
  getVisibleHoursCount,
} from './visible-hours'
import type { VisibleHours } from '@/components/types'

describe('getVisibleHours', () => {
  it('should return all 24 hours when visibleHours is undefined', () => {
    const hours = getVisibleHours()
    expect(hours.length).toBe(24)
    expect(hours[0].hour()).toBe(0)
    expect(hours[23].hour()).toBe(23)
  })

  it('should return all 24 hours when startTime is 0 and endTime is 24', () => {
    const config: VisibleHours = {
      startTime: 0,
      endTime: 24,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(24)
  })

  it('should return only morning hours (0-12)', () => {
    const config: VisibleHours = {
      startTime: 0,
      endTime: 12,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(12)
    expect(hours[0].hour()).toBe(0)
    expect(hours[11].hour()).toBe(11)
  })

  it('should return only afternoon hours (12-24)', () => {
    const config: VisibleHours = {
      startTime: 12,
      endTime: 24,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(12)
    expect(hours[0].hour()).toBe(12)
    expect(hours[11].hour()).toBe(23)
  })

  it('should return work hours (9-17)', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(8)
    expect(hours[0].hour()).toBe(9)
    expect(hours[7].hour()).toBe(16)
  })

  it('should handle partial configuration (only startTime)', () => {
    const config: VisibleHours = {
      startTime: 6,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(18) // 6 to 24 (default endTime)
    expect(hours[0].hour()).toBe(6)
    expect(hours[17].hour()).toBe(23)
  })

  it('should handle partial configuration (only endTime)', () => {
    const config: VisibleHours = {
      endTime: 18,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(18) // 0 (default startTime) to 18
    expect(hours[0].hour()).toBe(0)
    expect(hours[17].hour()).toBe(17)
  })

  it('should clamp values to valid range (0-24)', () => {
    const config: VisibleHours = {
      startTime: -5,
      endTime: 30,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(24) // Clamped to 0-24
    expect(hours[0].hour()).toBe(0)
    expect(hours[23].hour()).toBe(23)
  })

  it('should handle empty range', () => {
    const config: VisibleHours = {
      startTime: 10,
      endTime: 10,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(0)
  })

  it('should handle startTime > endTime (invalid range)', () => {
    const config: VisibleHours = {
      startTime: 15,
      endTime: 10,
    }
    const hours = getVisibleHours(config)
    expect(hours.length).toBe(0) // No hours in invalid range
  })
})

describe('isVisibleHour', () => {
  it('should return true for all hours when visibleHours is undefined', () => {
    expect(isVisibleHour(0)).toBe(true)
    expect(isVisibleHour(12)).toBe(true)
    expect(isVisibleHour(23)).toBe(true)
  })

  it('should return true for hours within range', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    expect(isVisibleHour(9, config)).toBe(true)
    expect(isVisibleHour(12, config)).toBe(true)
    expect(isVisibleHour(16, config)).toBe(true)
  })

  it('should return false for hours before startTime', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    expect(isVisibleHour(8, config)).toBe(false)
    expect(isVisibleHour(0, config)).toBe(false)
  })

  it('should return false for hours at or after endTime', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    expect(isVisibleHour(17, config)).toBe(false)
    expect(isVisibleHour(18, config)).toBe(false)
    expect(isVisibleHour(23, config)).toBe(false)
  })

  it('should handle boundary conditions', () => {
    const config: VisibleHours = {
      startTime: 0,
      endTime: 24,
    }
    expect(isVisibleHour(0, config)).toBe(true)
    expect(isVisibleHour(23, config)).toBe(true)
    expect(isVisibleHour(24, config)).toBe(false) // 24 is out of range (0-23)
  })

  it('should return false for invalid hour values', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    expect(isVisibleHour(-1, config)).toBe(false)
    expect(isVisibleHour(25, config)).toBe(false)
  })

  it('should handle partial configuration (only startTime)', () => {
    const config: VisibleHours = {
      startTime: 6,
    }
    expect(isVisibleHour(5, config)).toBe(false)
    expect(isVisibleHour(6, config)).toBe(true)
    expect(isVisibleHour(23, config)).toBe(true)
  })

  it('should handle partial configuration (only endTime)', () => {
    const config: VisibleHours = {
      endTime: 18,
    }
    expect(isVisibleHour(0, config)).toBe(true)
    expect(isVisibleHour(17, config)).toBe(true)
    expect(isVisibleHour(18, config)).toBe(false)
  })
})

describe('getVisibleHoursCount', () => {
  it('should return 24 when visibleHours is undefined', () => {
    expect(getVisibleHoursCount()).toBe(24)
  })

  it('should return 24 when startTime is 0 and endTime is 24', () => {
    const config: VisibleHours = {
      startTime: 0,
      endTime: 24,
    }
    expect(getVisibleHoursCount(config)).toBe(24)
  })

  it('should return correct count for morning hours (0-12)', () => {
    const config: VisibleHours = {
      startTime: 0,
      endTime: 12,
    }
    expect(getVisibleHoursCount(config)).toBe(12)
  })

  it('should return correct count for afternoon hours (12-24)', () => {
    const config: VisibleHours = {
      startTime: 12,
      endTime: 24,
    }
    expect(getVisibleHoursCount(config)).toBe(12)
  })

  it('should return correct count for work hours (9-17)', () => {
    const config: VisibleHours = {
      startTime: 9,
      endTime: 17,
    }
    expect(getVisibleHoursCount(config)).toBe(8)
  })

  it('should handle partial configuration (only startTime)', () => {
    const config: VisibleHours = {
      startTime: 6,
    }
    expect(getVisibleHoursCount(config)).toBe(18) // 6 to 24 (default endTime)
  })

  it('should handle partial configuration (only endTime)', () => {
    const config: VisibleHours = {
      endTime: 18,
    }
    expect(getVisibleHoursCount(config)).toBe(18) // 0 (default startTime) to 18
  })

  it('should return 0 for empty range', () => {
    const config: VisibleHours = {
      startTime: 10,
      endTime: 10,
    }
    expect(getVisibleHoursCount(config)).toBe(0)
  })

  it('should return 0 for invalid range (startTime > endTime)', () => {
    const config: VisibleHours = {
      startTime: 15,
      endTime: 10,
    }
    expect(getVisibleHoursCount(config)).toBe(0)
  })

  it('should clamp values to valid range (0-24)', () => {
    const config: VisibleHours = {
      startTime: -5,
      endTime: 30,
    }
    expect(getVisibleHoursCount(config)).toBe(24) // Clamped to 0-24
  })
})
