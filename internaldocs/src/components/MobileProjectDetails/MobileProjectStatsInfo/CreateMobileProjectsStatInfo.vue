<template>
    <v-dialog v-model="dialog" scrollable max-width="1200px">
      <template v-slot:activator="{ on }">
        <button style='float:right' class='button button__blue' v-on="on">Create New Info</button>
      </template>
      <v-card>
        <v-card-title>Stats Info
           <button class='button button__green' flat @click="onSubmit">Save</button>
            <v-spacer></v-spacer>
            <v-icon flat @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
            <v-text-field name='url' id='url' v-model='url' label='URL'></v-text-field>
            <v-text-field name='Username' id='Username' v-model='username' label='Username'></v-text-field>
            <v-text-field name='Password' id='Password' v-model='password' label='Password'></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
       
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["projectID"],
  components:{
  },
  data () {
    return {
        dialog:false,
        buttonText: 'Create Info',
        formMode: 'create',
        url: '',
        username: '',
        password: '',
    }
  },
  computed:{
      
  },
  methods: {
        onSubmit(payload) {
        this.$store.dispatch("createStatInfo", {projectID: this.projectID, data: {
            url: this.url,
            username: this.username,
            password: this.password
        }})
    }
  }
}
</script>

