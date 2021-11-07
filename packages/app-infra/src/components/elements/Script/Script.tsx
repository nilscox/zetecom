import { useEffect } from 'react';

type ScriptProps = {
  src: string;
};

export const Script: React.FC<ScriptProps> = ({ src }) => {
  useEffect(() => {
    const scripts = Array.from(document.body.getElementsByTagName('script'));

    if (scripts.some((script) => script.src === src)) {
      return;
    }

    const script = document.createElement('script');

    script.src = src;
    document.body.appendChild(script);
  }, []);

  return null;
};
