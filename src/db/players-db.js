import PouchDB from 'pouchdb'
const db = new PouchDB('http://localhost:5984/players2');
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