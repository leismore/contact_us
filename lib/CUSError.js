/**
 * CUSError is the Error class for this project
 *
 * @param {string}       message             - Human-readable text
 * @param {string}       code                - Machine-readable code
 * @param {string}       [statusCode = null] - HTTP status code
 * @param {Error object} [previous   = null] - The previous Error object
 */

'use strict';

module.exports = class CUSError extends Error {

  constructor(message, code, statusCode=null, previous=null)
  {
    super(message);

    // V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CUSError);
    }

    this.code       = code;
    this.statusCode = statusCode;
    this.previous   = previous;
  }

};
