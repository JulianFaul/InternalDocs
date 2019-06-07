<template>
        <v-dialog v-model="dialog"  scrollable max-width="1200px">
        <template v-slot:activator="{ on }">
            <button class='button button__blue' v-on="on">Edit</button>
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
                            <v-text-field v-model='editedTitle' label='Note Title'></v-text-field>
                        </div>
                        <div>
                            <h4 class='form-section__title'>Attended By:</h4>
                            <v-text-field v-model='editedCreatorName' label='Attended By'></v-text-field>
                        </div>
                         <div>
                            <h4 class='form-section__title'>Date:</h4>
                            <datepicker style='margin:0px;' name='datePublished' id='datePublished' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="editedDate" v-model='editedDate'></datepicker>
                        </div>
                    </div> 
                    <vue-editor v-model="editedNote"></vue-editor>
                </div>
                
            </v-card-text>
            <v-divider></v-divider>
        
        </v-card>
        </v-dialog>
</template>

<script>

import {VIcon} from "vuetify/lib";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
import { VueEditor } from "vue2-editor";
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["projectID","meeting"],
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
            editedCreatorName:  this.meeting.creatorName,
            editedDate:         this.meeting.date,
            editedNote:         this.meeting.note,
            editedTitle:        this.meeting.title
    }
  },
  computed:{
      
  },
  methods: {
      customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onSubmit() {
    
        this.$store.dispatch("updateMeetingNote", {
            projectID: this.projectID,
            meetingID: this.meeting.id,
            creatorName: this.editedCreatorName,
            date: this.editedDate,
            note: this.editedNote,
            title: this.editedTitle
        });
        this.dialog = false;
    }
  }
}
</script>

