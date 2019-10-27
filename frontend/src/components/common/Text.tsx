import React, { useMemo } from 'react';

import { Theme, useTheme } from 'src/utils/Theme';

type TextVariant =
  | 'main-title'
  | 'title'
  | 'subtitle'
  | 'text'
  | 'error'
  | 'note'
  | 'button';

export type TextProps = Omit<React.HTMLProps<HTMLDivElement>, 'size'> & {
  variant?: TextVariant;
  size?: keyof Theme['fontSizes'] | number;
  color?: keyof Theme['colors'];
  align?: React.CSSProperties['textAlign'];
  bold?: boolean;
  uppercase?: boolean;
  ellipsis?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const getStyles: (theme: Theme) => { [key in TextVariant]: React.CSSProperties } = theme => ({
  'main-title': {

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  subtitle: {
    color: theme.colors.textLight,
    fontSize: 22,
  },
  text: {
    color: theme.colors.text,
  },
  error: {
    fontSize: theme.fontSizes.small,
    color: theme.colors.textWarning,
    fontWeight: 'bold',
  },
  note: {
    fontSize: theme.fontSizes.note,
    color: theme.colors.textLight,
  },
  button: {
    fontWeight: 'bold',
    color: theme.colors.textLight,
    textTransform: 'uppercase',
    cursor: 'pointer',
  },
});

const Text: React.FC<TextProps> = ({
  variant = 'text',
  size,
  color,
  align,
  bold,
  uppercase,
  ellipsis,
  style,
  children,
  ...props
}) => {
  const theme = useTheme();
  const variantStyles = useMemo(() => getStyles(theme), [theme]);
  const fontSize = typeof size === 'string' ? theme.fontSizes[size] : size + 'px';

  if (ellipsis && typeof children === 'string' && children.length > ellipsis)
    children = children.substr(0, ellipsis) + '...';

  const styles: React.CSSProperties = {
    ...variantStyles[variant],
    ...(size && { fontSize }),
    ...(color && { color: theme.colors[color] }),
    ...(align && { textAlign: align }),
    ...(bold && { fontWeight: 'bold' }),
    ...(uppercase && { textTransform: 'uppercase' }),
    ...style,
  };

  return (
    <span style={styles} {...props}>
      { children }
    </span>
  );
};

export default Text;
