module.exports = textToHtml

/*
 * @param {[String]} textArray
 *
 * Wrap lines of text with a <p> tag.
 * Returns a single HTML string.
 */
function textToHtml(textArray) {
  return textArray.map(text => `<p>${text}</p>`).join('')
}
