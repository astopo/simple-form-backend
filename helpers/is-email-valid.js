module.exports = isEmailValid

/*
 * @param {String} email
 *
 * Validates if a string is an email or not.
 * Returns a boolean.
 */
function isEmailValid(email) {
  if (!email) return false

  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regEx.test(String(email).toLowerCase())
}