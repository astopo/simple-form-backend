const ENV = Object.assign({}, process.env)

const DEFAULTS = {
  PORT: 3000
}

// Apply defaults
Object.keys(DEFAULTS).forEach(key => {
  ENV[key] = process.env[key] || DEFAULTS[key]
})

module.exports = ENV
