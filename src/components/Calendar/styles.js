// Calendar styles matching the original injuryprofiler.com implementation exactly
import { COLORS } from './constants';

const commonEventTextStyles = {
  borderRadius: '3px',
  width: '100%',
};

const eventTextOverflowStyles = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'space-between',
};

export const getEventTextStyles = ({
  backgroundColor,
  borderColor,
  textColor,
}) => ({
  dayGridMonth: {
    backgroundColor,
    border: `1px solid ${borderColor}`,
    color: textColor,
    ...eventTextOverflowStyles,
    ...commonEventTextStyles,
    justifyContent: 'start',
    alignItems: 'center',
  },
  listWeek: {
    borderColor,
    color: textColor,
    ...eventTextOverflowStyles,
    ...commonEventTextStyles,
  },
  default: {
    borderColor,
    color: textColor,
    ...commonEventTextStyles,
    title: {
      fontWeight: 600,
      fontSize: '12px',
      margin: 0,
    },
    calendarHeader: {
      display: 'flex',
      alignItems: 'center',
    },
    time: {
      fontWeight: 400,
      fontSize: '11px',
      margin: 0,
    },
  },
});

export const calendarStyles = {
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: 0,
    backgroundColor: 'var(--color-background-primary)',
    height: '100%',
    minHeight: 0,
  },
  filterButtonContainer: {
    paddingLeft: '1rem',
  },
  calendarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    minWidth: 0,
  },
  calendar: {
    width: '100%',
    minWidth: 0,
    flex: 1,
    minHeight: 0,
    backgroundColor: 'var(--color-background-primary)',
  },
};
