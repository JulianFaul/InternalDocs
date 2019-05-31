<template>
    <v-dialog v-model="dialog" scrollable max-width="1200px">
      <template v-slot:activator="{ on }">
        <button style='float:right' class='button button__green' v-on="on">Edit Info</button>
      </template>
      <v-card>
        <v-card-title>Stats Info Edit
          <button class='button button__green' flat @click="onSubmit">Save</button>
            <v-spacer></v-spacer>
             <v-icon flat @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <v-text-field name='url' id='url' v-model='editedUrl' label='URL'></v-text-field>
            <v-text-field name='Username' id='Username' v-model='editedUsername' label='Username'></v-text-field>
            <v-text-field name='Password' id='Password' v-model='editedPassword' label='Password'></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
     
      </v-card>
    </v-dialog>

</template>

<script>


import {VIcon} from "vuetify/lib";
import { mapGetters } from 'vuex';
export default {
  name: 'EditMobileProjectsStatInfo',
  props: ["projectID","appInfo"],
  components:{
      VIcon
  },
  data () {
    return {
        dialog: false,
        formMode: 'edit',
        editedUrl:      this.appInfo.url,
        editedUsername: this.appInfo.username,
        editedPassword: this.appInfo.password,
    }
  },
  computed:{

    
  },
  methods: {
        onSubmit() {
        this.$store.dispatch("updateStatInfo", {projectID: this.projectID, infoID:this.appInfo._id , data: {
        url:      this.editedUrl,
        username: this.editedUsername,
        password: this.editedPassword,
        }})
        this.dialog = false
   
    }
  }
}
</script>

