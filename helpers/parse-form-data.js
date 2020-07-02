module.exports = parseFormData

/*
 * @param {Object} formData
 *
 * A method to grab keys and values from an object and
 * returns an array of strings in the format `${key}: ${value}`
 */
function parseFormData(formData) {
  const keys = Object.keys(formData)

  return keys.map(key => {
    const value = formData[value]
    return `${key}: ${value}`
  })
}