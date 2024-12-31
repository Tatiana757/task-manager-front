<template>
  <div id="app">
    <NavBar v-if="isAuthenticated" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f8f9fa;
}
</style>
