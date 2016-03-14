'use strict';
process.env.DEBUG = 'mongo,redis,file';
let loggerFactory = require('./index');
let promisify = require('es6-promisify');
let fs = require('fs');

let mongoLogger = loggerFactory('mongo');
let redisLogger = loggerFactory('redis');
let fileLogger = loggerFactory('file');
let webLogger = loggerFactory('web');

// simple info logging with enabled namespace
mongoLogger.info({domain: 'google'});
redisLogger.info({domain: 'yahoo'});

// not enabled
webLogger.info({ request: 'healtcheck' });

// error objects
redisLogger.fromError(new Error('Unauthorized'), { problem: 'missmatch' });

// child loggers
let childLogger = mongoLogger.child({domain: 'google'});
childLogger.error({reason: 'out of memory'});

// elapsed time with promise, returns result
fileLogger.elapsedTime(
  promisify(fs.stat)('./package.json'), { filename: 'package.json', action: 'stat' }
).then(function(result) {
  console.log(result);
});

// elapsed with callback to provide additional options
fileLogger.elapsedTime(
  promisify(fs.readFile)('./package.json', { encoding: 'utf8' }),
  { filename: 'package.json', action: 'stat' },
  function(result) {
    return { result_length: result.length };
  }
);

// elapsed time with rejected promise
fileLogger.elapsedTime(
  promisify(fs.stat)('./nonexistent.json')
);

// elapsed time with generator function
fileLogger.elapsedTime(
  function*() {
    return yield promisify(fs.readFile)('./package.json', { encoding: 'utf8' });
  },
  { filename: 'package.json', action: 'readfile' }
);

// elapsed time with simple function
fileLogger.elapsedTime(
  function() {
    let numbers = [];
    for (let i = 0; i < 1000; i++) {
      numbers.push(i);
    }
    return numbers;
  },
  { action: 'numbers' }
);
