/**
 * Function - Unify plain text line breaks.
 *   \n
 *   \r
 *   \r\n
 *   \n\r
 * @param   {string} text               - Plain text
 * @param   {string} [lineBreak='\r\n'] - Canonical line break
 * @returns {string}
 * @returns {null}
 */

'use strict';

const LB_XML = '\n';
const LB     = '\r\n';

module.exports = (text, lineBreak=LB) => {

  text = String(text);
  if (text === '')
  {
    return null;
  }

  text = text.replace( /(\r\n|\n\r)/gu, LB_XML );
  text = text.replace(   /(\n|\r)/gu  , LB_XML );

  if ( text[text.length-1] !== LB_XML )
  {
    text = text + LB_XML;
  }

  text = text.replace( /\n/gu, lineBreak );

  return text;

};
