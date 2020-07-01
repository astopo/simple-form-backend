const Promise = require('bluebird')
const nodemailer = require('nodemailer')

class Email {
  constructor({ to, formData }) {
    this.transporter = nodemailer.createTransport()
  }

  send(data) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(data, (error, info) => {
        if (error) return reject(error)

        resolve(info)
      })
    })
  }
}

module.exports = Email
