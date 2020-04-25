import { ShowdownExtension } from "showdown";

const sup: ShowdownExtension = {
  type: 'lang',
  regex: /\^(\d+([,.]\d+)?)/g,
  replace: '<sup>$1</sup>',
};

export default sup;
