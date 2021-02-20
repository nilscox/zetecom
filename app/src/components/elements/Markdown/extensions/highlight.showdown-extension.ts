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
        .replace(new RegExp(highlight, 'gi'), match => `<span class="highlighted">${match}</span>`)
        // undo replaced matches when it's inside a link's href
        .replace(
          /href="([^"]*)<span class="highlighted">([^"]*)<\/span>([^"]*)"/g,
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          (_match, p1, p2, p3) => `href="${p1}${p2}${p3}"`,
        )
    );
  },
};

export default sup;
