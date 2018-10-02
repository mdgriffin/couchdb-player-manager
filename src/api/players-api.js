export function getPlayers () {
    return getPlayersPaginated(0, 1000);
}

export function getPlayersPaginated (startIndex, endIndex) {
    return fetch('/api/players')
        .then(result => {
            return result.json()
        })
        .then(result => {
            return result.rows.reduce((acc, cur) => {
                acc.push(cur.doc)
                return acc
            }, [])
        })
}

export function getPlayerById (playerId) {
    return fetch('/api/players/' + playerId)
        .then(result => {
            return result.json()
        })
}

export function addPlayer (playerObj) {
    playerObj['_id'] = playerObj['Name'].replace(' ', '_').toLowerCase()
    return fetch('/api/players', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(playerObj)
    })
    .then(result => {
        return result.json()
    })
}

export function updatePlayer (playerObj) {
    return fetch('/api/players/' + playerObj._id, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(playerObj)
    })
    .then(result => {
        return result.json()
    })
}

export function deletePlayer (playerId) {
    return fetch('/api/players/' + playerId, {
        method: 'DELETE'
    })
        .then(result => {
            return result.json()
        })
}