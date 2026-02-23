/**
 * Stub for @kitman/common/src/utils/dateRange
 */
import dayjs from 'dayjs';

export function isDateInRange(date, rangeStart, rangeEnd) {
  if (!date || !rangeStart || !rangeEnd) return false;
  const d = dayjs(date);
  const start = dayjs(rangeStart);
  const end = dayjs(rangeEnd);
  return (d.isAfter(start) || d.isSame(start, 'day')) && (d.isBefore(end) || d.isSame(end, 'day'));
}
