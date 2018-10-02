export function getPlayers (limit, skip) {
    return fetch('/api/players?limit=' + limit + '&skip=' + skip)
        .then(result => {
            return result.json()
        })
        .then(result => {
            var resultObj = {};
            resultObj.offset = result.offset;
            resultObj.total_rows = result.total_rows;
            resultObj.rows = result.rows.reduce((acc, cur) => {
                acc.push(cur.doc)
                return acc
            }, []);

            return resultObj
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

export function getClubs () {
    return fetch('/api/clubs')
        .then(result => {
            return result.json()
        })
        .then(result => {
            return result.rows
        })
}

export function getPlayersByClub (clubName) {
    return fetch('/api/clubs/' + clubName)
        .then(result => {
            return result.json()
        })
        .then(result => {
            return result.rows.reduce((acc, cur) => {
                acc.push(cur.value)
                return acc
            }, [])
        })
}