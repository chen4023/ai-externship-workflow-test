import { describe, it, expect, vi, afterEach } from 'vitest';
import { formatRelativeTime } from './formatRelativeTime';

describe('formatRelativeTime', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return "방금 전" for dates less than 1 minute ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:00:30'));
    expect(formatRelativeTime('2025-03-10 12:00:00')).toBe('방금 전');
  });

  it('should return "N분 전" for dates less than 1 hour ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T12:30:00'));
    expect(formatRelativeTime('2025-03-10 12:00:00')).toBe('30분 전');
  });

  it('should return "N시간 전" for dates less than 24 hours ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-10T15:00:00'));
    expect(formatRelativeTime('2025-03-10 12:00:00')).toBe('3시간 전');
  });

  it('should return "N일 전" for dates less than 30 days ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-03-15T12:00:00'));
    expect(formatRelativeTime('2025-03-10 12:00:00')).toBe('5일 전');
  });

  it('should return "N개월 전" for dates less than 12 months ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2025-06-10T12:00:00'));
    expect(formatRelativeTime('2025-03-10 12:00:00')).toBe('3개월 전');
  });

  it('should return localized date for dates more than 12 months ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-10T12:00:00'));
    const result = formatRelativeTime('2025-03-10 12:00:00');
    expect(result).toMatch(/2025/);
  });
});
