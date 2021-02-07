Colors

```tsx
import { useTheme } from '@emotion/react';

const Color = ({ border, name, color }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '12px 0' }}>
      <div style={{ width: 68, height: 42, ...(border ? { border: `1px solid ${color}` } : { background: color }) }} />
      <div style={{ marginLeft: 24 }}>{name}</div>
    </div>
  );
};

const theme = useTheme();

<>
  <div>
    {Object.entries(theme.colors).map(([name, color]) => (
      <Color border={name === 'border'} name={name} color={color} />
    ))}
  </div>
</>;
```

Text colors

```tsx
import { useTheme } from '@emotion/react';

const TextColor = ({ bold, name, color }) => {
  return (
    <div
      style={{
        height: 42,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '12px 0',
        color,
        fontWeight: bold ? 'bold' : 'initial',
      }}
    >
      {name}
    </div>
  );
};

const theme = useTheme();

<>
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div style={{ flex: 1 }}>
      {Object.entries(theme.textColors).map(([name, color]) => (
        <TextColor name={name} color={color} />
      ))}
    </div>
    <div style={{ flex: 1 }}>
      {Object.entries(theme.textColors).map(([name, color]) => (
        <TextColor bold name={name} color={color} />
      ))}
    </div>
  </div>
</>;
```

Fonts

```tsx
import { useTheme } from '@emotion/react';

const Font = ({ fontFamily, fontSize, fontWeight }) => (
  <div key={fontFamily} style={{ fontFamily, fontSize, margin: '24px 0', letterSpacing: 4, fontWeight }}>
    <p style={{ margin: '6px 0' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
    <p style={{ margin: '6px 0' }}>abcdefghijklmnopqrstuvwxyz</p>
    <p style={{ margin: '6px 0' }}>0123456789</p>
  </div>
);

const theme = useTheme();
const fontSize = theme.fontSizes.large;
const fontWeight = theme.fontWeights.default;

<>
  {Object.entries(theme.fonts).map(([name, fontFamily]) => (
    <div key={name} style={{ marginTop: 6 }}>
      <div>
        {name}: <code>{fontFamily}</code>
      </div>
      <Font fontFamily={fontFamily} fontSize={fontSize} fontWeight={fontWeight} />
    </div>
  ))}
</>;
```
