<template>
  <div class="MobileProjectSpecs">
      <loading-page v-if='loading'></loading-page>
      <div style='position: absolute;top: -103px;right: 0px;width: 100%;'>
        <router-link v-if="isEmpty" :to="'/details/'+ projectID +'/edit'" style="position:absolute; top:7px; right:0px;" class="button button__green">Edit App Spec</router-link>
        <router-link v-else :to="'/details/'+ projectID +'/create'" style="position:absolute;top:7px; right:0px;" class="button button__blue">Create</router-link>
      </div>
   <div class='scroll-container__tabs' v-if="isEmpty">
   <v-list class="document-list__group">
        <v-list-tile v-if="isEmpty" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title >label: {{loadedAppSpecs.specID}}</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
               {{loadedAppSpecs.createdAt}}
        </v-list-tile>
        <v-list-tile v-if="isEmpty" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title >More info</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
               date  
        </v-list-tile>
    </v-list>

    <v-list v-if="isEmpty" class="document-list__group" v-for="(document_group,group_name,index) in groupedDocuments" :key="index">
           <v-subheader class="document-list__header"><h3>{{group_name}}</h3></v-subheader>
            <p >Details</p>
                <v-divider :key="index"></v-divider>
            <v-list-tile class="document-list__item" v-for="doc in groupedDocuments[group_name]" :key="doc.id">
                <v-list-tile-content>
                  <v-list-tile-title v-html="doc.title"></v-list-tile-title>
                  <v-list-tile-sub-title >Uploaded: {{doc.createdAt}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                  <!-- <v-icon @click='download' class="button">vertical_align_bottom</v-icon> -->
                  <!-- <button class="button button__blue">Update</button> -->
                  <!-- <v-icon @click='deleteDocument(doc.id)' class="button button__red-text">delete</v-icon> -->
          </v-list-tile>
      </v-list>
</div>
    


        
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingPage from '../LoadingPage/LoadingPage';
import {VIcon, VSpacer,VDivider,VSubheader,VLayout, VList, VListTileContent, VListTileTitle, VListTileSubTitle, VListTile} from 'vuetify/lib';
export default {
  name: 'MobileProjectSpecs',
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
    VSpacer,
    VIcon
  },
  data () {
    return {
    }
  },
  methods:{
    downloadPriceList(path){
      console.log("sup")
    }
  },
  computed: {
    isEmpty() {
    for(var prop in  this.loadedAppSpecs) {
        if(this.loadedAppSpecs.hasOwnProperty(prop))
            return true;
    }
    return false
    },
    groupedDocuments(){
         let sortedAppSpecDocs = this.loadedAppSpecs.appspecdocs.sort((docA, docB) => {
            return docA.header.localeCompare(docB.header)
        })
          let groupedDocuments = {};
          for (let d = 0; d < sortedAppSpecDocs.length; d ++){
                  let doc = sortedAppSpecDocs[d];
                      if (groupedDocuments[doc.header] === undefined) {
                          groupedDocuments[doc.header] = []
                      }
                      groupedDocuments[doc.header].push(doc);
              }
          const orderedGroupedDocuments = {};
              Object.keys(groupedDocuments).sort().forEach((key) => {
                  orderedGroupedDocuments[key] = groupedDocuments[key];
              });
          return orderedGroupedDocuments
        },
     ...mapGetters([
      'loadedAppSpecs',
      'loading'
    ]),
  },
  mounted () {
    this.$store.dispatch('getAppSpecs', this.projectID)
  }
}
</script>

