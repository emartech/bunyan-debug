'use strict';
let bunyan = require('bunyan');
let _ = require('lodash');
let logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

class Logger {
  constructor(namespace, enabled, options) {
    this.namespace = namespace;
    this.enabled = enabled;
    this.options = options;
    this.log = bunyan.createLogger(_.extend({name: this.namespace}, options));
  }

  child(options) {
    return new Logger(this.namespace, this.enabled, _.extend({}, this.options, options));
  }
}

logLevels.forEach(function(level) {
  Logger.prototype[level] = function() {
    if (!this.enabled) {
      return;
    }

    let args = Array.prototype.slice.call(arguments);
    this.log[level].apply(this.log, args);
  }
});

module.exports = Logger;