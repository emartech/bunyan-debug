'use strict';
let _ = require('lodash');

class Timer {
  constructor() {
    this.start = new Date().getTime();
  }

  elapsedTime() {
    let end = new Date().getTime();

    return end - this.start;
    //return _.round((elapsed / 1000), 2);
  }
}

module.exports = Timer;
