const express = require('express')
const app = express()
const port = 3000
const nano = require('nano')('http://localhost:5984')

var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// http://localhost:5984/_utils/

app.get('/', (req, res) => {
    /*
    let teamsDb = nano.use('teams');

    // alice.insert({ happy: true }, 'rabbit')

    teamsDb.get('').then((body) => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
    */

    /*
    nano.db.create('teams').then((data) => {
        // success - response is in 'data'
        res.send(data)
      }).catch((err) => {
        // failure - error information is in 'err'
        res.send(err)
      })
    */

    res.send('Hello World')
})

app.get('/teams', (req, res) => {
    let teamsDb = nano.use('teams');

    teamsDb.list({include_docs: true}).then((body) => {
        let teams = [];
        body.rows.forEach((doc) => teams.push(doc))
        res.json(teams);
      });
})

app.post('/teams', (req, res) => {
    let teamsDb = nano.use('teams');

    // can add pass a key as the second param
    teamsDb.insert(req.body)
        .then(result => res.send(result))
        .catch(err => res.send(err))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))