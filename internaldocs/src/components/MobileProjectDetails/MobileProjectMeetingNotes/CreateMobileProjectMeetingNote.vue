<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
               <h1 class='title-container__title'>
                     <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Create New Stat Info</h1>
                 <button type="submit" @click='onSubmit' class=" button button__blue">{{buttonText}}</button>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
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
                    <v-textarea rows="10" name="Note" label="Note" v-model='note'></v-textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {VIcon} from "vuetify/lib";
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["id"],
  components:{
      VIcon,
      Datepicker
  },
  data () {
    return {
        buttonText: 'Create Meeting Note',
        formMode: 'create',
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
            projectID: this.id,
            creatorName: this.creatorName,
            date: this.date,
            note: this.note
        })
        // this.$store.dispatch("createStatInfo", {projectID: this.id, data: payload})
        this.$router.go(-1)
    }
  }
}
</script>

