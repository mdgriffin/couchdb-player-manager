<template>
    <div class="club">
        <h3>{{ $route.params.id }}</h3>
        <div class="playerList-single" v-for="player in players" :key="player._id">
        <h3>
            <router-link :to="'/players/' + player._id">{{player.Name }}</router-link>
            (<router-link :to="'/players/' + player._id + '/edit'">edit</router-link>)
            <button @click="deletePlayer(player)">Delete</button>
        </h3>
        </div>
    </div>
</template>

<script>
import {getPlayersByClub} from '../db/players-db'

export default {
    name: 'club-view',
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