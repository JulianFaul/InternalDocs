<template>
    <div class="MobileProjectStatsInfo">
      
        <loading-page v-if='loading'></loading-page>
        <div style='position: absolute;top: -103px;right: 0px;width: 100%;'>
            <!-- <router-link v-if='isEmpty' :to="'/stat/' + projectID + '/edit/' + loadedAppInfo._id" style="position:absolute; top:7px; right:0px;" class="button button__green">Edit App Spec</router-link> -->
            <router-link  :to="{name: 'CreateMobileProjectMeetingNote'}" style="position:absolute; top:7px; right:0px;" class="button button__blue">Create New Meeting Note</router-link>
        </div>
        <div class='scroll-container__tabs'>
          
           <v-layout>
            <v-flex xs12 sm12 >
            <v-card v-for='meeting in loadedMeetingNotes' :key='meeting.id' style='margin-top:10px;'>
                <v-card-title primary-title>
                <div>
                    <h4 class="mb-0">Created by {{meeting.creatorName}} on {{formatDate(meeting.date)}}:</h4>
                    <div>{{meeting.note}} </div>
                </div>
                </v-card-title>
              
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <button class='button button__green'>Edit</button>
                    <button @click='deleteNote(meeting.id)' class='button button__red'>Delete</button>
                </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { VSpacer,VDivider,VSubheader,VLayout, VList, VListTileContent, VListTileTitle, VListTileSubTitle, VListTile} from 'vuetify/lib';
export default {
    props:["projectID"],
    components:{
        LoadingPage,
        VDivider,
        VSubheader,
        VLayout,
        VList,
        VListTile,
        VListTileContent,
        VListTileTitle,
        VListTileSubTitle,
        VSpacer
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
