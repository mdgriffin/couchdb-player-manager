const express = require('express')
const app = express()
const port = 3000
const nano = require('nano')('http://localhost:5984')
const pug = require('pug');

const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './app/views')
app.use(express.static('dist'))


// http://localhost:5984/_utils/

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})


app.get('/teams', (req, res) => {
    let teamsDb = nano.use('teams')

    teamsDb.list({include_docs: true}).then((body) => {
        let teams = []
        body.rows.forEach((doc) => teams.push(doc))
        res.json(teams)
    });
})

app.post('/teams', (req, res) => {
    let teamsDb = nano.use('teams')

    // can add pass a key as the second param
    teamsDb
        .insert(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))
})

app.delete('/teams/:teamId', (req, res) => {
    let teamsDb = nano.use('teams')

    teamsDb.get(req.params.teamId).then((body) => {
        teamsDb
            .destroy(body._id, body._rev)
            .then((result) => {
                res.send(result)
            })
            .catch(err => {
                res.send(err)
            })
      });
})

app.listen(port, () => console.log(`Listening on port ${port}!`))