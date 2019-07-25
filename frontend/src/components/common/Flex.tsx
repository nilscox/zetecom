import React from 'react';

import Box, { BoxProps } from './Box';

type FlexProps = BoxProps & {
  flexDirection?: React.CSSProperties['flexDirection'],
  justifyContent?: React.CSSProperties['justifyContent'],
  alignItems?: React.CSSProperties['alignItems'],
  style?: React.CSSProperties,
  children?: React.ReactNode,
};

const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  const { flexDirection, justifyContent, alignItems, style, ...other } = props;

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection,
        justifyContent,
        alignItems,
        ...style,
      }}
      {...other}
    >
      { children }
    </Box>
  );
}

export default Flex;
