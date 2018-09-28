<template>
    <div class="club">
        <h3>{{ $route.params.id }}</h3>
        <player-list :players="players"></player-list>
    </div>
</template>

<script>
import {getPlayersByClub} from '../db/players-db'
import PlayerList from '../components/player-list.vue'

export default {
    name: 'club-view',
    components: {
        'player-list': PlayerList
    },
    asyncComputed: {
        players () {
            let self = this
            return new Promise((resolve, reject) => {
                getPlayersByClub(self.$route.params.id)
                .then(result => {
                    resolve(result)
                    self.clubsLoaded = true
                })
                .catch (err => {
                    reject(err)
                })
            })
        }
    }
}
</script>