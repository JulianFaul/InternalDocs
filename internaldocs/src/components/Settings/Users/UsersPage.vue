<template>
  <div class='content-container'>
    <div class='main-dashboard'>
      <div class='title-container'>
        <h1 class='title-container__title'>
          <router-link to='/settings'>
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link>
          Users</h1>
          <CreateUser></CreateUser>
      </div>
      <div class='scroll-container'>
        
          <v-list three-line v-for='userdetails in users' :key='userdetails.id'>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{userdetails.userName}} {{userdetails.lastname}}</v-list-tile-title>
                <v-list-tile-sub-title>Role: {{userdetails.role}}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Email: {{userdetails.email}}</v-list-tile-sub-title>
              </v-list-tile-content>
               <v-spacer></v-spacer>
              <v-icon class="button ">visibility</v-icon>
              <v-icon @click='deleteUser(userdetails.id)' class="button button__red-text">delete</v-icon>
            </v-list-tile>
            <v-divider></v-divider>
        </v-list>
    
      </div>
    </div>
  </div>
</template>

<script>
import CreateUser from './CreateUser'
import { mapGetters } from 'vuex';
export default {
  name: 'MainDashBoard',
  components:{
    CreateUser
  },
  data () {
    return {
    }
  },
  methods:{
    deleteUser(id){
      if(this.user.id === id){
        this.$store.dispatch('setSnack',{show: true,color:'red', message: "You can't delete yourself"});
      }
      else{
        this.$store.dispatch("deleteUser", id)
      }
    }
  },
  computed:{
    ...mapGetters([
      'user',
      'users',
      'loading'
    ]),
  }
}
</script>

