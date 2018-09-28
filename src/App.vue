<template>
  <div id="app">
    <h1>Football StatsHub</h1>
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/new-player">New Player</router-link></li>
      </ul>
    </nav>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>