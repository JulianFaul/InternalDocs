<template>
    <v-form class='form' v-on:submit.prevent>
        <button @click='onSubmit' :disabled='!payload.appTitle' class="button__absolute-right button button__blue" >{{buttonText}}</button>
        <div class='form-section'>
            <h4 class='form-section__title'>App Icon:</h4>
            <input accept="image/png" style="display:none;" type="file" @change="onFileSelected" ref="fileInput">
            <button class='button button__blue' small dark @click="$refs.fileInput.click()">Pick File</button>
            <p class='form-section__note'><b>Please note:</b> Please upload a .png file with size 120 x 120px</p>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>App Details:</h4>
            <div class='form-section__details'>
                <v-text-field  label="App Title *" v-model="payload.appTitle"></v-text-field>
                <v-text-field  label="App Subtitle" v-model="payload.appSubtitle"></v-text-field>
                <v-select :items="appVersions" label="App Version" v-model='payload.appVersion'></v-select>
                <v-select :items="countries" label="Countries" v-model='payload.country'></v-select>
                <v-select :items="appTypes" label="App Type" v-model='payload.appType'></v-select>
                <v-select :items="productTypes" label="Product Type" v-model='payload.productType'></v-select>
            </div>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>Priority:</h4>
            <div class='form-section__details'>
                <v-radio-group row v-model='payload.priority'>
                    <v-radio class='form-section__radio' v-for='(priority, index) in priorities' :key='index' :value='priority' :label='priority'></v-radio>
                </v-radio-group>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>App Platforms:</h4>
            <div class='form-section__platforms'>
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Live' v-model='payload.appLive'></v-checkbox>
                        <span v-if='payload.appLive'>
                            <v-text-field class='form-section__textfield' label="Live Link" v-model="payload.liveLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="payload.liveDate" v-model='payload.liveDate'></datepicker>
                        </span>
                    </div>
           
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Demo' v-model='payload.appDemo'></v-checkbox>
                        <span v-if='payload.appDemo'>
                            <v-text-field class='form-section__textfield' label="Demo Link" v-model="payload.demoLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="payload.demoDate" v-model='payload.demoDate'></datepicker>
                        </span>
                    </div>
        
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Staging' v-model='payload.appStaging'></v-checkbox>
                        <span v-if='payload.appStaging'>
                            <v-text-field class='form-section__textfield' label="Staging Link" v-model="payload.stagingLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="payload.stagingDate" v-model='payload.stagingDate'></datepicker>
                        </span>
                    </div>

                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" class='form-section__checkbox' label='Devel' v-model='payload.appDevel'></v-checkbox>
                         <span v-if='payload.appDevel'>
                            <v-text-field class='form-section__textfield' label="Devel Link" v-model="payload.develLink"></v-text-field>
                            <datepicker placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="payload.develDate" v-model='payload.develDate'></datepicker>
                        </span>
                    </div>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Milestones:</h4>
           <div class='form-section__details'>
                <v-radio-group row v-model='payload.milestone'>
                    <v-radio class='form-section__radio' v-for='(milestone, index) in milestones' :key='index' :value='milestone' :label='milestone'></v-radio>
                </v-radio-group>
            </div>
        </div> 

        <div class='form-section'>
            <h4 class='form-section__title'>App Status:</h4>
           <div class='form-section__details'>
                <v-radio-group row v-model='payload.appStatus'>
                    <v-radio class='form-section__radio' v-for='(appStatus, index) in appStatuses' :key='index' :value='appStatus' :label='appStatus'></v-radio>
                </v-radio-group>
            </div>
        </div> 
        
    </v-form>
</template>

<script>

import {VForm, VTextField,VSelect, VRadioGroup, VRadio, VCheckbox} from 'vuetify/lib';
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
    props: [
        'projectData',
        'buttonText'
    ],
    components:{
        VForm,
        VSelect,
        VTextField,
        VRadioGroup,
        VRadio,
        VCheckbox,
        Datepicker
    },
    name: 'MobileProjectForm',
    data () {
        return {
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
            payload: {
                appTitle:           this.projectData.appTitle,
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
        }
    },
    methods:{
        onSubmit(){
            this.$emit('onSubmit', this.payload);
        },
        onCheckboxChange(){
            this.payload.liveDate = this.payload.appLive === true ? this.payload.liveDate : null;
            this.payload.demoDate = this.payload.appDemo === true ? this.payload.demoDate : null;
            this.payload.stagingDate = this.payload.appStaging === true ? this.payload.stagingDate : null;
            this.payload.develDate = this.payload.appDevel === true ? this.payload.develDate : null;
        },
        customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onFileSelected(event){
        const image = event.target.files[0];
        this.payload.icon = image;
      }
    }
}
</script>

