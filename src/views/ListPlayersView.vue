<template>
  <div class="playerList">
    <h1>Players</h1>
    <div class="teamList" v-for="player in players" :key="player._id">
      <h2>{{player.Name }}</h2>
    </div>
  </div>
</template>

<script>
import {getPlayersPaginated} from '../db/players-db'

export default {
  name: 'list-players-view',
  components: { },
  data() {
    return {
      startPlayerIndex: 0,
      numPlayerPerPage: 100
    }
  },
  asyncComputed: {
    players () {
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
    }
  }
}
</script>