/** @jsx jsx */
import { css, jsx, useTheme } from '@emotion/react';
import { useDebounce } from 'use-debounce';

type FadeProps = {
  in: boolean;
};

const Fade: React.FC<FadeProps> = ({ in: isVisible, children }) => {
  const theme = useTheme();
  const speed = theme.transitions.fast;
  const [isVisibleDebounced] = useDebounce(isVisible, Number(speed.replace(/ms$/, '')));

  return (
    <div
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
