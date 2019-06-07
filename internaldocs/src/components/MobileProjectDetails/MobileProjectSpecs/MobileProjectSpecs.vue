<template>
  <div class="MobileProjectSpecs">
 
      <loading-page v-if='loading'></loading-page>
   
    <v-list class="">
        <EditMobileProjectSpec v-if="isEmpty" :projectID='projectID' :projectDetailsData='formatedAppSpecs' >Edit App Spec</EditMobileProjectSpec>
        <CreateMobileProjectSpec v-else :projectID='projectID' ></CreateMobileProjectSpec>
   </v-list>

   <div class='scroll-container__tabs'>
   <v-list v-if="isEmpty" class="document-list__group">
        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Used By:</b></v-list-tile-title>
                <v-list-tile-title>
                    <span class='required-info' v-if='!loadedAppSpecs.usedBy.length'>
                        Required 
                    </span>
                    <span v-else v-for="(usedBy, index) in loadedAppSpecs.usedBy" :key='index'>
                        {{(index ? ', ' : '') + usedBy }}
                    </span>
                   
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Devices: </b></v-list-tile-title>
                <v-list-tile-title >
                    <span class='required-info' v-if='!loadedAppSpecs.devices.length'>
                        Required 
                    </span>
                    <span v-for="(device, index) in loadedAppSpecs.devices" :key='index'>
                        {{(index ? ', ' : '') + device }}
                    </span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile v-if='loadedAppSpecs.devices.includes("Phones") || loadedAppSpecs.devices.includes("Tablets")' class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Stores: </b></v-list-tile-title>
                <v-list-tile-title >
                    <span class='required-info' v-if='!loadedAppSpecs.stores.length'>
                        Required 
                    </span>
                    <span v-for="(store, index) in loadedAppSpecs.stores" :key='index'>
                         {{(index ? ', ' : '') + store }}
                    </span>
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>
        
        <div>
        <div style='padding-left:15px;'><h4>Libraries to be included:</h4></div>
            <div style='padding-left:15px;'>
            
            <v-list-tile v-if="productType == 'Generic Blinds App'" class="document-list__item">
                <v-list-tile-content>
                    <v-list-tile-title ><b>Luxaflex: </b></v-list-tile-title>
                    <v-list-tile-title >
                        <span class='required-info' v-if='!loadedAppSpecs.luxaflex.length'>
                            Required 
                        </span>
                        <span v-for="(store, index) in loadedAppSpecs.luxaflex" :key='index'>
                            {{(index ? ', ' : '') + store }}
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
            </v-list-tile>

            <v-list-tile v-if="productType == 'Generic Blinds App'" class="document-list__item">
                <v-list-tile-content>
                    <v-list-tile-title ><b>Taylor Blinds: </b></v-list-tile-title>
                    <v-list-tile-title >
                        <span class='required-info' v-if='!loadedAppSpecs.taylorBlinds.length'>
                            Required 
                        </span>
                        <span v-for="(store, index) in loadedAppSpecs.taylorBlinds" :key='index'>
                            {{(index ? ', ' : '') + store }}
                        </span>
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
            </v-list-tile>
            
            </div>
        </div>

        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Generated Document: </b></v-list-tile-title>
                <v-list-tile-title v-if='loadedAppSpecs.generatedDoc'>{{loadedAppSpecs.generatedDoc}}</v-list-tile-title>
                <v-list-tile-title  class='required-info' v-else>
                        Required 
                    </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile class="document-list__item">
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

        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Pricelists Details: </b></v-list-tile-title>
                <v-list-tile-title v-if='loadedAppSpecs.priceListDetails'>
                  {{loadedAppSpecs.priceListDetails}}
                </v-list-tile-title>
                 <v-list-tile-title  class='required-info' v-else>
                        Required 
                    </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list-tile class="document-list__item">
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

        <v-list-tile class="document-list__item">
            <v-list-tile-content>
                <v-list-tile-title ><b>Who to contact when we have Maintenance or Technical Problems? </b></v-list-tile-title>
                <v-list-tile-title>
                  {{loadedAppSpecs.maintenanceContactName}} - {{loadedAppSpecs.maintenanceContactEmail}}
                </v-list-tile-title>
            </v-list-tile-content>
            <v-spacer></v-spacer>
        </v-list-tile>

        <v-list three-line>
           <v-subheader class="document-list__header"><h3>Who do Quote Requests go to?</h3></v-subheader>
            <v-list-tile v-if='!loadedAppSpecs.quoteRequestDetails.length'>
              <v-list-tile-title  class='required-info'>
                        Required 
                </v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-else v-for='(details, index) in loadedAppSpecs.quoteRequestDetails' :key='index' class="document-list__item">
                <v-list-tile-content>
                  <v-list-tile-title>Name: {{details.name}}</v-list-tile-title>
                  <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Region: {{details.region}}</v-list-tile-sub-title>
                   <v-list-tile-sub-title style='color:rgba(0, 0, 0, 0.87);font-size:16px;'>Email: {{details.email}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
          </v-list-tile>
          
        </v-list>

        <v-list three-line v-if="productType == 'MySpec'">
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
    
        <v-list-tile class="document-list__item">
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
                  <UpdateSpecDoc :specDocID='doc.id'></UpdateSpecDoc>
                  <!-- <button @click='updateFile(doc.id)' class="button button__blue">Update</button>  -->
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
import CreateMobileProjectSpec from './CreateMobileProjectSpec'
import EditMobileProjectSpec from './EditMobileProjectSpec'
import UpdateSpecDoc from './UpdateSpecDoc'
export default {
  name: 'MobileProjectSpecs',
  props:["projectID"],
  components:{
    LoadingPage,
    CreateMobileProjectSpec,
    EditMobileProjectSpec,
    UpdateSpecDoc
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
      productType(){
         return this.$store.getters.loadedProject(this.projectID).productType;
      },
      formatedAppSpecs(){
          let docs = this.loadedAppSpecs.appspecdocs;
          let existingPricelists = [];
          let existingRepFiles = [];
          let existingStatusFiles = [];
          let existingCustomerFiles = [];
          for(let key in docs){
              let doc = docs[key];
              let header = docs[key].header
              if(header === 'Pricelist Files'){
                  existingPricelists.push(doc)
              }
              if(header === 'Rep Files'){
                  existingRepFiles.push(doc)
              }
              if(header === 'Status Files'){
                  existingStatusFiles.push(doc)
              }
              if(header === 'Customer Files'){
                  existingCustomerFiles.push(doc)
              }
          }
             return {
                ...this.loadedAppSpecs,
                existingPricelists,
                existingRepFiles,
                existingStatusFiles,
                existingCustomerFiles
              }
      },
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

