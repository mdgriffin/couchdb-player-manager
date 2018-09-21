<template>
  <div id="app">
    <h1>Teams</h1>
    <div class="teamList" v-for="team in teams" :key="team._id">
      <h2>{{team.name }}</h2>
    </div>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: { },
  data() {
    return {
      teams: []
    }
  }
}
</script>