# Simple Form Backend

A backend service for your forms. Receive form data by email.

## Getting started

After cloning the repo, install dependencies:

```
yarn install
```

Then start the server:

```
yarn start
```

## Requirements

Env vars: `SENDGRID_API_KEY` and `HONEYPOT_KEY`

See details below.

### SendGrid

The mailer is integrated with [SendGrid](https://sendgrid.com), so you will need a SendGrid account and API key in order to be able to send emails.

In addition, you will need to verify either a Single Sender or authenticate a domain on SendGrid.

### Honey Pot

In order to prevent bots from submitting the form, the form handler controller validates a honeypot key on the form data. More info can be found [here](https://dev.to/felipperegazio/how-to-create-a-simple-honeypot-to-protect-your-web-forms-from-spammers--25n8).

The API will check the form data for whatever key is set in `HONEYPOT_KEY`, and the expected value of this key is `null`.

If the API receives a value, it will return a 200 response, but will not send an email.

## API

The API has a single route: `/:email`

Simply make a POST request to `/:email` with the form data as the body.

Optionally pass query params:

* `toEmail` - The email that should receive the form data. If not passed, the server will default to the email in the route param.
* `subject` - The subject line of the email. If not passed, it will default to 'New Form Submission'
* `confirmationEmail` - If passed, the server will send a default confirmation email to the email defined here. (Currently not configurable)

Example:

POST to `/someone@example.com?subject=NewSubmission&toEmail=another@example.com`

Payload:

```
{
  "name": "Jerry",
  "phone": "+1 123 1234"
}
```

Will send an email to another@example.com, with subject line "NewSubmission", and the body will be:

name: Jerry
phone: +1 123 1234

Either the email `another@example.com` will have to be verified, or the domain `example.com` authenticated in SendGrid, otherwise this will fail.

## With pm2

`pm2 start index.js`

All config is in `ecosystem.config.js`.
