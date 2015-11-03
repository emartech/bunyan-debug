'use strict';
let Logger = require('../src/logger');
let bunyan = require('bunyan');

describe('Logger', function() {
  it('should call log info method when enabled', function() {
    let logger = new Logger('mongo', true);

    this.sandbox.stub(logger.log, 'info');
    logger.info('hi');

    expect(logger.log.info).to.have.been.calledWith('hi');
  });

  it('should not call log info method when disabled', function() {
    let logger = new Logger('mongo', false);

    this.sandbox.stub(logger.log, 'info');
    logger.info('hi');

    expect(logger.log.info).not.to.have.been.called;
  });

  it('should call bunyan with given parameters in constructor', function() {
    this.sandbox.stub(bunyan, 'createLogger');

    new Logger('mongo', true, {domain: 'google'});

    expect(bunyan.createLogger).to.have.been.calledWith({name: 'mongo', domain: 'google'});
  });

  it('should create child based on given options', function() {
    let logger = new Logger('mongo', true, {domain: 'google'});

    let childLogger = logger.child({source: 'request'});

    expect(childLogger).to.be.an.instanceOf(Logger);
    expect(childLogger.namespace).to.eql(logger.namespace);
    expect(childLogger.enabled).to.eql(logger.enabled);
    expect(childLogger.options).to.eql({domain: 'google', source: 'request'});
  })
});