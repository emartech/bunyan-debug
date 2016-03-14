# bunyan-debug

Simple wrapper that combines the namespaces of [debug](https://github.com/visionmedia/debug) and the machine readable JSON format of [bunyan](https://github.com/trentm/node-bunyan).
Has the same logging levels and child creation as [bunyan](https://github.com/trentm/node-bunyan).

### Example

```
process.env.DEBUG = 'mongo';
let loggerFactory = require('bunyan-debug');
let mongoLogger = loggerFactory('mongo');
let redisLogger = loggerFactory('redis');
mongoLogger.info({domain: 'google'});
redisLogger.info({domain: 'yahoo'});
let childLogger = mongoLogger.child({domain: 'google'});
childLogger.error({reason: 'out of memory'});
```

will output

```
{"name":"mongo","hostname":"blacksonic-laptop","pid":19706,"level":30,"domain":"google","msg":"","time":"2015-10-17T12:58:45.444Z","v":0}
{"name":"mongo","domain":"google","hostname":"blacksonic-laptop","pid":19706,"level":50,"reason":"out of memory","msg":"","time":"2015-10-17T12:58:45.447Z","v":0}
```

More examples can be found in ```example.js```.

### Additional methods

##### fromError

Logs Javascript errors and adds fields describing it to the log (error_name, error_stack, error_message).

```
redisLogger.fromError(new Error('Unauthorized'), { problem: 'missmatch' });
```

will output

```
{"name":"redis","hostname":"blacksonic-thinkpad","pid":19595,"level":50,"error_name":"Error","error_stack":"Error: Unauthorized\n    at Object.<anonymous> (/home/blacksonic/workspace/bunyan-debug/example.js:20:23)\n    at Module._compile (module.js:410:26)\n    at Object.Module._extensions..js (module.js:417:10)\n    at Module.load (module.js:344:32)\n    at Function.Module._load (module.js:301:12)\n    at Function.Module.runMain (module.js:442:10)\n    at startup (node.js:136:18)\n    at node.js:966:3","error_message":"Unauthorized","problem":"missmatch","msg":"","time":"2016-03-14T13:46:22.073Z","v":0}
```

##### elapsedTime

Measures time spent in a promise, function or generator function and adds fields describing it to the log (elapsed_time in ms).
Also returns the return value of the function.

```
fileLogger.elapsedTime(
  promisify(fs.readFile)('./package.json', { encoding: 'utf8' }),
  { filename: 'package.json', action: 'stat' },
  function(result) {
    return { result_length: result.length };
  }
);
```

will output

```
{"name":"file","hostname":"blacksonic-thinkpad","pid":19595,"level":30,"elapsed_time":12,"filename":"package.json","action":"stat","result_length":911,"msg":"","time":"2016-03-14T13:46:22.090Z","v":0}
```

### Development

While developing JSON is not the most readable format.
To solve this a little command line formatter is also included which is very familiar to [debug](https://github.com/visionmedia/debug)'s output format.