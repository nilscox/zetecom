import React from 'react';

const useResponsive = (breakpoint = 1000) => {
  const { innerWidth: width } = window;
  const isMobile = width < breakpoint;

  function choose<T = any>(options: { mobile: T; desktop: T }): T {
    if (isMobile)
      return options.mobile;

    return options.desktop;
  }

  const Choose: React.FC<{ mobile: React.ReactNode; desktop: React.ReactNode }> = (props) => <>{choose(props)}</>;

  return {
    isMobile,
    isDesktop: !isMobile,
    choose,
    Choose,
  };
};

export default useResponsive;
