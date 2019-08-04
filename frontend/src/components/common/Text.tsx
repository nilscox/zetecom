import React, { useMemo } from 'react';

import { Theme, useTheme } from 'src/utils/Theme';

type TextVariant =
  | 'main-title'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'subject-title'
  | 'subject-quote'
  | 'note'
  | 'button';

export type TextProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: TextVariant;
  size?: keyof Theme['fontSizes'];
  color?: keyof Theme['colors'];
  align?: React.CSSProperties['textAlign'];
  oneline?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const getStyles: (theme: Theme) => { [key in TextVariant]: React.CSSProperties } = theme => ({
  'main-title': {

  },
  title: {

  },
  subtitle: {

  },
  text: {

  },
  'subject-title': {
    fontSize: 18,
    fontWeight: 'bold',
  },
  'subject-quote': {

  },
  note: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textLight,
  },
  button: {
    fontWeight: 'bold',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
});

const onelineStyle: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
};

const Text: React.FC<TextProps> = ({
  variant = 'text',
  size,
  color,
  align,
  oneline,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const variantStyles = useMemo(() => getStyles(theme), [theme]);

  const styles: React.CSSProperties = {
    ...variantStyles[variant],
    ...(size && { fontSize: theme.fontSizes[size] }),
    ...(color && { color: theme.colors[color] }),
    ...(align && { textAlign: align }),
    ...(oneline && onelineStyle),
    ...style,
  };

  return (
    <div style={styles} {...props}>
      { children }
    </div>
  );
};

export default Text;
