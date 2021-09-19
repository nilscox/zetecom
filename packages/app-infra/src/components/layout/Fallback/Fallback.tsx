import styled from '@emotion/styled';

import { fontWeight } from '~/theme';

import { Flex } from '../Flex/Flex';

type FallbackProps = {
  minHeight?: number;
};

export const Fallback = styled(Flex)<FallbackProps>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: ${fontWeight('medium')};
  min-height: ${({ minHeight }) => minHeight ?? 140}px;
`;
