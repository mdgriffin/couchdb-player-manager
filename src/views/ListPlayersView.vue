<template>
  <div class="playerIndex">
    <h1>Players</h1>
    <button @click="prevPage" :disabled="!canNavBack">Prev Page</button>
    <p>Page {{currentPage}} of {{numPages}}</p>
    <button @click="nextPage" :disabled="!canNavForward">Next Page</button>
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
      currentPage: pageParam || 1,
      limit: 20,
      totalRows: 0
    }
  },
  methods: {
    onPlayerDeleted (playerId) {
      this.numPlayersDeleted++;
    },
    prevPage () {
      if (this.currentPage > 1) {
        this.$router.push({
          path: 'players',
          query: {
            page: this.currentPage - 1
          }
        });
      }
    },
    nextPage () {
      if (this.currentPage < this.numPages) {
        this.$router.push({
          path: 'players',
          query: {
            page: this.currentPage + 1
          }
        });
      }
    }
  },
  watch: {
    '$route.query.page' (page) {
      this.currentPage = page || 1
    }
  },
  computed: {
    numPages () {
      return Math.ceil(this.totalRows / this.limit);
    },
    canNavBack () {
      return this.currentPage > 1;
    },
    canNavForward () {
      return this.currentPage < this.numPages;
    }
  },
  asyncComputed: {
    players: {
      get () {
        let self = this
        return new Promise((resolve, reject) => {
          getPlayers(self.limit, self.limit * (self.currentPage - 1))
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