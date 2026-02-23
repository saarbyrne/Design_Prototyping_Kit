// @flow
import type { Node } from 'react';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
} from '@kitman/playbook/components';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { HeaderAction, ActionComponentProps } from '../types';
import { MENU_ANCHOR_ORIGIN, MENU_TRANSFORM_ORIGIN } from '../constants';

type ActionsMenuProps = {|
  generalActions: $ReadOnlyArray<HeaderAction<ActionComponentProps>>,
  exportActions: $ReadOnlyArray<HeaderAction<ActionComponentProps>>,
  anchorEl: ?HTMLElement,
  isOpen: boolean,
  onOpen: (SyntheticMouseEvent<HTMLElement>) => void,
  onClose: () => void,
  onItemClick: (HeaderAction<ActionComponentProps>) => void,
|};

export function ActionsMenu(props: ActionsMenuProps): Node {
  const {
    generalActions,
    exportActions,
    anchorEl,
    isOpen,
    onOpen,
    onClose,
    onItemClick,
  } = props;

  return (
    <>
      <IconButton size="small" onClick={onOpen}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        anchorOrigin={MENU_ANCHOR_ORIGIN}
        transformOrigin={MENU_TRANSFORM_ORIGIN}
      >
        {generalActions.map((action) => (
          <MenuItem
            key={action.id}
            disabled={action.disabled}
            onClick={() => onItemClick(action)}
          >
            {action.label}
          </MenuItem>
        ))}

        {generalActions.length > 0 && exportActions.length > 0 && <Divider />}

        {exportActions.map((action) => (
          <MenuItem
            key={action.id}
            disabled={action.disabled}
            onClick={() => onItemClick(action)}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
