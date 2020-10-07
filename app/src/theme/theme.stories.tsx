import React, { CSSProperties } from 'react';

import { Theme, Typography, useTheme } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import { boolean, number, select } from '@storybook/addon-knobs';

export default {
  title: 'Theme',
};

const fontWeights: Record<string, number> = {
  light: 200,
  normal: 400,
  bold: 700,
};

const Color: React.FC<{ border?: boolean, name: string, color: string }> = ({ border, name, color }) => {
  const { spacing } = useTheme();

  return (
    <div style={{ width: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', margin: spacing(4, 0) }}>
      <div style={{ width: 68, height: 42, ...(border ? { border: `1px solid ${color}` } : { background: color }) }} />
      <Typography style={{ marginLeft: spacing(2), color }}>
        {name}
      </Typography>
    </div>
  );
};

export const Colors = () => {
  const { palette } = useTheme<Theme>();

  return (
    <>
      <Color name="primary light" color={palette.primary.light} />
      <Color name="primary main" color={palette.primary.main} />
      <Color name="primary dark" color={palette.primary.dark} />
      <Color name="secondary light" color={palette.secondary.light} />
      <Color name="secondary main" color={palette.secondary.main} />
      <Color name="secondary dark" color={palette.secondary.dark} />
      <Color border name="border" color={palette.border.main} />
      <Color name="selected" color={palette.selected.main} />
      <Color name="text primary" color={palette.text.primary} />
      <Color name="text secondary" color={palette.text.secondary} />
      <Color name="text link" color={palette.text.link} />
      <Color name="text linkFocus" color={palette.text.linkFocus} />
    </>
  );
};

export const Fonts = () => {
  const fonts = ['Noticia Text', 'Nunito Sans'];
  const fontSize = number('font-size', 22, { min: 6, max: 72 });
  const fontWeight = select<CSSProperties['fontWeight']>('font-weight', fontWeights, 400);
  const italic = boolean('italic', false);
  const { palette, spacing } = useTheme<Theme>();

  return (
    <>
      {fonts.map(fontFamily => (
        <div key={fontFamily} style={{ fontFamily, fontSize, color: palette.text.primary, margin: '24px 0' }}>
          <div>{fontFamily}</div>
          <div style={{ letterSpacing: 4, fontWeight, fontStyle: italic ? 'italic' : 'normal' }}>
            <p style={{ margin: spacing(1, 0) }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p style={{ margin: spacing(1, 0) }}>abcdefghijklmnopqrstuvwxyz</p>
            <p style={{ margin: spacing(1, 0) }}>0123456789</p>
          </div>
        </div>
      ))}
    </>
  );
};

const Typo: React.FC<{ variant: Variant }> = ({ variant, children }) => {
  const { spacing } = useTheme();

  return (
    <div style={{ margin: spacing(4, 0) }}>
      <Typography variant={variant}>{children}</Typography>
    </div>
  );
};

export const Typographies = () => {
  return (
    <>
      <Typo variant="h1">heading 1</Typo>
      <Typo variant="h2">heading 2</Typo>
      <Typo variant="body1">body 1</Typo>
      <Typo variant="body2">body 2</Typo>
      <Typo variant="caption">caption</Typo>
      <Typo variant="button">button</Typo>
    </>
  );
};
