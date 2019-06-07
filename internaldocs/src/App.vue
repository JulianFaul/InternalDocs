<template>
  <v-app id="app">
    <snackbar></snackbar>
    <TopNav app></TopNav>
     <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <Footer app></Footer>
  </v-app>
</template>

<script>

import TopNav from './components/Header/TopNav.vue';
import Footer from './components/Footer/Footer.vue';
import { VContent, VContainer} from 'vuetify/lib'
export default {
   components: {
     VContent,
     VContainer,
    TopNav,
    Footer
  },
  name: 'App'
}
</script>

