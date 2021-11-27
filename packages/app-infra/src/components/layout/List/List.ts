import styled from '@emotion/styled';

import { Flex, FlexProps } from '../Flex/Flex';

type ListProps = FlexProps;

export const List = styled(Flex)<ListProps>();

List.defaultProps = {
  direction: 'column',
};
