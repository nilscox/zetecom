import styled from '@emotion/styled';

import { color, fontSize, fontWeight, spacing } from '~/theme';

type FormErrorProps = {
  error?: React.ReactNode;
  consistentHeight?: boolean;
};

export const FormError: React.FC<FormErrorProps> = ({ error, consistentHeight }) => {
  if (!error && !consistentHeight) {
    return null;
  }

  return <StyledError>{error || <>&nbsp;</>}</StyledError>;
};

export const StyledError = styled.div`
  margin-top: ${spacing(0.5)};
  color: ${color('error')};
  font-size: ${fontSize(0)};
  font-weight: ${fontWeight('medium')};
`;
