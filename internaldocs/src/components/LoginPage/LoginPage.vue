<template>
    <v-content class='loginpage' >
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 style='min-width:500px;'>
            <v-card class="elevation-12 loginpage-card">
              <v-toolbar dark  class="loginpage-toolbar__blue">
                <v-toolbar-title>Login {{user}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field :rules='emailRules' v-model='email' prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
                  <v-text-field :rules='passwordRules' v-model='password' prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click='logUserIn()' class='loginpage-button__blue' dark>Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
</template>

<script>
export default {
  data(){
    return{
      password: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ]
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
     user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    logUserIn(){
      let user = {
        password: this.password,
        email: this.email,
      }
      this.$store.dispatch('logUserIn', user)
    }
  }
}
</script>

<style>

</style>
