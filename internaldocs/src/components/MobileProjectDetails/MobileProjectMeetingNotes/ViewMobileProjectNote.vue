<template>
    <div class="MobileProjectStatsInfo">
        <div class='content-container'>
        <div class='mobile-projects-page'>
        <div class='title-container'>
            <h1 class='title-container__title' style="margin: 6px 0px;">
            <router-link :to='"/details/" + id'>
                <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
            </router-link> 
               {{meeting.title}} 
                 <EditMobileProjectMeetingNote :projectID='id' :meeting='meeting'></EditMobileProjectMeetingNote></h1>
        </div>
          
            <div class='scroll-container'>
                
                 <h3>Creator Name: {{meeting.creatorName}}</h3>
                <div v-html='meeting.note'></div>
            </div>
        </div>
          
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';

import EditMobileProjectMeetingNote from './EditMobileProjectMeetingNote'

export default {
    props:["id","meetingID"],
    components:{
        EditMobileProjectMeetingNote
    },
    data () {
        return {

        }
  },
  methods: {
      formatDate(date){
           return moment(date).format('DD MMMM YYYY');
      },
      deleteNote(meetingID){
          this.$store.dispatch("deleteMeetingNote", {projectID: this.projectID, meetingID:meetingID})
      }
  },
  computed: {
      meeting(){
          return this.$store.getters.loadedMeetingNote(this.meetingID)
      },
      ...mapGetters([
        'loading'
    ]),
  }
}
</script>
