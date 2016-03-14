'use strict';
let Timer = require('./timer');
let isPromise = require('is-promise');
let isGeneratorFunction = require('is-generator').fn;
let isFunction = require('is-function');
let co = require('co');

class ElapsedTime {
  constructor(logger) {
    this.logger = logger;
  }

  measure(func, options, callback) {
    let opts = options || {};

    if (isPromise(func)) {
      return this._measurePromise(func, opts, callback);
    } else if (isGeneratorFunction(func)) {
      return this._measurePromise(co(func), opts, callback);
    } else if (isFunction(func)) {
      return this._measureFunction(func, opts, callback);
    } else {
      throw new Error('Can only measure functions, promises and generator functions');
    }
  }

  _measurePromise(func, options, callback) {
    let timer = new Timer();

    return func.then(
      (result) => {
        let additionalOptions = callback ? callback(result) : {};

        this.logger.info(
          Object.assign(
            { elapsed_time: timer.elapsedTime() },
            options,
            additionalOptions
          )
        );

        return result;
      },
      (error) => {
        this.logger.fromError(
          error,
          Object.assign(
            { elapsed_time: timer.elapsedTime() },
            options
          )
        );

        throw error;
      }
    );
  }

  _measureFunction(func, options, callback) {
    let timer = new Timer();

    try {
      let result = func();
      let additionalOptions = callback ? callback(result) : {};

      this.logger.info(
        Object.assign(
          { elapsed_time: timer.elapsedTime() },
          options,
          additionalOptions
        )
      );

      return result;
    } catch(error) {
      this.logger.fromError(
        error,
        Object.assign(
          { elapsed_time: timer.elapsedTime() },
          options
        )
      );

      throw error;
    }
  }
}

module.exports = ElapsedTime;
