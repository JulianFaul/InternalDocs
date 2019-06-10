<template>
    <v-dialog v-model="dialog" scrollable max-width="1200px">
      <template v-slot:activator="{ on }">
        <button style='float:right' class='button button__blue' v-on="on">Create New Spec</button>
      </template>
      <v-card  >
          
        <v-card-title>Create New Stat Info
             <button class='button button__green' flat @click="onSubmit">Save</button>
             <button class='button button__green' flat @click="closeDialog()">Cancel</button>
            <v-spacer></v-spacer>
            <v-icon flat @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text >
           <div class='form-section'>
            <h3 class='form-section__title'>Product Type: {{productType}}</h3>
        </div>
        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App'" class='form-section'>
            <h4 class='form-section__title'>App will be used by: <button v-if='usedBy.length' @click="resetUsedBy" class="button button__sm-reset">Reset</button></h4>
            <v-checkbox @change='setRepDate()' class='form-section__checkbox' v-for="(option, index) in usedByList" :key="index" :label='option' :value="option" v-model="usedBy"></v-checkbox>
        </div>

        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App' || productType == 'MySpec'" class='form-section'>
            <h4 class='form-section__title'>Devices: <button v-if='devices.length' @click="resetDevices" class="button button__sm-reset">Reset</button></h4>
            <v-checkbox class='form-section__checkbox' v-for="(option, index) in devicesList" :key="index" :label='option' :value="option" v-model="devices"></v-checkbox>
        </div>
       
        <div v-if='devices.includes("Tablets") || devices.includes("Phones")' class='form-section'>
            <h4 class='form-section__title'>App can be found on stores: <button v-if='stores.length' @click="resetStores" class="button button__sm-reset">Reset</button></h4>
             <v-checkbox  @change='changeStores()' class='form-section__checkbox' v-for="(option, index) in storesList" :key="index" :label='option' :value="option" v-model="stores"></v-checkbox>
        </div>
        
       
        <div v-if="productType == 'Generic Blinds App' " class='form-section'>
            <h4 class='form-section__title'>Requires Ecommerce?</h4>
             <v-radio-group @change='setEcommerceDate' v-model="ecommerce" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </div>

        <div v-if="productType == 'Generic Blinds App' " class='form-section'>
            <h4 class='form-section__title'>Libraries to be Included:</h4>
         </div>

        <div v-if="productType == 'Generic Blinds App'"  class='form-section form-section__sub'>
            <h4 class='form-section__title'>Taylor Blinds:</h4>
                <v-checkbox class='' v-model='selectAllTaylor' @change='selectAllTaylorOptions' label='All'></v-checkbox>
                <v-checkbox @change='checkAllTaylor(selectedTaylorBlinds.length)' class='form-section__checkbox' v-for="(option, index) in TaylorBlinds" :key="index" :label='option' :value="option" v-model="selectedTaylorBlinds"></v-checkbox>
        </div>

        <div v-if="productType == 'Generic Blinds App'"  class='form-section form-section__sub'>
            <h4 class='form-section__title'>Luxaflex:</h4> 
                <v-checkbox class='' v-model='selectAllLuxaflex' @change='selectAllLuxaflexOptions' label='All'></v-checkbox>
                <v-checkbox @change='checkAllLuxaflex(selectedLuxaflex.length)' class='form-section__checkbox' v-for="(option, index) in Luxaflex" :key="index" :label='option' :value="option" v-model="selectedLuxaflex"></v-checkbox>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Document generated is:</h4>
            <v-select :items="selectedGeneratedDocs" label="Generated Document" v-model='generatedDoc'></v-select>
        </div>
       
        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App' " class='form-section'>
            <h4 class='form-section__title'>Multiple Pricelists?</h4>
             <v-radio-group @change='setMultiPricelistDate' v-model="multiPricelist" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </div>

        <div v-if='multiPricelist' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Pricelist Details</h4>
            <v-text-field v-model='priceListDetails' label='Pricelist Details'></v-text-field>
            <input style="display:none;" type="file" @change="onFileSelected($event, 'Pricelist Files')" multiple ref="onPriceListSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onPriceListSelected.click()">Upload Pricelists</button>
        </div>
        
        <div v-if='multiPricelist' class='form-section form-section__sub'>
            <h4 v-if='pricelistSelected' class='form-section__title'>Selected Pricelists</h4>
             <div v-for="(file, key) in files" :key="key" v-if='files[key].header == "Pricelist Files"'  class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App' " class='form-section'>
            <h4 class='form-section__title'>Do you have set statuses?</h4>
             <v-radio-group @change='changeSetStatusDate' v-model="setStatus" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </div>

        <div v-if='setStatus' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Status Details</h4>
            <v-text-field v-model='setStatusDetails' label='Status Details'></v-text-field>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Status Files')" multiple ref="onSetStatusSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onSetStatusSelected.click()">Upload Statuses</button>
        </div>
        <div v-if='setStatus' class='form-section form-section__sub'>
            <h4 v-if='statusSelected' class='form-section__title'>Selected Statuses</h4>
             <div v-for="(file, key) in files" :key="key" v-if='files[key].header == "Status Files"' class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>


        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App' && usedBy.includes('Reps')" class='form-section'>
            <h4 class='form-section__title'>List of Reps</h4>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Rep Files')" ref="onListofRepsSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onListofRepsSelected.click()">Upload List of Reps</button>
        </div>
        <div v-if="usedBy.includes('Reps')" class='form-section form-section__sub'>
           <h4 v-if='repsSelected' class='form-section__title'>Selected List of Reps</h4>
             <div v-for="(file, key) in files" :key="key" v-if='files[key].header == "Rep Files"' class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>


        <div v-if="productType == 'MyQuote' || productType == 'Generic Blinds App' && usedBy.includes('Customers')" class='form-section'>
            <h4 class='form-section__title'>List of Customers</h4>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Customer Files')" ref="onListofCustomersSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onListofCustomersSelected.click()">Upload List of Customers</button>
        </div>
        <div v-if="usedBy.includes('Customers')" class='form-section form-section__sub'>
           <h4 v-if='customersSelected' class='form-section__title'>Selected List of Reps</h4>
             <div v-for="(file, key) in files" :key="key" v-if='files[key].header == "Customer Files"' class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>



        <div class='form-section'>
            <h4 class='form-section__title'>Who to contact when we have Maintenance or Technical Problems? <button @click='resetMaintenanceDetails' v-if='maintenanceContactName || maintenanceContactEmail' class="button button__sm-reset">Reset</button></h4>
            <div class='form-section__details'>
                <v-text-field  label="Name" v-model="maintenanceContactName"></v-text-field>
                <v-text-field  label="Email" v-model="maintenanceContactEmail"></v-text-field>
            </div>
        </div>

        <div v-if="productType == 'MySpec'" class='form-section'>
            <h4 class='form-section__title'>Who do Quote Requests go to? <button v-if='quoteRequestName || quoteRequestEmail || quoteRequestRegion' @click='resetQuoteRequest' class="button button__sm-reset">Clear</button></h4>
             <div class='form-section__details'>
                <v-text-field v-model='quoteRequestName' label="Name"></v-text-field>
                <v-text-field v-model='quoteRequestEmail' label="Email"></v-text-field>
                <v-text-field v-model='quoteRequestRegion' label="Region"></v-text-field>
            </div>
            <button :disabled='!quoteRequestName || !quoteRequestEmail || !quoteRequestRegion' style="margin:0px;" @click='setQuoteRequestDetails' class='button button__green'>Add Details</button>
        </div>

        <div v-if='quoteRequestDetails.length' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Added Quote Request Details</h4>
            <div v-for="(detail, key) in quoteRequestDetails" :key="key">• {{ detail.name }} - {{detail.email}} : {{detail.region}}
              <v-icon @click='removeQuoteDetails( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>
        
        <div v-if="productType == 'MySpec'" class='form-section'>
            <h4 class='form-section__title'>Who do Contact me Requests go to? <button v-if='contactMeName || contactMeEmail || contactMeRegion' @click='resetContactMeDetails' class="button button__sm-reset">Reset</button></h4>
             <div class='form-section__details'>
                <v-text-field v-model='contactMeName' label="Name"></v-text-field>
                <v-text-field v-model='contactMeEmail' label="Email"></v-text-field>
                <v-text-field v-model='contactMeRegion' label="Region"></v-text-field>
            </div>
            <button :disabled='!contactMeName || !contactMeEmail || !contactMeRegion' style="margin:0px;" @click='setContactMeDetails' class='button button__green'>Add Details</button>
        </div>
        <div v-if='contactMeDetails.length' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Added Quote Request Details</h4>
            <div v-for="(detail, key) in contactMeDetails" :key="key">• {{ detail.name }} - {{detail.email}} : {{detail.region}}
              <v-icon @click='removeContactMeDetails( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Special Comments <button v-if='specialComments' @click='resetComments' class="button button__sm-reset">Reset</button></h4>
            <v-text-field v-model='specialComments' label="Special Comments"></v-text-field>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Project Due By? <button v-if='dueDate' @click='resetDueDate' class="button button__sm-reset">Reset</button></h4>
            <datepicker style='margin:0px;' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="dueDate" v-model='dueDate'></datepicker>
        </div>
        </v-card-text>
        <v-divider></v-divider>
       
      </v-card>
    </v-dialog>
