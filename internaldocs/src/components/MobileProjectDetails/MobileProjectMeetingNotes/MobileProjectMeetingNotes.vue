<template>
    <div class="MobileProjectStatsInfo">
      
        <loading-page v-if='loading'></loading-page>
        <div class='scroll-container__tabs'>
            <v-list class="document-list__group">
                <CreateMobileProjectMeetingNote :projectID='projectID'></CreateMobileProjectMeetingNote>
            </v-list>
           <v-layout>
            <v-flex xs12 sm12 >
            <v-card v-for='meeting in loadedMeetingNotes' :key='meeting.id' style='margin: 10px 10px;'>
                <v-card-title primary-title>
                <div>
                    <h4 class="mb-0">Created by {{meeting.creatorName}} on {{formatDate(meeting.date)}}:</h4>
                    <div>{{meeting.title}}</div>
                </div>
                <v-spacer></v-spacer>
                    <router-link style='text-decoration:none;' :to="'/details/' + projectID + '/meeting/' + meeting.id" >
                        <span class='button button__green'>View</span>
                    </router-link>
                    
                    <button @click='deleteNote(meeting.id)' class='button button__red'>Delete</button>
                </v-card-title>
                
                <!-- <v-card-actions>
                    
                </v-card-actions> -->
            </v-card>
            </v-flex>
        </v-layout>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import CreateMobileProjectMeetingNote from './CreateMobileProjectMeetingNote'
import EditMobileProjectMeetingNote from './EditMobileProjectMeetingNote'
import LoadingPage from '../../LoadingPage/LoadingPage';
export default {
    props:["projectID"],
    components:{
        LoadingPage,
        CreateMobileProjectMeetingNote,
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
      
      ...mapGetters([
        'loading',
        'loadedMeetingNotes'
    ]),
  }
}
</script>
