<template>
 
       
        <div class='form' v-on:submit.prevent>
            <button type="submit" @click='onSubmit' class="button__absolute-right button button__blue">{{buttonText}}</button>
       
        <div class='form-section'>
            <h3 class='form-section__title'>Product Type: {{productType}}</h3>
        </div>
    

        <div v-if="productType == 'MyQuote'" class='form-section'>
            <h4 class='form-section__title'>App will be used by: <button v-if='payload.usedBy.length' @click="resetUsedBy" class="button button__sm-reset">Reset</button></h4>
            <v-checkbox class='form-section__checkbox' v-for="(option, index) in usedBy" :key="index" :label='option' :value="option" v-model="payload.usedBy"></v-checkbox>
        </div>

        <div v-if="productType == 'MyQuote' || productType == 'MySpec'" class='form-section'>
            <h4 class='form-section__title'>Devices: <button v-if='payload.devices.length' @click="resetDevices" class="button button__sm-reset">Reset</button></h4>
            <v-checkbox class='form-section__checkbox' v-for="(option, index) in devices" :key="index" :label='option' :value="option" v-model="payload.devices"></v-checkbox>
        </div>
       
        <div v-if='payload.devices.includes("Tablets") || payload.devices.includes("Phones")' class='form-section'>
            <h4 class='form-section__title'>App can be found on stores: <button v-if='payload.stores.length' @click="resetStores" class="button button__sm-reset">Reset</button></h4>
             <v-checkbox class='form-section__checkbox' v-for="(option, index) in stores" :key="index" :label='option' :value="option" v-model="payload.stores"></v-checkbox>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Document generated is:</h4>
            <v-select :items="selectedGeneratedDocs" label="Generated Document" v-model='payload.generatedDoc'></v-select>
        </div>
       
        <div v-if="productType == 'MyQuote'" class='form-section'>
            <h4 class='form-section__title'>Multiple Pricelists?</h4>
             <v-radio-group @change='setMultiPricelistDate' v-model="payload.multiPricelist" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </div>

        <div v-if='payload.multiPricelist' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Pricelist Details</h4>
            <v-text-field v-model='payload.priceListDetails' label='Pricelist Details'></v-text-field>
            <input style="display:none;" type="file" @change="onFileSelected($event, 'Pricelist Files')" multiple ref="onPriceListSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onPriceListSelected.click()">Upload Pricelists</button>
        </div>
        
        <div v-if='payload.multiPricelist' class='form-section form-section__sub'>
            <h4 v-if='pricelistSelected' class='form-section__title'>Selected Pricelists</h4>
             <div v-for="(file, key) in payload.files" :key="key" v-if='payload.files[key].header == "Pricelist Files"'  class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if='formMode === "edit" && projectDetailsData.existingPricelists.length' class='form-section form-section__sub'>
            <h4 v-if='projectDetailsData.existingPricelists.length' class='form-section__title'>Existing Pricelists</h4>
             <div v-if='doc.header === "Pricelist Files"' v-for='doc in projectDetailsData.existingPricelists' :key='doc.id' class="file-listing">
                {{doc.filename}}
              <v-icon  @click='deleteFile( doc )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        

        <div v-if="productType == 'MyQuote'" class='form-section'>
            <h4 class='form-section__title'>Do you have set statuses?</h4>
             <v-radio-group @change='setStatusDate' v-model="payload.setStatus" row>
                <v-radio label="Yes" :value="true"></v-radio>
                <v-radio label="No" :value="false"></v-radio>
            </v-radio-group>
        </div>

        <div v-if='payload.setStatus' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Status Details</h4>
            <v-text-field v-model='payload.setStatusDetails' label='Status Details'></v-text-field>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Status Files')" multiple ref="onSetStatusSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onSetStatusSelected.click()">Upload Statuses</button>
        </div>
        <div v-if='payload.setStatus' class='form-section form-section__sub'>
            <h4 v-if='statusSelected' class='form-section__title'>Selected Statuses</h4>
             <div v-for="(file, key) in payload.files" :key="key" v-if='payload.files[key].header == "Status Files"' class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if='formMode === "edit" && projectDetailsData.existingStatusFiles.length' class='form-section form-section__sub'>
            <h4 v-if='projectDetailsData.existingStatusFiles.length' class='form-section__title'>Existing Pricelists</h4>
             <div v-for='doc in projectDetailsData.existingStatusFiles' :key='doc.id' class="file-listing">
                {{doc.filename}}
              <v-icon @click='deleteFile( doc )' small style="color:red;">delete</v-icon>
            </div>
        </div>


        <div v-if="productType == 'MyQuote' && payload.usedBy.includes('Reps')" class='form-section'>
            <h4 class='form-section__title'>List of Reps</h4>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Rep Files')" ref="onListofRepsSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onListofRepsSelected.click()">Upload List of Reps</button>
        </div>
        <div v-if="payload.usedBy.includes('Reps')" class='form-section form-section__sub'>
           <h4 v-if='repsSelected' class='form-section__title'>Selected List of Reps</h4>
             <div v-for="(file, key) in payload.files" :key="key" v-if='payload.files[key].header == "Rep Files"' class="file-listing">• {{ file.name }}
              <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if='formMode === "edit" && projectDetailsData.existingRepFiles.length' class='form-section form-section__sub'>
            <h4 v-if='projectDetailsData.existingRepFiles.length' class='form-section__title'>Existing Pricelists</h4>
             <div v-for='doc in projectDetailsData.existingRepFiles' :key='doc.id' class="file-listing">
                {{doc.filename}}
              <v-icon @click='deleteFile( doc )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if="productType == 'MyQuote' && payload.usedBy.includes('Customers')" class='form-section'>
            <h4 class='form-section__title'>List of Customers</h4>
            <input style="display:none;" type="file" v-on:change="onFileSelected($event, 'Customer Files')" ref="onListofCustomersSelected">
            <button style="margin:0;" class='button button__green' small dark @click="$refs.onListofCustomersSelected.click()">Upload List of Customers</button>
        </div>
        <div v-if='payload.listOfCustomerFile' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Selected List of Customers</h4>
            <div v-for="(file, key) in payload.files" :key="key" v-if='payload.files[key].header == "List Of Reps File"'>{{file.name}}
                <v-icon @click='removeFile( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div v-if='formMode === "edit" && projectDetailsData.existingCustomerFiles.length' class='form-section form-section__sub'>
            <h4 v-if='projectDetailsData.existingCustomerFiles.length' class='form-section__title'>Existing Pricelists</h4>
             <div v-for='doc in projectDetailsData.existingCustomerFiles' :key='doc.id' class="file-listing">
                {{doc.filename}}
              <v-icon @click='deleteFile( doc )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Who to contact when we have Maintenance or Technical Problems? <button @click='resetMaintenanceDetails' v-if='payload.maintenanceContactName || payload.maintenanceContactEmail' class="button button__sm-reset">Reset</button></h4>
            <div class='form-section__details'>
                <v-text-field  label="Name" v-model="payload.maintenanceContactName"></v-text-field>
                <v-text-field  label="Email" v-model="payload.maintenanceContactEmail"></v-text-field>
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

        <div v-if='payload.quoteRequestDetails.length' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Added Quote Request Details</h4>
            <div v-for="(detail, key) in payload.quoteRequestDetails" :key="key">• {{ detail.name }} - {{detail.email}} : {{detail.region}}
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
        <div v-if='payload.contactMeDetails.length' class='form-section form-section__sub'>
            <h4 class='form-section__title'>Added Quote Request Details</h4>
            <div v-for="(detail, key) in payload.contactMeDetails" :key="key">• {{ detail.name }} - {{detail.email}} : {{detail.region}}
              <v-icon @click='removeContactMeDetails( key )' small style="color:red;">delete</v-icon>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Special Comments <button v-if='payload.specialComments' @click='resetComments' class="button button__sm-reset">Reset</button></h4>
            <v-text-field v-model='payload.specialComments' label="Special Comments"></v-text-field>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Project Due By? <button v-if='payload.dueDate' @click='resetDueDate' class="button button__sm-reset">Reset</button></h4>
            <datepicker style='margin:0px;' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="payload.dueDate" v-model='payload.dueDate'></datepicker>
        </div>
        
        </div>

