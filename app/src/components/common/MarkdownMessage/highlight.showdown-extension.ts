import { ShowdownExtension } from 'showdown';

const sup: ShowdownExtension = {
  type: 'output',
  filter: (text, _converter, options) => {
    const { highlight } = options;

    if (!highlight)
      return text;

    return text
      // surround matches with the .highlighted selector
      .replace(
        new RegExp(highlight, 'gi'),
        match => `<span class="highlighted">${match}</span>`,
      )
      // undo replaced matches when it's inside a link's href
      .replace(
        /href="([^"]*)<span class="highlighted">([^"]*)<\/span>([^"]*)"/g,
        (_match, p1, p2, p3) => `href="${p1}${p2}${p3}"`,
      );
  },
};

export default sup;
