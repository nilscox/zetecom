import React from 'react';

type FlexProps = {
  children: React.ReactNode,
  flexDirection?: React.CSSProperties['flexDirection'],
  justifyContent?: React.CSSProperties['justifyContent'],
  alignItems?: React.CSSProperties['alignItems'],
  styles?: React.CSSProperties,
};

const Flex: React.FC<FlexProps> = ({ children, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: props.flexDirection,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
    }}
    {...props.styles}
  >
    { children }
  </div>
);

export default Flex;
