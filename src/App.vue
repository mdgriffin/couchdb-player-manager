<template>
  <div id="app" class="container">
    <h1 class="logo">Football StatsHub <i class="far fa-futbol"></i></h1>
    <div class="box">
      <nav class="mainNav">
        <ul class="reset">
          <li><router-link to="/">Home</router-link></li><!--
          --><li><router-link to="/new-player">New Player</router-link></li><!--
          --><li><router-link to="/clubs">Clubs</router-link></li>
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
