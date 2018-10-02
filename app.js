const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './app/views')
app.use(express.static('public'))

// http://localhost:5984/_utils/

const routes = require('./app/routes')

routes(app)

app.listen(port, () => console.log(`Listening on port ${port}!`))