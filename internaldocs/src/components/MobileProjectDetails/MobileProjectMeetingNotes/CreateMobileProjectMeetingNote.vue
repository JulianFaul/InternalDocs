<template>
        <v-dialog v-model="dialog" scrollable max-width="1200px">
        <template v-slot:activator="{ on }">
            <button style='float:right' class='button button__blue' v-on="on">Create New Info</button>
        </template>
        <v-card pa2>
            <v-card-title>Meeting Note
            <button class='button button__green' flat @click="onSubmit">Save</button>
                <v-spacer></v-spacer>
                <v-icon flat @click="dialog = false">close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
               <div class='form' v-on:submit.prevent>
                    <div class='form-section form-section__inline'>
                        <div>
                            <h4 class='form-section__title'>Note Title:</h4>
                            <v-text-field v-model='title' label='Note Title'></v-text-field>
                        </div>
                        <div>
                            <h4 class='form-section__title'>Attended By:</h4>
                            <v-text-field v-model='creatorName' label='Attended By'></v-text-field>
                        </div>
                         <div>
                            <h4 class='form-section__title'>Date:</h4>
                            <datepicker style='margin:0px;' name='datePublished' id='datePublished' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="date" v-model='date'></datepicker>
                        </div>
                    </div> 
                    <vue-editor v-model="note"></vue-editor>
                </div>
            </v-card-text>
            <v-divider></v-divider>
        
        </v-card>
        </v-dialog>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {VIcon} from "vuetify/lib";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["projectID"],
  components:{
      VIcon,
      Datepicker,
      VueEditor
  },
  data () {
    return {
      
        dialog: false,
        buttonText: 'Create Meeting Note',
        formMode: 'create',
            note: '',
            creatorName: '',
            date: new Date(),
            note: '',
            title: ''
    }
  },
  computed:{
      
  },
  methods: {
      customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onSubmit() {
        this.$store.dispatch("createMeetingNote", {
            projectID: this.projectID,
            creatorName: this.creatorName,
            date: this.date,
            note: this.note,
            title: this.title
        });
        this.dialog = false;
        // this.$store.dispatch("createStatInfo", {projectID: this.id, data: payload})
        // this.$router.go(-1)
    }
  }
}
</script>

