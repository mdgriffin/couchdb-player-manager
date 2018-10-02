<template>
  <div class="playerIndex">
    <h1>Players</h1>
    <player-list :players="players" @delete="onPlayerDeleted"></player-list>
  </div>
</template>

<script>
//import {getPlayersPaginated} from '../db/players-db'
import {getPlayersPaginated} from '../api/players-api'
import PlayerList from '../components/player-list.vue'

export default {
  name: 'list-players-view',
  components: {
    'player-list': PlayerList
  },
  data() {
    return {
      numPlayersDeleted: 0,
      startPlayerIndex: 0,
      numPlayerPerPage: 100
    }
  },
  methods: {
    onPlayerDeleted (playerId) {
      this.numPlayersDeleted++;
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
            console.error(err)
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