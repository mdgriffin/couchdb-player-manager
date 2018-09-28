<template>
  <div class="playerList">
    <h1>Players</h1>
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
import {getPlayersPaginated, deletePlayer} from '../db/players-db'

export default {
  name: 'list-players-view',
  components: { },
  data() {
    return {
      numPlayersDeleted: 0,
      startPlayerIndex: 0,
      numPlayerPerPage: 100
    }
  },
  methods: {
    deletePlayer (player) {
      let self = this
      deletePlayer(player._id, player._rev)
      .then(res => {
        self.numPlayersDeleted++
      })
    }
  },
  asyncComputed: {
    players: {
      get () {
        let self = this
        return new Promise((resolve, reject) => {
          getPlayersPaginated(self.startPlayerIndex, self.startPlayerIndex + self.numPlayerPerPage - 1)
          .then(result => {
            resolve(result)
          })
          .catch (err => {
            reject(err)
          })
        })
      },
      watch() {
        this.numPlayersDeleted
      }
    }
  }
}
</script>