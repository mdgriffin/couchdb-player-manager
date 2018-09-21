<template>
  <div id="app">
    <h1>App Component</h1>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>