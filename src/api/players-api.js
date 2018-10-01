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