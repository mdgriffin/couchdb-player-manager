import PouchDB from 'pouchdb'
const db = new PouchDB('http://localhost:5984/players');
//localDB.replicate.from(remoteDB);

export function getPlayers () {
    return db.allDocs({include_docs: true})
}

export function addPlayer (playerObj) {
    // TODO: Save player to db and sync with CouchDB
    playerObj['_id'] = playerObj['Name'].replace(' ', '_').toLowerCase()
    return db.put(playerObj)
}