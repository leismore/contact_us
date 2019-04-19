/**
 * The main script
 */

'use strict';

// Import modules
const express                  = require('express');
const cors                     = require('cors');
const corsOptions              = {
  origin: /(\.|\/)leismore\.(co|me)(\:\d{1,5})?$/i,
  methods: ['OPTIONS', 'GET', 'POST']
};
const bodyParser               = require('body-parser');
const BASE_PATH                = require('./lib/get_basePath.js');
const read_file_json           = require('./lib/read_file_json.js');
const CONFIG                   = {
  global:    read_file_json(BASE_PATH + '/config.json'),
  contact:   read_file_json(BASE_PATH + '/contact/config.json')
};
const get_handler              = require('./lib/get_handler.js');
const error_handler_beforeLast = require('./lib/error_handler_beforeLast.js');
const error_handler_last       = require('./lib/error_handler_last.js');
const contact                  = require('./contact/index.js');

// Init.
let app = express();
app.use( bodyParser.json(), cors(corsOptions) );

// Contact module
const CONTACT_URL = '/api/' + CONFIG.contact.urlRel;
app.options( CONTACT_URL, ()=>{} );
app.get(     CONTACT_URL, get_handler );
app.post(    CONTACT_URL, contact.postHandler1, contact.postHandler2 );

// Error handling
app.use( error_handler_beforeLast, error_handler_last );

// Start server
app.listen( CONFIG.global.app.port,
            CONFIG.global.app.host,
            CONFIG.global.app.backlog,
  () => {
    console.log(
      `[${CONFIG.global.app.projectName}]` + ` is working on ` +
      `<${CONFIG.global.app.host}:${CONFIG.global.app.port}>`
    );
  }
);
