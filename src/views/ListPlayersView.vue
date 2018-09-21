<template>
  <div class="playerList">
    <h1>Players</h1>
    <div class="teamList" v-for="player in players" :key="player._id">
      <h2>{{player.Name }}</h2>
    </div>
  </div>
</template>

<script>
import {fetchTeams} from '../api/players-api'

export default {
  name: 'list-players-view',
  components: { },
  data() {
    return {
      players: []
    }
  },
  created () {
    let self = this
    fetchTeams()
      .then(response => {
        return response.json()
      })
      .then(players => {
        self.players = players
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>