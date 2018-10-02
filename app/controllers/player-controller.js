module.exports = function (db){
    return {
        getPlayers () {
            return db.list({
                include_docs: true,
                limit: 50
            })
        },
        getPlayer (playerId) {
            return db.get(playerId)
        },
        insertPlayer (player) {
            return db.insert(player);
        },
        deletePlayer (playerId) {
            return new Promise ((resolve, reject) => {
                db.get(playerId)
                .then((result) => {
                    db.destroy(result._id, result._rev)
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
}