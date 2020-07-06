const Promise = require('bluebird')
const { HONEYPOT_KEY } = require('../env')
const { isEmailValid, parseFormData, textToHtml } = require('../helpers')

const Email = require('../services/email')



module.exports = function(req, res) {
  const accountEmail = req.params.email

  const { subject, confirmationEmail, toEmail } = req.query

  if (!accountEmail) {
    return req.status(400).send({ error: 'Email required.' })
  }

  if (!isEmailValid(accountEmail)) {
    return req.status(400).send({ error: 'Invalid email.' })
  }

  const data = req.body

  // First validate that we don't have a bot submission
  try {
    const honeyPot = data[HONEYPOT_KEY]

    if (honeyPot !== null) {
      // This was a bot, just send it a good message anyway.
      res.status(200).send({ message: 'OK' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Invalid payload.' })
  }

  // We have valid data, it's not a bot, so send the emails.
  try {
    const stringArray = parseFormData(data)

    // If we didn't have any form data, don't send the email.
    if (stringArray.length < 1) {
      return req.status(400).send({ error: 'Empty form data.' })
    }

    const promises = []

    let to = accountEmail

    if (toEmail && isEmailValid(toEmail)) {
      to = toEmail
    }

    const emailOptions = {
      to,
      from: accountEmail,
      subject: subject || 'New Form Submission',
      text: stringArray.join('\n'),
      html: textToHtml(stringArray)
    }

    const email = new Email(emailOptions)
    promises.push(email.send())

    // If a valid confirmation email was passed, send it a confirmation email.
    if (confirmationEmail && isEmailValid(confirmationEmail)) {
      const confEmailOptions = {
        to: confirmationEmail,
        from: accountEmail,
        subject: "We've Received Your Submission",
        text: 'Thank you for contacting us, this email is to confirm that we have received your submission and we will contact you soon.'
      }

      const confEmail = new Email(confEmailOptions)
      promises.push(confEmail.send())
    }

    Promise.all(promises)
      .then(() => res.status(200).send({ message: 'OK' }))
      .catch(error => {
        res.status(500).send({ message: 'Failed to send email(s).', error: error.message })

        console.log(error)
      })

  } catch (error) {
    console.error('Failed to parse form data:', error)

    res.status(400).send({ error: 'Invalid form data.' })
  }
}