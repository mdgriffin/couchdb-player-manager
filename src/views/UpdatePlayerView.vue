<template>
    <div class="updatePlayer">
        <loader :loading="playerLoading">
          <template slot="content" slot-scope="_">
            <h2>Update Player</h2>
            <alert v-bind:show="showUpdatedAlert" @close="closeUpdatedAlert">Player Update Successfully</alert>
            <div class="form-group">
                <label class="form-label">Name</label>
                <input type="text" class="form-input" v-model="player.Name" />
            </div>
            <div class="form-group">
                <label class="form-label">Age</label>
                <input type="text" class="form-input" v-model="player.Age" />
            </div>
            <div class="form-group">
                <label class="form-label">Nationality</label>
                <input type="text" class="form-input" v-model="player.Nationality" />
            </div>
            <div class="form-group">
                <label class="form-label">Club</label>
                <select v-model="player.Club" class="form-input">
                  <option v-for="clubItem in clubs" :key="clubItem.key">{{clubItem.key}}</option>
              </select>
            </div>
            <div class="form-group">
                <label class="form-label">Overall</label>
                <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="player.Overall" />
            </div>
            <div class="form-group">
                <label class="form-label">Potential</label>
                <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="player.Potential" />
            </div>
            <div class="form-group">
                <label class="form-label">Value</label>
                <input type="text" class="form-input" v-model="player.Value" />
            </div>
            <div class="form-group">
                <label class="form-label">Wage</label>
                <input type="text" class="form-input" v-model="player.Wage" />
            </div>
            <button  @click="updatePlayer" class="btn btn-secondary">Update</button>
          </template>
      </loader>
    </div>
</template>

<script>
import { getPlayerById, updatePlayer, getClubs } from "../db/players-db";
import Loader from "../components/loader.vue";
import Alert from "../components/alert.vue";

export default {
  name: "update-player-view",
   data() {
    return {
      showUpdatedAlert: false,
      playerLoading: true,
      player: {}
    };
  },
  components: {
    loader: Loader,
    alert: Alert
  },
  methods: {
    updatePlayer () {
      var self = this
      updatePlayer(self.player)
      .then(res => {
        self.player._id = res.id
        self.player._rev = res.rev
        self.showUpdatedAlert = true
      })
      .catch(err => {
        console.error(err)
      })
    },
    closeUpdatedAlert () {
      console.log('Closing alert')
      this.showUpdatedAlert = false
    }
  },
  created () {
    let self = this;
    getPlayerById(this.$route.params.id)
      .then(res => {
        self.player = res;
        self.playerLoading = false
      })
      .catch(err => {
        console.error(err);
      });
  },
  asyncComputed: {
      clubs () {
          let self = this
          return new Promise((resolve, reject) => {
              getClubs()
              .then(result => {
                  resolve(result)
              })
              .catch (err => {
                  reject(err)
              })
          })
      }
  }
};
</script>

