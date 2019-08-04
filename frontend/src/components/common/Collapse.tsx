import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useSpring, animated, config } from 'react-spring';

type CollapseProps = {
  open: boolean;
  innerMargin?: number;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ open, innerMargin = 0, children }) => {
  const [props, set] = useSpring(() => ({ height: 0, config: { ...config.stiff, clamp: true } }));
  const ref = useRef(null);

  const setHeight = () => {
    const height = ref.current.getBoundingClientRect().height + innerMargin;

    if (open)
      set({ height });
    else
      set({ height: 0 });
  };

  useEffect(setHeight, [open, set]);
  useLayoutEffect(setHeight);

  return (
    <animated.div style={{ ...props, overflow: 'hidden' }}>
      <div ref={ref}>{ children }</div>
    </animated.div>
  );
};

export default Collapse;
