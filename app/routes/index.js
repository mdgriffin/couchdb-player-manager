const nano = require('nano')('http://localhost:5984')
const playersDb = nano.use("players");

const playerController = require('../controllers/player-controller')(playersDb)
const clubController = require('../controllers/club-controller')(playersDb)

module.exports = function(app) {

app.get('/api/players', (req, res) => {
    playerController.getPlayers()
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.get('/api/players/:playerId', (req, res) => {
    playerController.getPlayer(req.params.playerId)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.post('/api/players', (req, res) => {
    playerController.insertPlayer(req.body)
        .then(result => res.json(result))
        .catch(err => {
            res.status(err.statusCode).json({success: false, error: err.error})
        })
})

app.put('/api/players/:playerId', (req, res) => {
    playerController.insertPlayer(req.body)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.delete('/api/players/:playerId', (req, res) => {
    playerController.deletePlayer(req.params.playerId)
    .then((body) => {
        res.json(body)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.get('/api/clubs', (req, res) => {
    clubController.getClubs()
    .then((body) => {
        res.json(body)
      })
      .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
      })
})

app.get('/api/clubs/:clubId', (req, res) => {
    clubController.getClubPlayers(req.params.clubId)
    .then((body) => {
        res.json(body)
      })
      .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
      })
})

app.get('/*', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

}