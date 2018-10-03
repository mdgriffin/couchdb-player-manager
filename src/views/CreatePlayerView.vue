<template>
  <div class="createPlayer">
    <h2>Add Player</h2>
    <alert v-bind:show="showAlert" @close="closeAlert">Player Created Successfully</alert>
    <div class="form-group">
        <label class="form-label">Name</label>
        <input type="text" class="form-input" v-model="name" />
    </div>
    <div class="form-group">
        <label class="form-label">Age</label>
        <input type="text" class="form-input" v-model="age" />
    </div>
    <div class="form-group">
        <label class="form-label">Nationality</label>
        <input type="text" class="form-input" v-model="nationality" />
    </div>
    <div class="form-group">
        <label class="form-label">Club</label>
        <select v-model="club" class="form-input">
            <option v-for="clubItem in clubs" :key="clubItem.key">{{clubItem.key}}</option>
        </select>
    </div>
    <div class="form-group">
        <label class="form-label">Overall</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="overall" />
    </div>
    <div class="form-group">
        <label class="form-label">Potential</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="potential" />
    </div>
    <div class="form-group">
        <label class="form-label">Agility</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="agility" />
    </div>
    <div class="form-group">
        <label class="form-label">Acceleration</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="acceleration" />
    </div>
    <div class="form-group">
        <label class="form-label">Dribbling</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="dribbling" />
    </div>
    <div class="form-group">
        <label class="form-label">Finishing</label>
        <input type="number" class="form-input" min="0" max="100" placeholder="0-100" v-model="finishing" />
    </div>
    <div class="form-group">
        <label class="form-label">Value</label>
        <input type="text" class="form-input" v-model="value" />
    </div>
    <div class="form-group">
        <label class="form-label">Wage</label>
        <input type="text" class="form-input" v-model="wage" />
    </div>
    <button @click="createPlayer" class="btn btn-secondary">Create</button>
  </div>
</template>

<script>
import  {getClubs} from '../db/players-db'
import {addPlayer} from '../api/players-api.js'
import Alert from "../components/alert.vue";

export default {
    name: 'create-players-view',
    data () {
        return {
            showAlert: false,
            name: "",
            age: "",
            nationality: "",
            overall: "",
            potential: "",
            agility: "",
            acceleration: "",
            dribbling: "",
            finishing: "",
            club: "",
            value: "",
            wage: "",
        }
    },
    components: {
        alert: Alert
    },
    methods: {
        createPlayer () {
            var self = this
            addPlayer({
                'Name': this.name,
                'Age': this.age,
                'Nationality': this.nationality,
                'Overall': this.overall,
                'Potential': this.potential,
                'Agility': this.agility,
                'Acceleration': this.acceleration,
                'Dribbling': this.dribbling,
                'Finishing': this.finishing,
                'Club': this.club,
                'Value': this.value,
                'Wage': this.wage
            }).then(res => {
                self.showAlert = true
                self.resetForm()

            }).catch(err => {
                console.log(err)
            })
        },
        closeAlert () {
            this.showAlert = false
        },
        resetForm () {
            this.name = ""
            this.age = ""
            this.nationality = ""
            this.overall = ""
            this.potential = ""
            this.club = ""
            this.value = ""
            this.wage = ""
        }
    },
    asyncComputed: {
        clubs () {
            let self = this
            return new Promise((resolve, reject) => {
                getClubs()
                .then(result => {
                    resolve(result)
                })
                .catch (err => {
                    reject(err)
                })
            })
        }
    }
}
</script>

