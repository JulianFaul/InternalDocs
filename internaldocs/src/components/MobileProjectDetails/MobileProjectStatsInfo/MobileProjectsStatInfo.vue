<template>
    <div class="MobileProjectStatsInfo">
        <loading-page v-if='loading'></loading-page>
    
        <div class='scroll-container__tabs'>
            <v-list class="document-list__group">
                <EditMobileProjectsStatInfo :projectID='projectID' :appInfo="loadedAppInfo" v-if='isEmpty'></EditMobileProjectsStatInfo>
                <CreateMobileProjectsStatInfo v-else :projectID='projectID'></CreateMobileProjectsStatInfo>
            </v-list>
            <v-list v-if='isEmpty'>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>URL</b></v-list-tile-title>
                        <v-list-tile-title >
                            {{loadedAppInfo.url}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Username</b></v-list-tile-title>
                        <v-list-tile-title >
                            {{loadedAppInfo.username}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Password</b></v-list-tile-title>
                        <v-list-tile-title >
                            {{loadedAppInfo.password}}
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
            </v-list>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingPage from '../../LoadingPage/LoadingPage';
import EditMobileProjectsStatInfo from './EditMobileProjectsStatInfo'
import CreateMobileProjectsStatInfo from './CreateMobileProjectsStatInfo'
export default {
    props:["projectID"],
    components:{
        LoadingPage,
        EditMobileProjectsStatInfo,
        CreateMobileProjectsStatInfo
    },
    data () {
        return {

        }
  },
  computed: {
    isEmpty() {
        for(var prop in  this.loadedAppInfo) {
            if(this.loadedAppInfo.hasOwnProperty(prop))
                return true;
        }
        return false
    },
      ...mapGetters([
        'loadedAppInfo',
        'loading'
    ]),
  }
}
</script>
