/**
 * The GET Handler - API status indicator
 */

'use strict';

const Response = require('./Response.js');
const resp     = new Response();

module.exports = (req, res) => {
  resp.res204(res);
};
