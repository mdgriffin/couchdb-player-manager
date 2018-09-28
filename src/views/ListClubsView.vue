<template>
    <div class="clubList">
        <h2>Clubs</h2>
        <div v-if="clubsLoaded">
            <div class="clubList-single" v-for="club in clubs.rows" :key="club.key" >
                <h3>{{club.key}} - {{club.value}} players</h3>
            </div>
        </div>
    </div>
</template>


<script>
import {getClubs} from '../db/players-db'

export default {
    name: 'clubs-list',
    data () {
        return {
            clubsLoaded: false
        }
    },
    asyncComputed: {
        clubs () {
            let self = this
            return new Promise((resolve, reject) => {
                getClubs()
                .then(result => {
                    resolve(result)
                    self.clubsLoaded = true
                })
                .catch (err => {
                    reject(err)
                })
            })
        }
    }
}
</script>

