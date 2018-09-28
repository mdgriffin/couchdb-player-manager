<template>
    <div v-if="show" :class="'alert ' + customClass">
        <slot></slot>
        <button @click="closeAlert">Close Alert</button>
    </div>
</template>

<script>
export default {
    name: 'alert',
    props: {
        customClass: {
            type: String,
            default: ''
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

