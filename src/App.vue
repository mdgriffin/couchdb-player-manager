<template>
  <div id="app">
    <h1>Players</h1>
    <div class="teamList" v-for="player in players" :key="player._id">
      <h2>{{player.Name }}</h2>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import {fetchTeams} from './api/players-api'

export default {
  name: 'app',
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
        console.log(players)
        self.players = players
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>