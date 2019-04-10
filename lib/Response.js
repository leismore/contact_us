/**
 * Response Class
 *
 * Exit Code:
 *   1 - Server-side error
 */

'use strict';

module.exports = class Response
{

  errorServer(res, statusCode, error)
  {
    console.error(error);
    res.sendStatus(statusCode);
    process.exitCode = 1;
  }

  errorClient(res, statusCode)
  {
    res.sendStatus(statusCode);
  }

  // 500 - Internal Server Error
  res500(res, error)
  {
    this.errorServer(res, 500, error);
  }

  // 204 - No Content
  res204(res)
  {
    res.sendStatus(204);
  }

};
