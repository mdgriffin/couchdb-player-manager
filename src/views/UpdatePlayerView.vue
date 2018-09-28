<template>
    <div class="updatePlayer">
        <loader :loading="playerLoading">
          <template slot="content" slot-scope="_">
            <h2>Update Player</h2>
            <div>
                <label>Name</label>
                <input type="text" v-model="player.Name" />
            </div>
            <div>
                <label>Age</label>
                <input type="text" v-model="player.Age" />
            </div>
            <div>
                <label>Nationality</label>
                <input type="text" v-model="player.Nationality" />
            </div>
            <div>
                <label>Club</label>
                <input type="text" v-model="player.Club" />
            </div>
            <div>
                <label>Overall</label>
                <input type="text" v-model="player.Overall" />
            </div>
            <div>
                <label>Potential</label>
                <input type="text" v-model="player.Potential" />
            </div>
            <div>
                <label>Value</label>
                <input type="text" v-model="player.Value" />
            </div>
            <div>
                <label>Wage</label>
                <input type="text" v-model="player.Wage" />
            </div>
            <button  @click="updatePlayer">Update</button>
          </template>
      </loader>
    </div>
</template>

<script>
import { getPlayerById, updatePlayer } from "../db/players-db";
import Loader from "../components/loader.vue";

export default {
  name: "update-player-view",
   data() {
    return {
      playerLoading: true,
      player: {}
    };
  },
  components: {
    loader: Loader
  },
  methods: {
    updatePlayer () {
      var self = this
      updatePlayer(self.player)
      .then(res => {
        self.player._id = res.id
        self.player._rev = res.rev
      })
      .catch(err => {
        console.error(err)
      })
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
  }
};
</script>

