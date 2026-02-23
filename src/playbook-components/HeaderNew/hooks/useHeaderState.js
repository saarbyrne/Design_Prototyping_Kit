// @flow
import { useState, useRef } from 'react';

type UseHeaderStateReturn = {|
  moreAnchorEl: ?HTMLElement,
  isMoreOpen: boolean,
  titleTooltipOpen: boolean,
  listItemTooltipId: ?string,
  attachmentTooltipId: ?string,
  badgesTooltipOpen: boolean,
  isInteractiveClickRef: { current: boolean },
  setTitleTooltipOpen: (boolean | ((boolean) => boolean)) => void,
  setListItemTooltipId: (?string | ((?string) => ?string)) => void,
  setAttachmentTooltipId: (?string | ((?string) => ?string)) => void,
  setBadgesTooltipOpen: (boolean | ((boolean) => boolean)) => void,
  handleMoreOpen: (SyntheticMouseEvent<HTMLElement>) => void,
  handleMoreClose: () => void,
  handleClickAway: (MouseEvent | TouchEvent) => void,
|};

export function useHeaderState(isMobile: boolean): UseHeaderStateReturn {
  const [moreAnchorEl, setMoreAnchorEl] = useState<?HTMLElement>(null);
  const isMoreOpen = Boolean(moreAnchorEl);

  const [titleTooltipOpen, setTitleTooltipOpen] = useState<boolean>(false);
  const [listItemTooltipId, setListItemTooltipId] = useState<?string>(null);
  const [attachmentTooltipId, setAttachmentTooltipId] = useState<?string>(null);
  const [badgesTooltipOpen, setBadgesTooltipOpen] = useState<boolean>(false);

  const isInteractiveClickRef = useRef<boolean>(false);

  const handleMoreOpen = (event: SyntheticMouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleClickAway = (event: MouseEvent | TouchEvent) => {
    if (!isMobile) return;

    if (isInteractiveClickRef.current) {
      isInteractiveClickRef.current = false;
      return;
    }

    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest('[role="tooltip"]')) return;

    setTitleTooltipOpen(false);
    setListItemTooltipId(null);
    setAttachmentTooltipId(null);
    setBadgesTooltipOpen(false);
  };

  return {
    moreAnchorEl,
    isMoreOpen,
    titleTooltipOpen,
    listItemTooltipId,
    attachmentTooltipId,
    badgesTooltipOpen,
    isInteractiveClickRef,
    setTitleTooltipOpen,
    setListItemTooltipId,
    setAttachmentTooltipId,
    setBadgesTooltipOpen,
    handleMoreOpen,
    handleMoreClose,
    handleClickAway,
  };
}
