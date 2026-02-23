// @flow

import { Fragment } from 'react';
import { convertPixelsToREM } from '@kitman/common/src/utils/css';
import { zIndices } from '@kitman/common/src/variables';
import { Stack } from '@kitman/playbook/components';
import Toast from './Toast';
import { MessageToastTranslated as MessageToast } from './MessageToast';
import { TOAST_TYPE } from './toastTypes';

type Props = {
  toasts: Array<{ id: string; type?: string; [key: string]: any }>,
  onCloseToast: (toastId: string) => void,
  onClickToastLink?: (toastLink: any) => void,
};

const Toasts = ({ toasts, onCloseToast, onClickToastLink }: Props) => {
  const renderToast = (toast) => {
    switch (toast.type) {
      case TOAST_TYPE.MESSAGE:
        return <MessageToast toast={toast} onClose={onCloseToast} />;
      case TOAST_TYPE.DEFAULT:
      default:
        return (
          <Toast
            toast={toast}
            onClose={onCloseToast}
            onLinkClick={onClickToastLink}
          />
        );
    }
  };

  return (
    <Stack
      sx={{
        position: 'fixed',
        bottom: convertPixelsToREM(24),
        right: convertPixelsToREM(24),
        zIndex: zIndices.toastDialog,
      }}
      spacing={1.5}
    >
      {[...toasts]
        .slice()
        .reverse()
        .map((toast) => (
          <Fragment key={toast.id}>{renderToast(toast)}</Fragment>
        ))}
    </Stack>
  );
};

export default Toasts;
