/**
 * The POST handler 1 - Verify Client Input
 */

'use strict';

const MAX_LENGTH_NAME    = 70;
const MAX_LENGTH_EMAIL   = 254;
const MIN_LENGTH_EMAIL   = 3;
const MAX_LENGTH_SUBJECT = 70;
const MAX_LENGTH_MESSAGE = 2048;
const CUSError         = require('../lib/CUSError.js');
const unify_lineBreak  = require('../lib/plainText_unify_lineBreak.js');
const remove_lineBreak = require('../lib/plainText_remove_lineBreak.js');
const validator        = require('validator');

let name    = null;
let email   = null;
let subject = null;
let message = null;

module.exports = (req, res, next) => {

  // Test media type
  if ( !req.is('application/json') )
  {
    next( new CUSError('not application/json', 'contact_5', '415') );
    return;
  }

  // Test name
  if (typeof req.body.name !== 'string' ||
             req.body.name === '')
  {
    next( new CUSError('invalid name', 'contact_1', '415') );
    return;
  }
  else
  {
    name = remove_lineBreak(req.body.name).trim();
  }

  if (name.length === 0 || name.length > MAX_LENGTH_NAME)
  {
    next( new CUSError('invalid name', 'contact_1', '415') );
    return;
  }

  // Test email
  if (typeof req.body.email !== 'string' ||
             req.body.email === '')
  {
    next( new CUSError('invalid email', 'contact_2', '415') );
    return;
  }
  else
  {
    email = req.body.email.trim().toLowerCase();
  }

  if (email.length > MAX_LENGTH_EMAIL ||
      email.length < MIN_LENGTH_EMAIL ||
      validator.isEmail(email) === false)
  {
    next( new CUSError('invalid email', 'contact_2', '415') );
    return;
  }

  // Test subject
  if (typeof req.body.subject !== 'string' ||
             req.body.subject === '')
  {
    next( new CUSError('invalid subject', 'contact_3', '415') );
    return;
  }
  else
  {
    subject = remove_lineBreak(req.body.subject).trim();
  }

  if (subject.length  >   MAX_LENGTH_SUBJECT ||
      subject.length  === 0)
  {
    next( new CUSError('invalid subject', 'contact_3', '415') );
    return;
  }

  // Test message
  if (typeof req.body.message !== 'string' ||
             req.body.message === '')
  {
    next( new CUSError('invalid message', 'contact_4', '415') );
    return;
  }
  else
  {
    message = unify_lineBreak(req.body.message);
  }

  if (message.length  >   MAX_LENGTH_MESSAGE ||
      message.length  === 0)
  {
    next( new CUSError('invalid message', 'contact_4', '415') );
    return;
  }

  // Normalization
  res.locals.CUSError    = CUSError;
  res.locals.inputs      = {
    name    : name,
    email   : email,
    subject : subject,
    message : message
  };

  next();

};
