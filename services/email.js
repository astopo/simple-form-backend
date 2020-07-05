const Promise = require('bluebird')
const sgMail = require('@sendgrid/mail')

const { SENDGRID_API_KEY } = require('../env')

sgMail.setApiKey(SENDGRID_API_KEY)

class Email {
  constructor({ to, from, subject, text, html }) {
    this.data = {
      to,
      from,
      subject,
      text,
      html: html || text
    }
  }

  send() {
    return sgMail.send(this.data)
  }
}

module.exports = Email
