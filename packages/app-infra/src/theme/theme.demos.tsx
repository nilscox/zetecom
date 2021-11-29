import { Demo } from '~/demos';

import { theme } from './theme';

type ColorProps = {
  text?: boolean;
  border?: boolean;
  name: string;
  color: string;
};

const Color: React.FC<ColorProps> = ({ text, border, name, color }) => (
  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12px 0' }}>
    {!text && (
      <>
        <div
          style={{ width: 68, height: 42, ...(border ? { border: `1px solid ${color}` } : { background: color }) }}
        />
        <div style={{ marginLeft: 24 }}>{name}</div>
      </>
    )}

    {text && <div style={{ color }}>{name}</div>}
  </div>
);

const colorsDemo: Demo = {
  render: () => (
    <>
      {Object.entries(theme.colors)
        .filter(([name]) => !name.startsWith('text'))
        .map(([name, color]) => (
          <Color key={name} border={name === 'border'} name={name} color={color} />
        ))}
    </>
  ),
};

const textColorsDemo: Demo = {
  description: 'Text colors',
  render: () => (
    <>
      {Object.entries(theme.colors)
        .filter(([name]) => name.startsWith('text'))
        .map(([name, color]) => (
          <Color key={name} text name={name} color={color} />
        ))}
    </>
  ),
};

export const Colors = { colorsDemo, textColorsDemo };

type FontProps = {
  name: string;
  font: string;
};

const Font: React.FC<FontProps> = ({ name, font }) => (
  <>
    <strong>{name}</strong>

    <p>
      <em>{font}</em>
    </p>

    <div key={font} style={{ fontFamily: font, margin: '24px 0' }}>
      <p style={{ margin: '6px 0', letterSpacing: 4 }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
      <p style={{ margin: '6px 0', letterSpacing: 4 }}>abcdefghijklmnopqrstuvwxyz</p>
      <p style={{ margin: '6px 0', letterSpacing: 4 }}>0123456789</p>
      <p>The jay, pig, fox, zebra and my wolves quack!</p>
    </div>
  </>
);

const fontsDemo: Demo = {
  render: () => (
    <>
      {Object.entries(theme.fonts)
        .filter(([name]) => !name.startsWith('text'))
        .map(([name, font]) => (
          <Font key={name} name={name} font={font} />
        ))}
    </>
  ),
};

export const Fonts = { fontsDemo };
