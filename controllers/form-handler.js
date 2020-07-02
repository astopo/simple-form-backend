const Promise = require('bluebird')
const { isEmailValid, parseFormData } = require('../helpers')
const Email = require('../services/email')

module.exports = function(req, res) {
  const email = req.params.email

  const { subject, confirmationEmail } = req.query

  if (!email) {
    return req.status(400).send({ error: 'Email required.' })
  }

  if (!isEmailValid(email)) {
    return req.status(400).send({ error: 'Invalid email.' })
  }

  const data = req.body

  try {
    const stringArray = parseFormData(data)

    // If we didn't have any form data, don't send the email.
    if (stringArray.length < 1) {
      return req.status(400).send({ error: 'Empty form data.' })
    }

    const promises = []

    // TODO - format for HTML

    const emailOptions = {
      to: email,
      from: email,
      subject: subject || 'New Form Submission',
      text: stringArray.join('\n')
    }

    const email = new Email(emailOptions)
    promises.push(email.send())

    // If a valid confirmation email was passed, send it a confirmation email.
    if (confirmationEmail && isEmailValid(confirmationEmail)) {
      const confEmailOptions = {
        to: confirmationEmail,
        from: email,
        subject: "We've Received Your Submission",
        text: 'Thank you for contacting us, this email is to confirm that we have received your submission and we will contact you soon.'
      }

      const confEmail = new Email(confEmailOptions)
      promises.push(confEmail.send())
    }

    Promise.all(promises)
      .then(() => res.status(200).send({ message: 'OK' }))
      .catch(error => res.status(500).send({ message: 'Failed to send email(s).', error: error.message }))

  } catch (error) {
    console.error('Failed to parse form data:', error)

    res.status(400).send({ error: 'Invalid form data.' })
  }
}