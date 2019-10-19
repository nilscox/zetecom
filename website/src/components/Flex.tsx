import React from 'react';

import Box, { BoxProps } from './Box';

type FlexProps = BoxProps & {
  flex?: React.CSSProperties['flex'];
  flexDirection?: React.CSSProperties['flexDirection'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const Flex: React.FC<FlexProps> = ({ children, ...props }) => {
  const { flex, flexDirection, justifyContent, alignItems, style, ...other } = props;

  return (
    <Box
      style={{
        display: 'flex',
        flex,
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
};

export default Flex;
