<template>
    <div class="MobileProjectStore">
        <loading-page v-if='loading'></loading-page>
        <div style='position: absolute;top: -103px;right: 0px;width: 100%;'>
            <!-- <router-link v-if='isEmpty' :to="'/stat/' + projectID + '/edit/' + loadedAppInfo._id" style="position:absolute; top:7px; right:0px;" class="button button__green">Edit App Spec</router-link> -->
            <router-link :to="'/store/' + projectID + '/create'" style="position:absolute; top:7px; right:0px;" class="button button__blue">Create</router-link>
        </div>
        <div  class='scroll-container__tabs'>
            <v-list class="document-list__group">
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Name On Store:</b></v-list-tile-title>
                        <v-list-tile-title >
                            sss
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Devices:</b></v-list-tile-title>
                        <v-list-tile-title >
                           sss
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Date submitted:</b></v-list-tile-title>
                        <v-list-tile-title >
                           date
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Date published:</b></v-list-tile-title>
                        <v-list-tile-title >
                           date
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Version</b></v-list-tile-title>
                        <v-list-tile-title >
                           1.2
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Whats New</b></v-list-tile-title>
                        <v-list-tile-title >
                           Notes
                        </v-list-tile-title>
                    </v-list-tile-content>
                    <v-spacer></v-spacer>
                </v-list-tile>
                <v-list-tile class="document-list__item">
                    <v-list-tile-content>
                        <v-list-tile-title ><b>Link to store</b></v-list-tile-title>
                        <v-list-tile-title >
                           Notes
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
 
      ...mapGetters([
        'loading'
    ]),
  }
}
</script>
