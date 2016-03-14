'use strict';
let colors = require('ansi-256-colors');

let codes = {
  10: { name: 'TRACE' },
  20: { name: 'DEBUG' },
  30: { name: 'INFO' },
  40: { name: colors.fg.getRgb(5, 1, 0) + 'WARN' + colors.reset},
  50: { name: colors.fg.getRgb(5, 0, 0) + 'ERROR' + colors.reset},
  60: { name: colors.fg.getRgb(1, 0, 0) + 'FATAL' + colors.reset}
};

module.exports = function stringifyLevel(level) {
  return codes[level].name;
};
