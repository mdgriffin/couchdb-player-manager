<template>
  <div class="playerIndex">
    <h1>Players</h1>
    <button @click="prevPage">Prev Page</button>
    <p>Page {{currentPage + 1}} of {{numPages}}</p>
    <button @click="nextPage">Next Page</button>
    <player-list :players="players" @delete="onPlayerDeleted"></player-list>
  </div>
</template>

<script>
import {getPlayers} from '../api/players-api'
import PlayerList from '../components/player-list.vue'

export default {
  name: 'list-players-view',
  components: {
    'player-list': PlayerList
  },
  data() {
    var pageParam = this.$route.query.page && parseInt(this.$route.query.page )
    return {
      numPlayersDeleted: 0,
      currentPage: pageParam || 0,
      limit: 20,
      totalRows: 0
    }
  },
  methods: {
    onPlayerDeleted (playerId) {
      this.numPlayersDeleted++;
    },
    prevPage () {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage () {
      if (this.currentPage < this.numPages) {
        this.currentPage++;
      }
    }
  },
  computed: {
    numPages () {
      return Math.ceil(this.totalRows / this.limit);
    }
  },
  asyncComputed: {
    players: {
      get () {
        let self = this
        return new Promise((resolve, reject) => {
          getPlayers(self.limit, self.limit * self.currentPage)
          .then(result => {
            self.totalRows = result.total_rows;
            resolve(result.rows)
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