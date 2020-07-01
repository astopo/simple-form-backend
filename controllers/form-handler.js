module.exports = function(req, res) {
  const email = req.params.email

  if (!email) {
    // TODO - handle no email
  }

  // TODO - validate the email.

  // TODO - grab form data.
  const data = req.body

  try {
    const keys = Object.keys(data)
    // TODO - build the email & send.
  } catch (error) {
    console.error('Failed to parse form data:', error)
    res.status(500).send({ message: 'Invalid form data.' })
  }
}