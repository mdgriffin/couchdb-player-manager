const playersController = require('../controllers/player-controller')

module.exports = function(app) {

app.get('/api/players', (req, res) => {
    playersController.getPlayers()
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.get('/api/players/:playerId', (req, res) => {
    playersController.getPlayer(req.params.playerId)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.post('/api/players', (req, res) => {
    playersController.insertPlayer(req.body)
        .then(result => res.json(result))
        .catch(err => {
            res.status(err.statusCode).json({success: false, error: err.error})
        })
})

app.put('/api/players/:playerId', (req, res) => {
    playersController.insertPlayer(req.body)
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        res.status(err.statusCode).json({success: false, error: err.error})
    })
})

app.delete('/api/players/:playerId', (req, res) => {
    playersController.deletePlayer(req.params.playerId)
    .then((body) => {
        res.json(body)
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

}