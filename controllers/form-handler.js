const { isEmailValid, parseFormData } = require('../helpers')
const Email = require('../services/email')

module.exports = function(req, res) {
  const email = req.params.email

  const { subject } = req.query

  if (!email) {
    return req.status(400).send({ error: 'Email required.' })
  }

  if (!isEmailValid(email)) {
    return req.status(400).send({ error: 'Invalid email.' })
  }

  const data = req.body

  try {
    const stringArray = parseFormData(data)
    // TODO - format for HTML

    const emailOptions = {
      to: email,
      body: stringArray.join('\n')
    }

    const email = new Email({})

    email.send()
      .then(() => res.status(200).send({ message: 'OK' }))
      .catch(error => res.status(500).send({ message: 'Failed to send email.', error: error.message }))

  } catch (error) {
    console.error('Failed to parse form data:', error)

    res.status(400).send({ error: 'Invalid form data.' })
  }
}