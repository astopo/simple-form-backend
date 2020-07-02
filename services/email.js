const Promise = require('bluebird')
const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = require('../env')

sgMail.setApiKey(SENDGRID_API_KEY)

class Email {
  constructor({ to, from, text, html }) {
    this.transporter = nodemailer.createTransport()

    this.data = {
      to,
      from,
      text,
      html
    }
  }

  send() {
    return sgMail.send(this.data)
  }
}

module.exports = Email
