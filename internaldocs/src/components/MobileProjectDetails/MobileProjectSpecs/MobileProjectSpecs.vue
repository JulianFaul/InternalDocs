<template>
  <div class="MobileProjectSpecs">
 
      <loading-page v-if='loading'></loading-page>
      <div style='position: absolute;top: -103px;right: 0px;width: 100%;'>
        <router-link v-if="isEmpty" :to="'/details/'+ projectID +'/edit/' + loadedAppSpecs.specID" style="position:absolute; top:7px; right:0px;" class="button button__green">Edit App Spec</router-link>
        <router-link v-else :to="'/details/'+ projectID +'/create'" style="position:absolute;top:7px; right:0px;" class="button button__blue">Create New Spec</router-link>
      </div>
   <div class='scroll-container__tabs' v-if="isEmpty">
   <v-list v-if="isEmpty" class="document-list__group">
        <v-list-tile v-if="loadedAppSpecs.usedBy.length" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Used By:</b></v-list-tile-title>
                <v-list-tile-title >
                    <span v-for="(usedBy, index) in loadedAppSpecs.usedBy" :key='index'>
                        {{(index ? ', ' : '') + usedBy }}
                    </span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile  v-if="loadedAppSpecs.devices.length" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Devices: </b></v-list-tile-title>
                <v-list-tile-title >
                    <span v-for="(device, index) in loadedAppSpecs.devices" :key='index'>
                        {{(index ? ', ' : '') + device }}
                    </span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile  v-if="loadedAppSpecs.stores.length" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Stores: </b></v-list-tile-title>
                <v-list-tile-title >
                    <span v-for="(store, index) in loadedAppSpecs.stores" :key='index'>
                         {{(index ? ', ' : '') + store }}
                    </span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile  v-if="loadedAppSpecs.generatedDoc" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Generated Document: </b></v-list-tile-title>
                <v-list-tile-title >{{loadedAppSpecs.generatedDoc}}</v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile  v-if="isEmpty" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Multiple Pricelists: </b></v-list-tile-title>
                <v-list-tile-title>
                  <span v-if='loadedAppSpecs.multiPricelist'>Yes</span>
                  <span v-else>No</span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <span v-if='loadedAppSpecs.multiPricelist'>{{formatedDate(loadedAppSpecs.multiPricelistDate)}}</span>
        </v-list-tile>

        <v-list-tile  v-if="loadedAppSpecs.priceListDetails" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Pricelists Details: </b></v-list-tile-title>
                <v-list-tile-title>
                  {{loadedAppSpecs.priceListDetails}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile  v-if="isEmpty" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Set Statuses: </b></v-list-tile-title>
                <v-list-tile-title>
                  <span v-if='loadedAppSpecs.setStatus'>Yes</span>
                  <span v-else>No</span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <span v-if='loadedAppSpecs.setStatus'>{{formatedDate(loadedAppSpecs.setStatusDate)}}</span>
        </v-list-tile>

        <v-list-tile v-if="loadedAppSpecs.setStatusDetails" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Status Details: </b></v-list-tile-title>
                <v-list-tile-title>
                  {{loadedAppSpecs.setStatusDetails}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Used By Reps</b></v-list-tile-title>
                <v-list-tile-title>
                    <span v-if="loadedAppSpecs.usedBy.includes('Reps')">Yes</span>
                    <span v-else>No</span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
             <span v-if="loadedAppSpecs.usedBy.includes('Reps')">{{formatedDate(loadedAppSpecs.setRepsDate)}}</span>
        </v-list-tile>

        <v-list-tile v-if="loadedAppSpecs.maintenanceContactName" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Who to contact when we have Maintenance or Technical Problems? </b></v-list-tile-title>
                <v-list-tile-title>
                  {{loadedAppSpecs.maintenanceContactName}} - {{loadedAppSpecs.maintenanceContactEmail}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list three-line v-if='loadedAppSpecs.quoteRequestDetails.length'>
           <v-subheader class="document-list__header"><h3>Who do Quote Requests go to?</h3></v-subheader>
            <v-list-tile v-for='(details, index) in loadedAppSpecs.quoteRequestDetails' :key='index' class="document-list__item">
                <v-list-tile-content>
                  <v-list-tile-title>Name: {{details.name}}</v-list-tile-title>
                  <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Region: {{details.region}}</v-list-tile-sub-title>
                   <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Email: {{details.email}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
          </v-list-tile>
        </v-list>

        <v-list three-line v-if='loadedAppSpecs.contactMeDetails.length'>
           <v-subheader class="document-list__header"><h3>Who do Contact me Requests go to?</h3></v-subheader>
            <v-list-tile v-for='(details, index) in loadedAppSpecs.contactMeDetails' :key='index' class="document-list__item">
                <v-list-tile-content>
                  <v-list-tile-title>Name: {{details.name}}</v-list-tile-title>
                  <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Region: {{details.region}} - Email: {{details.email}}</v-list-tile-sub-title>
                  <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Email: {{details.email}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
          </v-list-tile>
        </v-list>
    
        <v-list-tile v-if="loadedAppSpecs.specialComments" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Special Comments</b></v-list-tile-title>
                <v-list-tile-title>
                  {{loadedAppSpecs.specialComments}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile v-if="isEmpty" class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>App Due By:</b></v-list-tile-title>
                <v-list-tile-title>
                  {{formatedDate(loadedAppSpecs.dueDate)}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list v-if="isEmpty" class="document-list__group" v-for="(document_group,group_name,index) in groupedDocuments" :key="index">
           <v-subheader class="document-list__header"><h3>{{group_name}}</h3></v-subheader>
                <v-divider :key="index"></v-divider>
            <v-list-tile class="document-list__item" v-for="doc in groupedDocuments[group_name]" :key="doc.id">
                <v-list-tile-content>
                  <v-list-tile-title v-html="doc.filename"></v-list-tile-title>
                  <v-list-tile-sub-title >Uploaded: {{doc.createdAt}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                  <v-icon @click='downloadFile(doc.path, doc.filename)'  class="button">vertical_align_bottom</v-icon> 
                  <button class="button button__blue">Update</button> 
                  <v-icon @click='deleteFile(doc)' class="button button__red-text">delete</v-icon> 
          </v-list-tile>
      </v-list>
    </v-list>
</div>
    


        
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingPage from '../../LoadingPage/LoadingPage';
import moment from 'moment'
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
    deleteFile(doc){
        this.$store.dispatch('deleteDocument', doc.id)
    },
    formatedDate(date){
      return moment(date).format('DD/MM/YYYY')
    },
    downloadFile(path, filename){
      this.$store.dispatch('downloadFile', {'url': path, 'filename': filename})
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
  created () {
   
  }
}
</script>

