</<template>
    <div class="loader">
        <slot name="message" v-if="loading">
            <h3>Loading</h3>
        </slot>
        <slot name="content" v-if="!loading"></slot>
    </div>
</template>

<script>

export default {
    name: 'loader',
    props: ['loading']
}
</script>