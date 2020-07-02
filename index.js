const { PORT } = require('./env')

const express = require('express')
const app = express()

// Middleware
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
const Controllers = require('./controllers')

app.get('/', Controllers.Home)
app.post('/:email', Controllers.FormHandler)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
