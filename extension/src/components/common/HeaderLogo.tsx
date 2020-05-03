import React from 'react';

import { useTheme } from 'src/utils/Theme';

type HeaderLogoProps = {
  className?: string;
};

const HeaderLogo: React.FC<HeaderLogoProps> = ({ className }) => {
  const { fontSizes, colors, sizes } = useTheme();

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }} className={className}>

      <img
        src="/assets/images/logo.png"
        alt="Logo de Réagir à l'information"
        style={{ width: 36, height: 36, opacity: 0.8, marginRight: sizes.big }}
      />

      <div>
        <h1 style={{ fontFamily: 'Domine', fontSize: fontSizes.title }}>Réagir à l'information</h1>
        <div style={{ color: colors.textLight, fontSize: fontSizes.small, letterSpacing: 4 }}>
          Avec esprit critique !
        </div>
      </div>

    </div>
  );
};

export default HeaderLogo;
