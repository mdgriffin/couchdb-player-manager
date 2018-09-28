<template>
    <div class="playerList">
        <div class="playerList-single" v-for="player in players" :key="player._id">
        <h3>
            <router-link :to="'/players/' + player._id">{{player.Name }}</router-link>
            (<router-link :to="'/players/' + player._id + '/edit'">edit</router-link>)
            <button @click="deletePlayer(player)">Delete</button>
        </h3>
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
