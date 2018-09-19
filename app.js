const express = require('express')
const app = express()
const port = 3000
const nano = require('nano')('http://localhost:5984')

// http://localhost:5984/_utils/

app.get('/', (req, res) => {
    nano.db.create('teams').then((data) => {
        // success - response is in 'data'
        res.send(data)
      }).catch((err) => {
        // failure - error information is in 'err'
        res.send(err)
      })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))