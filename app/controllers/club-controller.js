module.exports = function (db) {
    return {
        getClubs () {
            return db.view('player-views', 'clubs', {
                reduce: true,
                group: true,
            })
        },
        getClubPlayers (clubId) {
            return db.view('player-views', 'club-players', {
                key: clubId
            });
        }
    }
}