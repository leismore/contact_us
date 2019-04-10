/**
 * Read a trusted JSON-based local file (UTF-8).
 *
 * @param    {string}       path - Fie location
 * @returns  {json-object}       - A parsed JSON object
 */

'use strict';

const fs = require('fs');

module.exports = (path) => {
  let data = fs.readFileSync(path, 'utf8');
  return JSON.parse(data);
};
