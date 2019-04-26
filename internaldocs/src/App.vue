<template>
  <div id="app">
    <TopNav></TopNav>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>

import TopNav from './components/Header/TopNav.vue';
import Footer from './components/Footer/Footer.vue';
export default {
   components: {
    TopNav,
    Footer
  },
  name: 'App'
}
</script>

