const express = require('express')
const app = express()
const port = 3000
const nano = require('nano')('http://localhost:5984')
const pug = require('pug');

const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()
//const clubsDb = nano.use("clubs");
const playersDb = nano.use("players");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './app/views')
app.use(express.static('public'))

// http://localhost:5984/_utils/

app.get('/api/players', (req, res) => {
    playersDb.list({
        include_docs: true,
        limit: 50
    })
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.get('/api/players/:playerId', (req, res) => {
    playersDb.get(req.params.playerId)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.post('/api/players', (req, res) => {
    playersDb
        .insert(req.body)
        .then(result => res.json(result))
        .catch(err => {
            res.status(err.statusCode).json({success: false, error: err.error})
        })
})

app.put('/api/players/:playerId', (req, res) => {
    playersDb.insert(req.body)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.delete('/api/players/:playerId', (req, res) => {
    playersDb.get(req.params.playerId)
    .then((result) => {
        playersDb.destroy(result._id, result._rev)
        .then((body) => {
            res.json(body)
        })
        .catch(err => {
            res.status(err.statusCode).json({success: false, error: err.error})
        })
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.get('/api/clubs', (req, res) => {
    playersDb.view('player-views', 'clubs', {
        reduce: true,
        group: true,
      }).then((body) => {
        res.json(body)
      })
      .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
      })
})

app.get('/api/clubs/:teamId', (req, res) => {
    playersDb.view('player-views', 'club-players', {
        key: req.params.teamId
      }).then((body) => {
        res.json(body)
      })
      .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
      })
})

app.get('/*', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))