</template>

<script>

import {VIcon, VForm, VTextField,VSelect, VRadioGroup, VRadio, VCheckbox} from 'vuetify/lib';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import loadingPage from '../../LoadingPage/LoadingPage'
export default {
    props:[
        "buttonText",
        "projectID",
        "formMode",
        "projectDetailsData",
    ],
    components:{
        VForm,
        VSelect,
        VTextField,
        VRadioGroup,
        VRadio,
        VCheckbox,
        Datepicker,
        loadingPage,
        VIcon
    },
    data() {
        return {
            quoteRequestName: '',
            quoteRequestEmail: '',
            quoteRequestRegion: '',
            contactMeName: '',
            contactMeEmail: '',
            contactMeRegion: '',
            repsSelected: false,
            statusSelected: false,
            pricelistSelected: false,
            usedBy: ['Public', 'Reps', 'Customers'],
            devices: ['Desktop', 'Tablets', 'Phones'],
            stores: ['iTunes', 'Google Play'],
            generatedDocs: ['Estimate', 'Quote', 'Credit Note', 'Specification'],
            payload:{
                projectID:                  this.projectID,
                usedBy:                     this.projectDetailsData.usedBy,
                devices:                    this.projectDetailsData.devices,
                stores:                     this.projectDetailsData.stores,
                generatedDoc:               this.projectDetailsData.generatedDoc,
                multiPricelist:             this.projectDetailsData.multiPricelist,
                multiPricelistDate:         this.projectDetailsData.multiPricelistDate,
                priceListDetails:           this.projectDetailsData.priceListDetails,
                setStatus:                  this.projectDetailsData.setStatus,
                setStatusDate:              this.projectDetailsData.setStatusDate,
                setStatusDetails:           this.projectDetailsData.setStatusDetails,
                maintenanceContactName:     this.projectDetailsData.maintenanceContactName,
                maintenanceContactEmail:    this.projectDetailsData.maintenanceContactEmail,
                quoteRequestDetails:        this.projectDetailsData.quoteRequestDetails,
                contactMeDetails:           this.projectDetailsData.contactMeDetails,
                specialComments:            this.projectDetailsData.specialComments,
                setRepsDate:                this.projectDetailsData.setRepsDate,
                dueDate:                    this.projectDetailsData.dueDate,
                files:                      []
            }
        }

    },
    computed:{
        productType(){
            return this.$store.getters.loadedProject(this.projectID).productType;
        },
        selectedGeneratedDocs(){
            if(this.productType == 'MySpec'){
                this.generatedDocs = ['Specification'];
                this.payload.generatedDoc = 'Specification'
            }else if(this.productType == 'MyQuote'){
                this.generatedDocs = ['Estimate', 'Quote', 'Credit Note'];
            }
            return this.generatedDocs
        }
    },
    methods:{
        deleteFile(doc){
            this.$store.dispatch('deleteDocument', doc.id)
        },
        customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        resetDueDate(){
            this.payload.dueDate = ''
        },
        resetComments(){
            this.payload.specialComments = '';
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
            this.payload.maintenanceContactName = '';
            this.payload.maintenanceContactEmail = '';
        },
        resetGeneratedDoc(){
            this.payload.generatedDoc = '';
        },
        resetStores(){
            this.payload.devices = [];
            this.payload.stores = [];
        },
        resetDevices(){
            this.payload.devices = [];
        },
        resetUsedBy(){
            this.payload.usedBy = [];
        },
        setContactMeDetails(){
             let details = {
                name: this.contactMeName,
                email: this.contactMeEmail,
                region: this.contactMeRegion
            }
            this.payload.contactMeDetails.push(details);
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
            this.payload.quoteRequestDetails.push(details);
            this.quoteRequestName = '';
            this.quoteRequestEmail = '';
            this.quoteRequestRegion = '';
        },
        setMultiPricelistDate(){
            this.payload.multiPricelistDate = moment().format();
        },
        setStatusDate(){
           this.payload.setStatusDate = moment().format();
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
                this.payload.setRepsDate = moment().format();
                this.payload.files.push( files[i] );
            }
        },
        removeFile( key ){
            this.payload.files.splice( key, 1 );
            let files = this.payload.files;
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
        removeExistingPriceList(){
            console.log("Add code to do a call to remove the existing pricelist")
        },
        removeExistingStatus(){
            console.log("Add code to do a call to remove the existing status")
        },
        onSubmit(){
            this.$emit('onSubmit', this.payload);
        },
    }
}
// https://serversideup.net/uploading-files-vuejs-axios/
</script>


