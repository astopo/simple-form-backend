require('dotenv').config()

const ENV = Object.assign({}, process.env)

const DEFAULTS = {
  PORT: 3000
}

const REQUIRED = ['HONEYPOT_KEY', 'SENDGRID_API_KEY']

// Apply defaults
Object.keys(DEFAULTS).forEach(key => {
  ENV[key] = process.env[key] || DEFAULTS[key]
})

// Validate we have the required fields.
REQUIRED.forEach(requiredKey => {
  if (!ENV[requiredKey]) {
    throw new Error(`Environment variable ${requiredKey} is required.`)
  }
})

module.exports = ENV
