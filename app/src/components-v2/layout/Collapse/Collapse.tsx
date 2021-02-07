/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';

import { jsx, useTheme } from '@emotion/react';

type CollapseProps = {
  in: boolean;
};

const Collapse: React.FC<CollapseProps> = ({ in: isOpen, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();
  const theme = useTheme();
  const speed = theme.transitions.slow;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    setHeight(ref.current.clientHeight);

    const observer = new MutationObserver(() => {
      setHeight(ref.current?.clientHeight);
    });

    observer.observe(ref.current, { attributes: true, subtree: true, childList: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      css={{
        height: isOpen ? height : 0,
        transition: `${speed} height ease`,
        overflow: 'hidden',
      }}
    >
      <div ref={ref}>{children}</div>
    </div>
  );
};

export default Collapse;
