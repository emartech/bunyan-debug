'use strict';
let colorName = require('./color_name');
let stringifyLevel = require('./stringify_level');
let formatTime = require('./format_time');
let formatBody = require('./format_body');

module.exports = function(line) {
  let transformedLine;
  if (line.length) {
    try {
      let data = JSON.parse(line);

      if (data.hasOwnProperty('name') && data.hasOwnProperty('name')) {
        transformedLine = stringifyLevel(data.level) + ' ' + colorName(data.name) + ' ' + formatTime.elapsedTime(data.time) + ' ';

        transformedLine += formatBody(data);
      }
      else {
        transformedLine = line;
      }
    }
    catch (e) {
      transformedLine = line;
    }
  }
  else {
    transformedLine = line;
  }

  return transformedLine + '\n';
};
