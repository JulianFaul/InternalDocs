<template>
  <div class='content-container'>
    <div class='main-dashboard'>
      <div class='title-container'>
        <h1 class='title-container__title'>
          
          Settings
        </h1>
      </div>
      <div class=''>
          <v-list>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Users</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
               <v-spacer></v-spacer>
               <router-link class='button button__green' to='/users'>View</router-link>
            </v-list-tile>
             <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>More Settings Soon</v-list-tile-title>
                <v-list-tile-sub-title></v-list-tile-sub-title>
              </v-list-tile-content>
               <v-spacer></v-spacer>
               <router-link class='button button__green' to='s'>View</router-link>
            </v-list-tile>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDashBoard',
  data () {
    return {
    }
  },
  created(){
     this.$store.dispatch('getUsers')
  }
}
</script>

