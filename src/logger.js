'use strict';
let bunyan = require('bunyan');
let _ = require('lodash');
let ElapsedTime = require('./elapsed_time');
let logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];

class Logger {
  constructor(namespace, enabled, options) {
    this.namespace = namespace;
    this.enabled = enabled;
    this.options = options;
    this.log = bunyan.createLogger(_.extend({name: this.namespace}, options));
    this.timer = new ElapsedTime(this);
  }

  child(options) {
    return new Logger(this.namespace, this.enabled, _.extend({}, this.options, options));
  }

  fromError(error, options) {
    let opts = options || {};

    this.error(Object.assign({
      error_name: error.name,
      error_stack: error.stack,
      error_message: error.message
    }, opts));
  }

  elapsedTime(func, options, callback) {
    return this.timer.measure(func, options, callback);
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
