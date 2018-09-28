import Vue from 'vue'
import Router from 'vue-router'
const ListPlayersView = () => import('../views/ListPlayersView.vue')
const PlayerView = () => import('../views/PlayerView.vue')
const CreatePlayerView = () => import('../views/CreatePlayerView.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    routes: [
      { path: '/', component: ListPlayersView },
      { path: '/players/:id', component: PlayerView },
      { path: '/new-player', component: CreatePlayerView }
    ]
  })
}