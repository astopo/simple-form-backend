const path = require('path')

module.exports = function(req, res) {
  res.sendFile(path.resolve('./static', 'index.html'))
}