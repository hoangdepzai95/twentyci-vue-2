<template>
    <div id="app">
        <app-header v-if="computedLoggedIn"></app-header>
        <router-view/>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Header from './layouts/Header.vue';

    @Component({
        components: {
            'app-header': Header
        }
    })
    export default class App extends Vue {

        get computedLoggedIn() {
            return this.$store.state.auth.loggedIn;
        }
    }
</script>
<style lang="scss">
    @import "styles/styles";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }
</style>
