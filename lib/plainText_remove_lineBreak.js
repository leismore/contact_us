/**
 * Function - Remove line-breaks
 *   \n
 *   \r
 *   \r\n
 *   \n\r
 * @param   {string}  text                     - Plain text
 * @param   {string}  [replacement='\040\040'] - Two spaces
 * @returns {string}
 * @returns null
 */

'use strict';

const LB              = '\r\n';
const SP2             = '\040\040';
const unify_lineBreak = require('./plainText_unify_lineBreak.js');

module.exports = (text, replacement=SP2) => {

  text = String(text);
  if (text === '')
  {
    return null;
  }

  text = unify_lineBreak(text);
  text = text.substring(0, text.length-1);
  text = text.replace( /\r\n/gu, replacement );

  return text;

};
