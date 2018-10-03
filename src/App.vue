<template>
  <div id="app" class="container">
    <div class="box">
      <h1 class="logo"><i class="fas fa-futbol small"></i><i class="far fa-futbol medium"></i><i class="far fa-futbol"></i> Football StatsHub <i class="fas fa-futbol"><i class="far fa-futbol medium"></i><i class="fas fa-futbol small"></i></i></h1>
      <nav class="mainNav">
        <ul class="reset">
          <li><router-link to="/">Players</router-link></li>
          <li><router-link to="/clubs">Clubs</router-link></li>
          <li><router-link to="/new-player">New Player <i class="fas fa-plus-square"></i></router-link></li>
        </ul>
      </nav>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import './styles/global.scss'

export default {
  name: 'main-app'
}
</script>


<style lang="scss">
.mainNav li {
  display: inline-block;
}

.mainNav li a {
  display: block;
  padding: 5px;
  color: #fff;
  font-size: 1.2em;
}
</style>
