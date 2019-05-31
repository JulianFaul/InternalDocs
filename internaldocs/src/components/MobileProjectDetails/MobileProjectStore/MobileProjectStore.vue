<template>
    <div class="MobileProjectStore">
        <loading-page v-if='loading'></loading-page>
            <v-list class="document-list__group">
                <!-- <EditMobileProjectsStatInfo :projectID='projectID' :appInfo="loadedAppInfo" v-if='isEmpty'></EditMobileProjectsStatInfo> -->
                <CreateMobileProjectStore :projectID='projectID'></CreateMobileProjectStore>
            </v-list>
            <div  class='scroll-container__tabs'>
        <v-container grid-list-md v-if='loadedStoreInfo.length'>
            <v-layout row wrap>
            <v-flex xs6  style='border-right: 1px solid #dadada;' v-for="(document_group,group_name,index) in groupedStores" :key="index">
            
             <v-card-text style='font-weight:bold;' class="px-0">{{group_name}}</v-card-text>
                <v-flex style='position: relative;' v-if='doc.tag === "New"' xs12 v-for="doc in groupedStores[group_name]" :key="doc.id">
                
                  <v-icon @click='deleteStoreInfo(doc.id)' class='button__red-abosluteright'>delete</v-icon>
                 <router-link :to="{name: 'UpdateMobileProjectStore', params: {storeInfoID:doc.id, id:projectID, storeDetails: doc}}">
                    <v-icon class='button-abosluteright'>edit</v-icon>
                 </router-link>
                <div>
                <small style='font-size:15px;'>
                 <span style='font-weight:bold;'>Name on Store:</span>
                    <span style='font-weight:normal;'>{{doc.nameOnStore}}</span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'>Devices:</span>
                    <span style='font-weight:normal;' v-for='(device, index) in doc.devices' :key='index'>
                    {{(index ? ', ' : '') + device }}
                    </span>
                </small>
                </div>
                <div>
                 <small>
                 <span style='font-weight:bold;'>Date Submitted:</span>
                    <span style='font-weight:normal;' v-html="formatDate(doc.dateSubmitted)"></span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'> Date Published:</span>
                    <span style='font-weight:normal;' v-html="formatDate(doc.datePublished)"></span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'>Store Link:</span>
                    <span style='font-weight:normal;'>{{doc.storeLink}}</span>
                </small>
                </div>
                
                <div>
                <small>
                 <span style='font-weight:bold;'> Version:</span>
                    <span style='font-weight:normal;'>{{doc.version}}</span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'> Whats New:</span>
                    <span style='font-weight:normal;'>{{doc.whatsnew}}</span>
                </small>
                </div>
                </v-flex>
               

               
                <v-flex style='position: relative;' v-if='doc.tag === "Previous Version"' xs12 v-for="doc in groupedStores[group_name]" :key="doc.id">
                 <v-divider></v-divider>
                <v-card-text style='font-weight:bold;' class="px-0">Previous Version</v-card-text>
                 <v-icon @click='deleteStoreInfo(doc.id)' class=' button__red-abosluteright'>delete</v-icon>
                <div>
                <small style='font-size:15px;'>
                 <span style='font-weight:bold;'>Name on Store:</span>
                    <span style='font-weight:normal;'>{{doc.nameOnStore}}</span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'>Devices:</span>
                    <span style='font-weight:normal;' v-for='(device, index) in doc.devices' :key='index'>
                    {{(index ? ', ' : '') + device }}
                    </span>
                </small>
                </div>
                <div>
                 <small>
                 <span style='font-weight:bold;'>Date Submitted:</span>
                    <span style='font-weight:normal;' v-html="formatDate(doc.dateSubmitted)"></span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'> Date Published:</span>
                    <span style='font-weight:normal;' v-html="formatDate(doc.datePublished)"></span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'>Store Link:</span>
                    <span style='font-weight:normal;'>{{doc.storeLink}}</span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'> Version:</span>
                    <span style='font-weight:normal;'>{{doc.version}}</span>
                </small>
                </div>
                <div>
                <small>
                 <span style='font-weight:bold;'> Whats New:</span>
                    <span style='font-weight:normal;'>{{doc.whatsnew}}</span>
                </small>
                </div>
               
                </v-flex>
            </v-flex>
            </v-layout>
        </v-container>
        </div>
    </div>
</template>

<script>
import CreateMobileProjectStore from './CreateMobileProjectStore'
import LoadingPage from '../../LoadingPage/LoadingPage';
import { mapGetters } from 'vuex';
import moment from "moment";
export default {
    props:["projectID"],
    components:{
        LoadingPage,
        CreateMobileProjectStore
        },
    data () {
        return {
            hasIOS: false
        }
  },
  methods:{

      deleteStoreInfo(storeInfoID){
          this.$store.dispatch("deleteStoreInfo", storeInfoID)
      },
      formatDate(date){
       return moment(date).format('DD MMMM YYYY');
    }
  },
  
  computed: {
      groupedStores(){
        if(this.loadedStoreInfo.length){
            let stores = this.loadedStoreInfo;
            let groupedStores = {};
            for (let d = 0; d < stores.length; d ++){
                    let doc = stores[d];
                        if (groupedStores[doc.appType] === undefined) {
                            groupedStores[doc.appType] = []
                        }
                        groupedStores[doc.appType].push(doc);
                }
                const orderedGroupedDocuments = {};
                if(orderedGroupedDocuments.Android && orderedGroupedDocuments.Android.length){
                   orderedGroupedDocuments.Android.sort((projectA, projectB) => {
                       
                       return new Date(projectB.createdAt) - new Date(projectA.createdAt)
                    }) 
                }else{
                    orderedGroupedDocuments.Android = []
                }
                
                if(orderedGroupedDocuments.IOS && orderedGroupedDocuments.IOS.length){
                    orderedGroupedDocuments.IOS.sort((projectA, projectB) => {
                       return new Date(projectB.createdAt) - new Date(projectA.createdAt)
                    }) 
                    
                }else{
                    orderedGroupedDocuments.IOS = []
                }
                 Object.keys(groupedStores).sort().forEach((key) => {
                    orderedGroupedDocuments[key] = groupedStores[key];
                });
            
            return orderedGroupedDocuments
    }
},
      ...mapGetters([
        'loadedStoreInfo',
        'loading'
    ]),
  }
}
</script>
