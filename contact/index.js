/**
 * Contact-us API - Accept user input and email to admin.
 * URL: <https://contact.leismore.co/api/contact-us>
 *
 * @post {application/json}
 *   {
 *     name:     {string 70}    User full name
 *     email:    {string 254}   From email
 *     subject:  {string 70}    Email subject
 *     message:  {string 2048}  Email body, plain text
 *   }
 *
 * @returns
 *   204 No Content
 *
 * @exception
 *   405, Method Not Allowed
 *   415, Unsupported Media Type, optionally:
 *   {
 *     "error": name | email | subject | message
 *   }
 *   503, Service Unavailable
 *
 * ---------------------------------------------------------------------------
 *
 * @error
 *   contact_1    "invalid name"
 *   contact_2    "invalid email"
 *   contact_3    "invalid subject"
 *   contact_4    "invalid message"
 *   contact_5    "not application/json"
 *   contact_6    "SMTP failure"
 *
 * @res.locals
 *   {
 *     CUSError: {CUSError class}
 *     inputs:
 *     {
 *       name:    {string}
 *       email:   {string}
 *       subject: {string}
 *       message: {string}
 *     }
 *   }
 */

'use strict';

const BASE_PATH      = require('../lib/get_basePath.js');
const read_file_json = require('../lib/read_file_json.js');

exports.config       = read_file_json(BASE_PATH + '/contact/config.json');
exports.postHandler1 = require('./post_handler1.js');
exports.postHandler2 = require('./post_handler2.js');
