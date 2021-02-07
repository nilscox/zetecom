import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import { borderRadius, fontSize, fontWeight, size, spacing } from 'src/theme';

import Fade from '../../layout/Fade/Fade';

export { default as ConfirmDialog } from './ConfirmDialog';

export const DialogTitle = styled.div`
  font-size: ${fontSize('large')};
  font-weight: ${fontWeight('bold')};
`;

export const DialogContent = styled.div`
  margin: ${spacing(4, 0)};
`;

export const DialogActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Backdrop = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDialog = styled.div<{ open: boolean }>`
  min-width: ${size('large')};
  max-width: ${size('xlarge')};
  padding: ${spacing(4)};
  border-radius: ${borderRadius(2)};
  background-color: white;
  overflow: hidden;
`;

type DialogProps = {
  open: boolean;
  onClose?: () => void;
};

const Dialog: React.FC<DialogProps> = ({ open, onClose, children }) => {
  useEffect(() => {
    if (!open || !onClose) {
      return;
    }

    const handler = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <Fade in={open}>
      <Backdrop onClick={() => onClose?.()}>
        <StyledDialog open={open} onClick={e => e.stopPropagation()}>
          {children}
        </StyledDialog>
      </Backdrop>
    </Fade>
  );
};
export default Dialog;
