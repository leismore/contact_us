/**
 * The Last Error Handler - Generic Error
 */

'use strict';

const Response = require('./Response.js');
const resp = new Response();

module.exports = (error, req, res, next) => {

  // If HTTP headers sent, go to default handler
  if (res.headersSent) {
    return next(error);
  }
  // End

  let statusCode = null;
  if (error.statusCode)
  {
    statusCode = error.statusCode;
  }
  else {
    statusCode = null;
  }

  if (statusCode === null)
  {
    resp.res500(res, error);
    return;
  }
  else
  {
    let initial = String(statusCode)[0];

    switch (initial) {
      case '4':
        resp.errorClient(res, statusCode);
        return;

      case '5':
        resp.errorServer(res, statusCode, error);
        return;

      default:
        resp.res500(res, error);
        return;
    }
  }

};
