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

app.post('/teams', (req, res) => {
    //res.json({success: true})
    res.json(req.body)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))