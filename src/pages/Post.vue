<template>
<h1>this is post</h1>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class Post extends Vue {
        @Prop() private msg!: string;
    }
</script>

<style scoped lang="scss">

</style>
