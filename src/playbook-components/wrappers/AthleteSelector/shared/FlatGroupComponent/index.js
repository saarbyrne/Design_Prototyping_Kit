// @flow
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import i18n from '@kitman/common/src/utils/i18n';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useMemo } from 'react';
import { collectAthleteIds } from '../utils';
import { type AthleteSelectorVariant, type Group } from '../types';

type Props = {
  variant: AthleteSelectorVariant,
  group: Group,
  selectedIds: Set<number>,
  setSelectedIds: (updater: (prev: Set<number>) => Set<number>) => void,
  setPath: (updater: (prev: Group[]) => Group[]) => void,
  renderActions?: () => React$Node,
  renderLeftActions?: () => React$Node,
  disableSelectAll?: boolean,
  hideSelectAll?: boolean,
  lockedAthleteIds?: Set<number>,
};

const stylesByVariant = {
  dropdown: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1,
      borderRadius: 1,
      px: 2,
      cursor: 'pointer',
      '&:hover': { bgcolor: 'action.hover' },
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    subtitle: { fontSize: '12px' },
    selector: { fontWeight: 'semibold', minWidth: 80 },
    title: {},
  },
  panel: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1,
      borderRadius: 1,
      px: 2,
      cursor: 'pointer',
      '&:hover': { bgcolor: 'action.hover' },
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    subtitle: { fontSize: '14px' },
    selector: { fontWeight: 400, fontSize: '14px', minWidth: 80 },
    title: { fontSize: '16px', fontWeight: 400 },
  },
  drawer: {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 1,
      borderRadius: 1,
      px: 2,
      cursor: 'pointer',
      '&:hover': { bgcolor: 'action.hover' },
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    subtitle: { fontSize: '14px' },
    selector: { fontWeight: 400, fontSize: '14px', minWidth: 80 },
    title: { fontSize: '16px', fontWeight: 400 },
  },
};

const FlatGroupComponent = ({
  variant = 'panel',
  group,
  setPath,
  selectedIds,
  setSelectedIds,
  renderActions,
  renderLeftActions,
  disableSelectAll = false,
  hideSelectAll = false,
  lockedAthleteIds = new Set(),
}: Props) => {
  const allAthleteIds = useMemo(() => {
    return collectAthleteIds(group);
  }, [group]);

  // Filter out locked athletes when determining if all are selected
  const selectableAthleteIds = useMemo(() => {
    return allAthleteIds.filter((id) => !lockedAthleteIds.has(id));
  }, [allAthleteIds, lockedAthleteIds]);

  const isAllSelected =
    selectableAthleteIds.length > 0 &&
    selectableAthleteIds.every((id) => selectedIds.has(id));

  const selectedCount = allAthleteIds.filter((id) =>
    selectedIds.has(id)
  ).length;

  const handleSelectToggle = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation();
    setSelectedIds((prev) => {
      const updated = new Set(prev);
      // Only toggle selectable athletes (not locked ones)
      selectableAthleteIds.forEach((id) => {
        if (isAllSelected) updated.delete(id);
        else updated.add(id);
      });
      return updated;
    });
  };

  const handleGroupClick = () => setPath((prev) => [...prev, group]);

  const styles = stylesByVariant[variant];

  return (
    <Box key={group.key} onClick={handleGroupClick} sx={styles.container}>
      {renderLeftActions && renderLeftActions()}
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <Box sx={styles.textWrapper}>
          <Typography variant="body2" sx={styles.title}>{`${group.title} ${
            selectedCount ? `(${selectedCount})` : ''
          }`}</Typography>
          {group.subtitle && (
            <Typography variant="body2" sx={styles.subtitle}>
              {group.subtitle}
            </Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderActions && renderActions()}
          {!hideSelectAll && (
            <Button
              size="medium"
              variant="text"
              onClick={handleSelectToggle}
              disabled={disableSelectAll || selectableAthleteIds.length === 0}
              sx={styles.selector}
            >
              {isAllSelected ? i18n.t('Clear all') : i18n.t('Select all')}
            </Button>
          )}
        </Box>
      </Box>
      <ChevronRightIcon fontSize="small" />
    </Box>
  );
};

export default FlatGroupComponent;
