/**
 * The Error Handler before the Last One - CUSError Error
 */

'use strict';

const Response     = require('./Response.js');
const resp         = new Response();
const cusresp      = require('../contact/CUSResponse.js');
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
    // contact start
    if ( (/^contact\_/).test(error.code) && error.statusCode == 415 )
    {
      switch (error.code) {
        case 'contact_1':
          cusresp.res415(res, 'name');
          return;
        case 'contact_2':
          cusresp.res415(res, 'email');
          return;
        case 'contact_3':
          cusresp.res415(res, 'subject');
          return;
        case 'contact_4':
          cusresp.res415(res, 'message');
          return;
        default:
          cusresp.res415(res);
          return;
      }
    }
    // contact end

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
