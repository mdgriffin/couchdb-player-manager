<template>
  <div class="createPlayer">
    <h2>Add Player</h2>
    <div>
        <label>Name</label>
        <input type="text" v-model="name" />
    </div>
    <div>
        <label>Age</label>
        <input type="text" v-model="age" />
    </div>
    <div>
        <label>Nationality</label>
        <input type="text" v-model="nationality" />
    </div>
    <div>
        <label>Club</label>
        <input type="text" v-model="club" />
    </div>
    <div>
        <label>Overall</label>
        <input type="text" v-model="overall" />
    </div>
    <div>
        <label>Potential</label>
        <input type="text" v-model="potential" />
    </div>
    <div>
        <label>Value</label>
        <input type="text" v-model="value" />
    </div>
    <div>
        <label>Wage</label>
        <input type="text" v-model="wage" />
    </div>
    <button  @click="createPlayer">Create</button>
  </div>
</template>

<script>
import  {addPlayer} from '../db/players-db'

export default {
    name: 'create-players-view',
    data () {
        return {
            name: "",
            age: "",
            nationality: "",
            overall: "",
            potential: "",
            club: "",
            value: "",
            wage: ""
        }
    },
    methods: {
        createPlayer () {
            addPlayer({
                'Name': this.name,
                'Age': this.age,
                'Nationality': this.nationality,
                'Overall': this.overall,
                'Potential': this.potential,
                'Club': this.club,
                'Value': this.value,
                'Wage': this.wage
            }).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

