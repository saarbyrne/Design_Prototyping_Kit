/**
 * Stub for @kitman/common/src/utils/dateFormatter
 */
import dayjs from 'dayjs';

export function formatShort(date) {
  if (!date) return '';
  const d = dayjs(date);
  return d.isValid() ? d.format('DD/MM/YYYY') : String(date);
}
