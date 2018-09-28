<template>
  <div class="createPlayer">
    <loader :loading="playerLoading">
      <template slot="content" slot-scope="_">
        <h2>{{player.Name}}</h2>
        <table>
            <tbody>
                <tr>
                    <th>Club</th>
                    <td>{{player.Club}}</td>
                </tr>
                <tr>
                    <th>Age</th>
                    <td>{{player.Age}}</td>
                </tr>
                <tr>
                    <th>Nationality</th>
                    <td>{{player.Nationality}}</td>
                </tr>
                <tr>
                    <th>Wage</th>
                    <td>{{player.Wage}}</td>
                </tr>
                <tr>
                    <th>Value</th>
                    <td>{{player.Value}}</td>
                </tr>
                <tr>
                    <th>Overall</th>
                    <td>{{player.Overall}}</td>
                </tr>
                <tr>
                    <th>Potential</th>
                    <td>{{player.Potential}}</td>
                </tr>
            </tbody>
        </table>
      </template>
    </loader>
  </div>
</template>

<script>
import { getPlayerById } from "../db/players-db";
import Loader from "../components/loader.vue";

export default {
  name: "players-view",
  data() {
    return {
      playerLoading: true
    };
  },
  components: {
    loader: Loader
  },
  asyncComputed: {
    player() {
      let self = this;
      return new Promise((resolve, reject) => {
        getPlayerById(this.$route.params.id)
          .then(res => {
            resolve(res)
            self.playerLoading = false
          })
          .catch(err => {
            reject(err)
          });
      });
    }
  }
};
</script>

