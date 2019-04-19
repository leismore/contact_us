/**
 * CUSResponse object
 *
 * The Response object for contact API
 */

'use strict';

const Response = require('../lib/Response.js');

class CUSResponse extends Response
{

  res415(res, reason=null)
  {
    const VALID_REASONS = ['name', 'email', 'subject', 'message'];
    if  ( VALID_REASONS.includes(reason) === false )
    {
      reason = null;
    }

    if (reason === null)
    {
      this.errorClient(res, 415);
    }
    else
    {
      res.set('Content-Type', 'application/json');
      res.status(415).send( {error: reason} );
    }
  }

}

module.exports = new CUSResponse();
