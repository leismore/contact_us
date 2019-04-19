/**
 * The POST handler 2 - Send Email
 */

'use strict';

const BASE_PATH      = require('../lib/get_basePath.js');
const read_file_json = require('../lib/read_file_json.js');
const CONFIG_EMAIL   = read_file_json(BASE_PATH + '/credentials/email.json');
const CONFIG_GLOBAL  = read_file_json(BASE_PATH + '/config.json');
const nodemailer     = require("nodemailer");
const transporter    = nodemailer.createTransport(CONFIG_EMAIL);
const resp           = require('./CUSResponse.js');

module.exports = (req, res, next) => {

  const CUSError       = res.locals.CUSError;
  let message = {
    from:          CONFIG_GLOBAL.emailSender,
    to:            CONFIG_GLOBAL.emailReceiver,
    subject:       res.locals.inputs.subject,
    text:          res.locals.inputs.message,
    replyTo:
    {
      name:    res.locals.inputs.name,
      address: res.locals.inputs.email
    }
  };

  transporter.sendMail(message)
  .then(result=>{
    resp.res204(res);
  })
  .catch(e=>{
    next(new CUSError('SMTP failure', 'contact_6', '503', e));
  });

};
