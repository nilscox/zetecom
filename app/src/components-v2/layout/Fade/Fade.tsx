/** @jsx jsx */
import { css, jsx, useTheme } from '@emotion/react';
import { useDebounce } from 'use-debounce';

type FadeProps = {
  className?: string;
  in: boolean;
};

const Fade: React.FC<FadeProps> = ({ className, in: isVisible, children }) => {
  const theme = useTheme();
  const speed = theme.transitions.fast;
  const [isVisibleDebounced] = useDebounce(isVisible, Number(speed.replace(/ms$/, '')));

  return (
    <div
      className={className}
      css={css({
        opacity: isVisible ? 1 : 0,
        transition: `${speed} opacity ease`,
        visibility: isVisible || isVisibleDebounced ? 'visible' : 'hidden',
      })}
    >
      {children}
    </div>
  );
};

export default Fade;
