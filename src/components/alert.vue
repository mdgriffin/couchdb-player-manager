<template>
    <div v-if="show" :class="'alert alert-' + alertType">
        <slot></slot>
        <button @click="closeAlert" class="btn"><i class="fas fa-times"></i></button>
    </div>
</template>

<script>
export default {
    name: 'alert',
    props: {
        alertType: {
            type: String,
            default: 'success'
        },
        show: Boolean
    },
    methods: {
        closeAlert () {
            this.$emit('close')
        }
    }
}
</script>


<style lang="scss">
.alert {
    margin-bottom: 1em;
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.alert-success {
    background: green;
}

.alert-error {
    background: red;
}
</style>


