'use strict';
process.env.DEBUG = 'mongo';
let loggerFactory = require('./index');

let mongoLogger = loggerFactory('mongo');
let redisLogger = loggerFactory('redis');

mongoLogger.info({domain: 'google'});
redisLogger.info({domain: 'yahoo'});

let childLogger = mongoLogger.child({domain: 'google'});
childLogger.error({reason: 'out of memory'});