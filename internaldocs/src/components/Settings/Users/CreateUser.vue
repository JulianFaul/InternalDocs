<template>
  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <button class='button button__green' v-on="on">Add User</button>
      </template>
       <v-form ref="form" v-model="valid">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field :rules='nameRules' id='userName' v-model='userName' label="First name*" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-text-field :rules='lastnameRules' id='lastname' v-model='lastname' label="Last name"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules='emailRules' id='email' v-model='email' label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field :rules='passwordRules' id='password' v-model='password' label="Password*" type="password" required></v-text-field>
              </v-flex>
             
              <v-flex xs6>
                <v-autocomplete
                 required
                  :items="departments"
                  label="Department*"
                  v-model='department'
                ></v-autocomplete>
              </v-flex>
              <v-flex xs6>
                <v-autocomplete
                 required
                  :items="roles"
                  label="Role*"
                  v-model='role'
                ></v-autocomplete>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled='!valid' color="blue darken-1" flat @click="createUser">Create User</v-btn>
           <v-btn  color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
       </v-form>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      lastnameRules: [
        v => v.length <= 10 || 'Last name must be less than 10 characters'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required'
      ],
      roles: ['Admin', 'User'],
      departments: ['Dev', 'CRM', 'Production'],
      userName: '',
      lastname: '',
      email: '',
      password: '',
      department: 'Dev',
      role: 'User'
    }),
    methods: {
      createUser(){
        if(!this.valid){
          return
        }
        let user = {
          userName: this.userName,
          lastname: this.lastname,
          email: this.email,
          password: this.password,
          department: this.department,
          role: this.role
        }
        this.$store.dispatch('createUser', user)
        this.dialog = false

      }
    }
  }
</script>