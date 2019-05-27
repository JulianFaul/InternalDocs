<template>
  <v-layout row justify-center>
    <v-dialog persistent  max-width="1200px" transition="dialog-bottom-transition" v-model="editDialog" scrollable>
    
 
  <v-icon slot="activator" small class="text-xs-center">
                  edit
              </v-icon>
      <v-card>
        <v-card-title>Edit {{projectData.appTitle}} Details
            <v-spacer></v-spacer>
            <button class='button button__blue' @click="editDialog = false">Close</button>
            <button class='button button__green' @click="onSaveChanges">Save</button>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text >
      
         <div class='form-section'>
            <h4 class='form-section__title'>App Icon:</h4>
            <input accept="image/png" style="display:none;" type="file" @change="onFileSelected" ref="fileInput">
            <button class='button button__blue' small dark @click="$refs.fileInput.click()">Pick File</button>
            <p class='form-section__note'><b>Please note:</b> Please upload a .png file with size 120 x 120px</p>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>App Details:</h4>
            <div class='form-section__details'>
                <v-text-field  label="App Title *" name="appTitle" id="appTitle" v-model="editedTitle"></v-text-field>
                <v-text-field  label="App Subtitle" v-model="appSubtitle"></v-text-field>
                <v-select :items="appVersions" label="App Version" v-model='appVersion'></v-select>
                <v-select :items="countries" label="Countries" v-model='country'></v-select>
                <v-select :items="appTypes" label="App Type" v-model='appType'></v-select>
                <v-select :items="productTypes" label="Product Type" v-model='productType'></v-select>
            </div>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>Priority:</h4>
            <div class='form-section__details'>
                <v-radio-group row v-model='priority'>
                    <v-radio class='form-section__radio' v-for='(priority, index) in priorities' :key='index' :value='priority' :label='priority'></v-radio>
                </v-radio-group>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>App Platforms:</h4>
            <div class='form-section__platforms'>
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Live' v-model='appLive'></v-checkbox>
                        <span v-if='appLive'>
                            <v-text-field class='form-section__textfield' label="Live Link" v-model="liveLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="liveDate" v-model='liveDate'></datepicker>
                        </span>
                    </div>
           
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Demo' v-model='appDemo'></v-checkbox>
                        <span v-if='appDemo'>
                            <v-text-field class='form-section__textfield' label="Demo Link" v-model="demoLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="demoDate" v-model='demoDate'></datepicker>
                        </span>
                    </div>
        
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Staging' v-model='appStaging'></v-checkbox>
                        <span v-if='appStaging'>
                            <v-text-field class='form-section__textfield' label="Staging Link" v-model="stagingLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="stagingDate" v-model='stagingDate'></datepicker>
                        </span>
                    </div>

                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Devel' v-model='appDevel'></v-checkbox>
                         <span v-if='appDevel'>
                            <v-text-field class='form-section__textfield' label="Devel Link" v-model="develLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="develDate" v-model='develDate'></datepicker>
                        </span>
                    </div>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Milestones:</h4>
           <div class='form-section__details'>
                <v-radio-group row v-model='milestone'>
                    <v-radio class='form-section__radio' v-for='(milestone, index) in milestones' :key='index' :value='milestone' :label='milestone'></v-radio>
                </v-radio-group>
            </div>
        </div> 

        <div class='form-section'>
            <h4 class='form-section__title'>App Status:</h4>
           <div class='form-section__details'>
                <v-radio-group row v-model='appStatus'>
                    <v-radio class='form-section__radio' v-for='(appStatus, index) in appStatuses' :key='index' :value='appStatus' :label='appStatus'></v-radio>
                </v-radio-group>
            </div>
        </div> 
        </v-card-text>
        <v-divider></v-divider>
       
    
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
  export default {
    props: ['projectData'],
    components:{
        Datepicker
    },
    data () {
      return {
        editDialog: false,
        appVersions: ["Spine","Classic"],
        countries: ["South Africa","Australia"],
        appTypes: ["NDTec App","iTunes/Google Play App","Web Only"],
        productTypes: ["MySpec","MyQuote","MyOrder","Project Module","ERP","Portal"],
        priorities: ['Critical', 'Serious', 'Moderate', 'Low Priority', 'none'],
        milestones: ['Not Started', 'Checklist Meeting', 'Mockup Presented', 'Sign Off Mockup', 'Deliver V1', 'Deliver V2', 'Final Sign Off', 'Completed'],
        appStatuses: ['Client Using App', 'Waiting for Client', 'Client Reviewing on Demo', 'Client Reviewing on Staging', 'In Progress', 'Update in Progress', 'Not Started', 'Cancelled', 'Not Paid'],
        appLive: false,
        appDemo: false,
        appStaging: false,
        appDevel: false,
        liveDate: null,
        demoDate: null,
        stagingDate: null,
        develDate: null,
        
        editedTitle:        this.projectData.appTitle,
        appSubtitle:        this.projectData.appSubtitle,
        appVersion:         this.projectData.appVersion,
        country:            this.projectData.country,
        appType:            this.projectData.appType,
        priority:           this.projectData.priority,
        productType:        this.projectData.productType,
        appLive:            this.projectData.appLive,
        appDemo:            this.projectData.appDemo,
        appStaging:         this.projectData.appStaging,
        appDevel:           this.projectData.appDevel,
        liveDate:           this.projectData.liveDate,
        demoDate:           this.projectData.demoDate,
        stagingDate:        this.projectData.stagingDate,
        develDate:          this.projectData.develDate,
        milestone:          this.projectData.milestone,
        appStatus:          this.projectData.appStatus,
        liveLink:           this.projectData.liveLink,
        demoLink:           this.projectData.demoLink,
        stagingLink:        this.projectData.stagingLink,
        develLink:          this.projectData.develLink,
        icon:               this.projectData.iconPath
      }
    },
    methods: {
        onCheckboxChange(){
            this.liveDate = this.appLive === true ? this.liveDate : null;
            this.demoDate = this.appDemo === true ? this.demoDate : null;
            this.stagingDate = this.appStaging === true ? this.stagingDate : null;
            this.develDate = this.appDevel === true ? this.develDate : null;
        },
        customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onFileSelected(event){
        const image = event.target.files[0];
        this.icon = image;
      },
      onSaveChanges () {
        // this.editDialog = false
        console.log("PRessed")
        let payload = {
            appTitle:           this.editedTitle,
            appSubtitle:        this.appSubtitle,
            appVersion:         this.appVersion,
            country:            this.country,
            appType:            this.appType,
            priority:           this.priority,
            productType:        this.productType,
            appLive:            this.appLive,
            appDemo:            this.appDemo,
            appStaging:         this.appStaging,
            appDevel:           this.appDevel,
            liveDate:           this.liveDate,
            demoDate:           this.demoDate,
            stagingDate:        this.stagingDate,
            develDate:          this.develDate,
            milestone:          this.milestone,
            appStatus:          this.appStatus,
            liveLink:           this.liveLink,
            demoLink:           this.demoLink,
            stagingLink:        this.stagingLink,
            develLink:          this.develLink,
            icon:               this.iconPath
        }

        this.$store.dispatch("updateMobileProject", payload);
      
      }
    }
  }
</script>