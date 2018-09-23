<template>
  <div class="playerList">
    <h1>Players</h1>
    <div class="teamList" v-for="player in players" :key="player._id">
      <h2>{{player.Name }}</h2>
    </div>
  </div>
</template>

<script>
import {getPlayers} from '../db/players-db'

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
        //playersDb.allDocs({include_docs: true})
        getPlayers()
        .then(result => {
          
          let filteredPlayers = result.rows.slice(self.startPlayerIndex, self.startPlayerIndex + self.numPlayerPerPage - 1).reduce((prev, curr, currIndex) => {
            prev.push(curr.doc);
            return prev
          }, [])

          resolve(filteredPlayers);
        })
        .catch (err => {
          reject(err)
        })
      })
    }
  }
}
</script>