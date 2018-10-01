<template>
  <div class="playerList itemList">
      <div class="playerList-single itemList-single" v-for="player in players" :key="player._id">
        <h3> <router-link :to="'/players/' + player._id">{{player.Name }}</router-link></h3>
        <div class="playerList-single-actions itemList-single-actions">
          <router-link class="btn" :to="'/players/' + player._id + '/edit'">edit</router-link>
          <button class="btn" @click="deletePlayer(player)"><i class="fas fa-times"></i></button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "player-list",
  props: ["players"],
  methods: {
    deletePlayer(player) {
      let self = this;
      deletePlayer(player._id, player._rev).then(res => {
        self.numPlayersDeleted++;
      });
    }
  }
};
</script>