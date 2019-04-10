/**
 * The Error Handler before the Last One - CUSError Error
 */

'use strict';

const Response     = require('./Response.js');
const resp         = new Response();
const CUSError  = require('./CUSError.js');

module.exports = (error, req, res, next) => {

  // If HTTP headers sent, go to default handler
  if (res.headersSent) {
    return next(error);
  }
  // End

  if ( !(error instanceof CUSError) )
  {
    next(error);
    return;
  }
  else
  {
    if (!error.statusCode)
    {
      resp.res500(res, error);
      return;
    }

    let initial = String(error.statusCode)[0];

    switch (initial) {
      case '4':
        resp.errorClient(res, error.statusCode);
        return;

      case '5':
        resp.errorServer(res, error.statusCode, error);
        return;

      default:
        resp.res500(res, error);
        return;
    }
  }

};
