// @flow
import type { Node } from 'react';

import { Box, Chip, Stack, Tooltip } from '@kitman/playbook/components';
import type { Badge } from '../types';


type BadgesSectionOwnProps = {|
  visibleBadges: Array<Badge>,
  overflowBadges: Array<Badge>,
  isMobile: boolean,
  badgesTooltipOpen: boolean,
  setBadgesTooltipOpen: ((boolean => boolean) | boolean) => void,
  isInteractiveClickRef: { current: boolean },
|};

type BadgesSectionProps = BadgesSectionOwnProps;

function BadgesSection(props: BadgesSectionProps): Node {
  const {
    visibleBadges,
    overflowBadges,
    isMobile,
    badgesTooltipOpen,
    setBadgesTooltipOpen,
    isInteractiveClickRef,
  } = props;

  const renderOverflowTooltip = () => (
    <Box sx={{ py: 0.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {overflowBadges.map((badge) => (
        <Stack key={badge.id} direction="row" spacing={1} alignItems="center">
          <Chip
            label={badge.label}
            color={badge.color || 'default'}
            icon={badge.icon}
            size="small"
          />
        </Stack>
      ))}
    </Box>
  );

  return (
    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
      {visibleBadges.map((badge) => (
        <Chip
          key={badge.id}
          label={badge.label}
          color={badge.color || 'default'}
          icon={badge.icon}
          size="small"
        />
      ))}

      {overflowBadges.length > 0 &&
        (isMobile ? (
          <Box
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isInteractiveClickRef.current = true;
              setBadgesTooltipOpen((prev) => !prev);
            }}
            sx={{ cursor: 'pointer', display: 'inline-block' }}
          >
            <Tooltip
              title={renderOverflowTooltip()}
              placement="bottom"
              open={badgesTooltipOpen}
              onClose={() => setBadgesTooltipOpen(false)}
              disableHoverListener
              disableFocusListener
              disableTouchListener
            >
              <span>
                <Chip label={`+${overflowBadges.length}`} size="small" />
              </span>
            </Tooltip>
          </Box>
        ) : (
          <Tooltip title={renderOverflowTooltip()} placement="bottom">
            <span>
              <Chip label={`+${overflowBadges.length}`} size="small" />
            </span>
          </Tooltip>
        ))}
    </Stack>
  );
}

export default BadgesSection;