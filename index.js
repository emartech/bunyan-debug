'use strict';
let Logger = require('./src/logger');
let isNamespaceEnabled = require('./src/enabled');

function logFactory(namespace) {
  return new Logger(namespace, isNamespaceEnabled(
    logFactory.getNamespaces(), namespace
  ));
}

logFactory.Logger = Logger;
logFactory.getNamespaces = function() {
  return process.env.DEBUG || '';
};

module.exports = logFactory;