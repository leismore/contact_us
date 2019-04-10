/**
 * Get base path in file system
 *
 * @returns {string} - Base path
 */

'use strict';

const path = require('path');
let   base = path.resolve(__dirname, '..');

module.exports = base;
