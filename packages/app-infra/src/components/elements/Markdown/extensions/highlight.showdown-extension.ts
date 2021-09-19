import { ShowdownExtension } from 'showdown';

declare module 'showdown' {
  interface ConverterOptions {
    highlight?: string;
  }
}

const sup: ShowdownExtension = {
  type: 'output',
  filter: (text, _converter, options = {}) => {
    const { highlight } = options;

    if (!highlight) {
      return text;
    }

    return (
      text
        // surround matches with the .highlighted selector
        .replace(new RegExp(highlight, 'gi'), (match) => `<mark>${match}</mark>`)
        // undo replaced matches when it's inside a link's href
        .replace(
          /href="([^"]*)<mark>([^"]*)<\/mark>([^"]*)"/g,
          (_match, ...[p1, p2, p3]: string[]) => `href="${p1}${p2}${p3}"`,
        )
    );
  },
};

export default sup;
