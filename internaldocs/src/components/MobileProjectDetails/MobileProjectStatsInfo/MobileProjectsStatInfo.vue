<template>
    <div class="MobileProjectStatsInfo">
        <loading-page v-if='loading'></loading-page>
        <div style='position: absolute;top: -103px;right: 0px;width: 100%;'>
            <router-link v-if='isEmpty' :to="'/stat/' + projectID + '/edit/' + loadedAppInfo._id" style="position:absolute; top:7px; right:0px;" class="button button__green">Edit App Spec</router-link>
            <router-link v-else :to="{name: 'CreateMobileProjectsStatInfo'}" style="position:absolute; top:7px; right:0px;" class="button button__blue">Create New Stat Info</router-link>
        </div>
        <div v-if='isEmpty' class='scroll-container__tabs'>
            <v-list class="document-list__group">
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
