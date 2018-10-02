const nano = require('nano')('http://localhost:5984')
const playersDb = nano.use("players");

module.exports = {
    getPlayers () {
        return playersDb.list({
            include_docs: true,
            limit: 50
        })
    },
    getPlayer (playerId) {
        return playersDb.get(playerId)
    },
    insertPlayer (player) {
        return playersDb.insert(player);
    },
    deletePlayer (playerId) {
        return new Promise ((resolve, reject) => {
            playersDb.get(playerId)
            .then((result) => {
                playersDb.destroy(result._id, result._rev)
                .then((body) => {
                    resolve(body)
                })
                .catch(err => {
                    reject(err)
                })
            })
            .catch(err => {
                reject(err)
            })
        })
    }
}