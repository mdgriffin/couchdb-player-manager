import PouchDB from 'pouchdb'
const db = new PouchDB('http://localhost:5984/players');
//localDB.replicate.from(remoteDB);

export function getPlayers () {
    return db.allDocs({include_docs: true})
}

export function getPlayersPaginated (startIndex, endIndex) {
    return new Promise((resolve, reject) => {
        getPlayers()
        .then(result => {
            let filteredPlayers = result.rows.slice(startIndex, endIndex).reduce((prev, curr) => {
                prev.push(curr.doc);
                return prev
              }, [])
    
              resolve(filteredPlayers);
        })
        .catch (err => {
            reject(err)
          })
      });
}

export function getPlayerById (playerId) {
    return db.get(playerId);
}

export function addPlayer (playerObj) {
    playerObj['_id'] = playerObj['Name'].replace(' ', '_').toLowerCase()
    return db.put(playerObj)
}

export function updatePlayer (playerObj) {
    return db.put(playerObj);
}

export function deletePlayer (playerId, playerRev) {
    return db.remove(playerId, playerRev)
}

export function getClubs () {
    return new Promise((resolve, reject) => {
        return db.query('player-views/clubs', {reduce: true, group: true})
            .then(res => {
                resolve(res.rows)
            })
            .catch(err => reject(err))
    })
}

export function getPlayersByClub (clubName) {
    return new Promise ((resolve, reject) => {
        db.query('player-views/club-players', {key: clubName})
            .then(result => {
                let players = result.rows.reduce((acc, curr) => {
                    acc.push(curr.value)
                    return acc
                }, [])

                resolve(players);
            })
            .catch(err => reject(err))
    })
}