</template>

<script>


import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import { mapGetters } from 'vuex';

export default {
  name: 'CreateMobileProjectDetailsPage',
  props: ["projectID"],
  components:{
    Datepicker
  },
  data () {
    return {
        buttonText: 'Create Project Spec',
        formMode: 'create',
        quoteRequestName: '',
        quoteRequestEmail: '',
        quoteRequestRegion: '',
        contactMeName: '',
        contactMeEmail: '',
        contactMeRegion: '',
        repsSelected: false,
        customersSelected: false,
        statusSelected: false,
        pricelistSelected: false,
        
        usedByList: ['Public', 'Reps', 'Customers'],
        devicesList: ['Desktop', 'Tablets', 'Phones'],
        storesList: ['iTunes', 'Google Play'],

        selectAllTaylor: false,
        selectAllLuxaflex: false,
        TaylorBlinds:  ['Woven blinds','Vertical blinds','Roller blinds','Shutters'],
        Luxaflex:      ['Roller blinds','Fabric blinds','Vertical blinds'],

        generatedDocs: ['Estimate', 'Quote', 'Credit Note', 'Specification'],
        dialog:false,
        usedBy:                     [],
        devices:                    [],
        stores:                     [],
        selectedTaylorBlinds:       [],
        selectedLuxaflex:           [],
        generatedDoc:               '',
        multiPricelist:             false,
        ecommerce:                  false,
        ecommerceDate:              '',
        multiPricelistDate:         '',
        priceListDetails:           '',
        setStatus:                  false,
        setStatusDate:              '',
        setStatusDetails:           '',
        maintenanceContactName:     '',
        maintenanceContactEmail:    '',
        quoteRequestDetails:        [],
        contactMeDetails:           [],
        specialComments:            '',
        setRepsDate:                '',
        dueDate:                    '',
        files:                      []
        
    }
  },
  computed:{
      ...mapGetters([
        'user'
    ]),
      productType(){
         return this.$store.getters.loadedProject(this.projectID).productType;
      },
      
        selectedGeneratedDocs(){
            if(this.productType == 'MySpec'){
                this.generatedDocs = ['Specification'];
                this.generatedDoc = 'Specification'
            }else if(this.productType == 'MyQuote'){
                this.generatedDocs = ['Estimate', 'Quote', 'Credit Note'];
            }
            return this.generatedDocs
        }
  },
  methods:{
      closeDialog(){
        this.dialog = false;
        this.usedBy=                     [],
        this.devices=                  [],
        this.stores=                    [],
        this.selectedTaylorBlinds=       [],
        this.selectedLuxaflex=           [],
        this.generatedDoc=              '',
        this.multiPricelist=             false,
        this.ecommerce=                 false,
        this.ecommerceDate=              '',
        this.multiPricelistDate=         '',
        this.priceListDetails=          '',
        this.setStatus=                false,
        this.setStatusDate=             '',
        this.setStatusDetails=          '',
        this.maintenanceContactName=     '',
        this.maintenanceContactEmail=    '',
        this.quoteRequestDetails=      [],
        this.contactMeDetails=          [],
        this.specialComments=            '',
        this.setRepsDate=               '',
        this.dueDate=                   '',
        this.files=                     []
      },
        changeStores(){
          if(!this.devices.length){
              this.stores = [];
          }
      },
        checkAllLuxaflex(length){
          if(length === this.Luxaflex.length){
              this.selectAllLuxaflex = true
          }else{
              this.selectAllLuxaflex =  false;
          }
          
      },
        selectAllLuxaflexOptions(){
            this.selectedLuxaflex = [];
            if(this.selectAllLuxaflex){
                for(let item in this.Luxaflex){
                    this.selectedLuxaflex.push(this.Luxaflex[item])
                }
            }
        },
      checkAllTaylor(length){
          if(length === this.TaylorBlinds.length){
              this.selectAllTaylor = true
          }else{
              this.selectAllTaylor =  false;
          }
          
      },
        selectAllTaylorOptions(){
            this.selectedTaylorBlinds = [];
            if(this.selectAllTaylor){
                for(let item in this.TaylorBlinds){
                    this.selectedTaylorBlinds.push(this.TaylorBlinds[item])
                }
            }
        },
        deleteFile(doc){
            this.$store.dispatch('deleteDocument', doc.id)
        },
        customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        resetDueDate(){
            this.dueDate = ''
        },
        resetComments(){
            this.specialComments = '';
        },
        resetContactMeDetails(){
            this.contactMeName = '';
            this.contactMeEmail = '';
            this.contactMeRegion = '';
        },
        resetQuoteRequest(){
            this.quoteRequestName = '';
            this.quoteRequestEmail = '';
            this.quoteRequestRegion = '';
        },
        resetMaintenanceDetails(){
            this.maintenanceContactName = '';
            this.maintenanceContactEmail = '';
        },
        resetGeneratedDoc(){
            this.generatedDoc = '';
        },
        resetStores(){
            this.devices = [];
            this.stores = [];
        },
        resetDevices(){
            this.devices = [];
        },
        resetUsedBy(){
            this.usedBy = [];
        },
        setContactMeDetails(){
             let details = {
                name: this.contactMeName,
                email: this.contactMeEmail,
                region: this.contactMeRegion
            }
            this.contactMeDetails.push(details);
            this.contactMeName = '';
            this.contactMeEmail = '';
            this.contactMeRegion = '';
        },
        setQuoteRequestDetails(){
            let details = {
                name: this.quoteRequestName,
                email: this.quoteRequestEmail,
                region: this.quoteRequestRegion
            }
            this.quoteRequestDetails.push(details);
            this.quoteRequestName = '';
            this.quoteRequestEmail = '';
            this.quoteRequestRegion = '';
        },
        setRepDate() {
            if(this.usedBy.includes('Reps')){
                this.setRepsDate = moment().format();
            }else{
                this.setRepsDate = '';
            }
        },
        setEcommerceDate(){
            this.ecommerceDate = moment().format();
        },
        setMultiPricelistDate(){
            this.multiPricelistDate = moment().format();
        },
        changeSetStatusDate(){
           this.setStatusDate = moment().format();
        },
        onFileSelected(event, header){
            let files =  event.target.files;
            if(header === 'Pricelist Files'){
                this.pricelistSelected = true
            }
            if(header === 'Rep Files'){

                this.repsSelected = true
            }
            if(header === 'Status Files'){
                this.statusSelected = true
            }
            for( var i = 0; i < files.length; i++ ){
                files[i].header = header;
                
                this.files.push( files[i] );
            }
        },
        removeFile( key ){
            this.files.splice( key, 1 );
            let files = this.files;
            let vm = this;
            setTimeout(function(){
                var headers = [];
                for(var key in files){
                    headers.push(files[key].header)
                }
                if(!headers.includes("Pricelist Files") || headers.length === 0 ){
                    vm.pricelistSelected = false
                }
                vm.repsSelected = false
                if(!headers.includes("Status Files") || headers.length === 0){
                    vm.statusSelected = false
                }
            }, 10);

        },
        onSubmit(){
            let payload = {
                userID:                     this.user.id,
                userName:                   this.user.userName,
                projectID:                  this.projectID,
                usedBy:                     this.usedBy,
                devices:                    this.devices,
                stores:                     this.stores,
                luxaflex:                   this.selectedLuxaflex,
                taylorBlinds:               this.selectedTaylorBlinds,
                generatedDoc:               this.generatedDoc,
                ecommerceDate:              this.ecommerceDate,
                ecommerce:                  this.ecommerce,
                multiPricelist:             this.multiPricelist,
                multiPricelistDate:         this.multiPricelistDate,
                priceListDetails:           this.priceListDetails,
                setStatus:                  this.setStatus,
                setStatusDate:              this.setStatusDate,
                setStatusDetails:           this.setStatusDetails,
                maintenanceContactName:     this.maintenanceContactName,
                maintenanceContactEmail:    this.maintenanceContactEmail,
                quoteRequestDetails:        this.quoteRequestDetails,
                contactMeDetails:           this.contactMeDetails,
                specialComments:            this.specialComments,
                setRepsDate:                this.setRepsDate,
                dueDate:                    this.dueDate,
                files:                      this.files
            }
            this.$store.dispatch("createAppSpecs",payload);
            this.dialog = false;
        }
  }
}
</script>

