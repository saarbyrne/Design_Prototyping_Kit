// @flow
import type { Node, ComponentType } from 'react';
import type {
  EventAttachment as Attachment,
  EventLink as AttachedLink,
} from '@kitman/common/src/types/Event';

export type ActionComponentProps = {
  [string]: mixed,
};

export type HeaderAction<TProps: ActionComponentProps = ActionComponentProps> =
  {|
    id: string,
    label: string,
    onClick: () => void,
    disabled?: boolean,
    component?: ComponentType<TProps>,
    props?: TProps,
  |};

export type Badge = {|
  id: string,
  label: string,
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning',
  icon?: Node,
|};

export type ListItem = {|
  id: string,
  label: string,
  value: string,
|};

export type HeaderNewProps = {|
  title: string,
  onBackClick?: () => void,
  showBackButton?: boolean,
  showAvatar?: boolean,
  avatarSrc?: string,
  avatarAlt?: string,
  listItems?: Array<ListItem>,
  showListItems?: boolean,
  badges?: Array<Badge>,
  showBadges?: boolean,
  primaryAction?: HeaderAction<>,
  secondaryAction?: HeaderAction<>,
  tertiaryAction?: HeaderAction<>,
  moreActions?: Array<HeaderAction<>>,
  exportActions?: Array<HeaderAction<>>,
  isAvailableToExport?: boolean,
  showActions?: boolean,
  attachments?: Array<Attachment>,
  attachedLinks?: Array<AttachedLink>,
  showAttachments?: boolean,
|};
