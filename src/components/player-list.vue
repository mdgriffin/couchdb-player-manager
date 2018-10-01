<template>
  <div class="playerList">
      <div class="playerList-single" v-for="player in players" :key="player._id">
        <h3> <router-link :to="'/players/' + player._id">{{player.Name }}</router-link></h3>
        <div class="playerList-single-actions">
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

<style lang="scss">
.playerList-single {
  border: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 1em;
  padding: 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.playerList-single:hover {
  background: rgba(255,255,255,0.05);
}
</style>

