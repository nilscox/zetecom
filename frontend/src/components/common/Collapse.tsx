import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

declare const ResizeObserver: any;

const useResize = (ref: React.RefObject<any>) => {
  const [rect, setRect] = useState<any | null>(null);

  useEffect(() => {
    const ro = new ResizeObserver((entries: any) => {
      setRect(entries[0].contentRect);
    });

    ro.observe(ref.current);

    return () => ro.unobserve(ref.current);
  }, [ref.current]);

  return rect;
};

type CollapseProps = {
  open: boolean;
  innerMargin?: number;
  children: React.ReactNode;
};

const Collapse: React.FC<CollapseProps> = ({ open, innerMargin = 0, children }) => {
  const [props, set] = useSpring(() => ({ height: 0, config: { ...config.stiff, clamp: true } }));
  const ref = useRef(null);

  const rect = useResize(ref);

  const setHeight = () => {
    const height = ref.current.getBoundingClientRect().height + innerMargin;

    if (open)
      set({ height });
    else
      set({ height: 0 });
  };

  useEffect(setHeight, [open, set, rect && rect.height]);

  return (
    <animated.div style={{ ...props, overflow: 'hidden' }}>
      <div ref={ref}>{ children }</div>
    </animated.div>
  );
};

export default Collapse;

// wanna bypass collapse?
// export default ({ open, children }: any) => open ? children : null;
