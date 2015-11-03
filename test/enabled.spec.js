'use strict';
let isNamespaceEnabled = require('../src/enabled');

describe('isNamespaceAvailable', function() {
  it('should enable when variables only contain one', function() {
    expect(isNamespaceEnabled(
      'mongo', 'mongo'
    )).to.eql(true);
  });

  it('should disable when not in availables', function() {
    expect(isNamespaceEnabled(
      'mongo', 'redis'
    )).to.eql(false);
  });

  it('should enable when part of available and available contains *', function() {
    expect(isNamespaceEnabled(
      'mongo*', 'mongolab'
    )).to.eql(true);
  });

  it('should allow multiple available namespaces', function() {
    let availableNamespaces = 'mongo,redis';

    expect(isNamespaceEnabled(
      availableNamespaces, 'mongo'
    )).to.eql(true);
    expect(isNamespaceEnabled(
      availableNamespaces, 'redis'
    )).to.eql(true);
  });

  it('should disable names starting with -', function() {
    expect(isNamespaceEnabled(
      'mongo*,-*lab', 'mongolab'
    )).to.eql(false);
  });

  it('should not work with empty strings', function() {
    expect(isNamespaceEnabled(
      '', ''
    )).to.eql(false);
  });
});