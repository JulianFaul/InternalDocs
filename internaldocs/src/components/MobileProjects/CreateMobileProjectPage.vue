<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>
                    <router-link to='/mobileprojects'>
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link>Create New Project</h1>
            </div>
        </div>
        <div class='scroll-container'>
        <div class='content-container'>
    <div class='form'>
        <button @click='onSubmit' :disabled='!appTitle' class="button__absolute-right button button__blue" >{{buttonText}}</button>
        <div class='form-section'>
        <img style='width:50px;' v-if='url' :src='url'/>
            <h4 class='form-section__title'>App Icon:</h4>
            <input accept="image/png" style="display:none;" type="file" @change="onFileSelected" ref="fileInput">
            <button class='button button__blue' small dark @click="$refs.fileInput.click()">Pick File</button>
            <p class='form-section__note'><b>Please note:</b> Please upload a .png file with size 120 x 120px</p>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>App Details:</h4>
            <div class='form-section__details'>
                <v-text-field name='apptitle' id='apptitle'  label="App Title *" v-model="appTitle"></v-text-field>
                <v-text-field name='appSubtitle' id='appSubtitle' label="App Subtitle" v-model="appSubtitle"></v-text-field>
                <v-select name='appVersions' id='appVersions' :items="appVersions" label="App Version" v-model='appVersion'></v-select>
                <v-select name='countries' id='countries' :items="countries" label="Countries" v-model='country'></v-select>
                <v-select name='appTypes' id='appTypes' :items="appTypes" label="App Type" v-model='appType'></v-select>
                <v-select name='productTypes' id='productTypes' :items="productTypes" label="Product Type" v-model='productType'></v-select>
            </div>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>Priority:</h4>
            <div class='form-section__details'>
                <v-radio-group name='priority' id='priority' row v-model='priority'>
                    <v-radio class='form-section__radio' v-for='(priority, index) in priorities' :key='index' :value='priority' :label='priority'></v-radio>
                </v-radio-group>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>App Platforms:</h4>
            <div class='form-section__platforms'>
                    <div class='form-section__platform'>
                        <v-checkbox  name='appLive' id='appLive' @change="onCheckboxChange" class='form-section__checkbox' label='Live' v-model='appLive'></v-checkbox>
                        <span v-if='appLive'>
                            <v-text-field  name='liveLink' id='liveLink' class='form-section__textfield' label="Live Link" v-model="liveLink"></v-text-field>
                            <datepicker name='liveDate' id='liveDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="liveDate" v-model='liveDate'></datepicker>
                        </span>
                    </div>
           
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" name='appDemo' id='appDemo' class='form-section__checkbox' label='Demo' v-model='appDemo'></v-checkbox>
                        <span v-if='appDemo'>
                            <v-text-field  name='demoLink' id='demoLink' class='form-section__textfield' label="Demo Link" v-model="demoLink"></v-text-field>
                            <datepicker name='demoDate' id='demoDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="demoDate" v-model='demoDate'></datepicker>
                        </span>
                    </div>
        
                    <div class='form-section__platform'>
                        <v-checkbox name='appStaging' id='appStaging' @change="onCheckboxChange" class='form-section__checkbox' label='Staging' v-model='appStaging'></v-checkbox>
                        <span v-if='appStaging'>
                            <v-text-field name='stagingLink' id='stagingLink' class='form-section__textfield' label="Staging Link" v-model="stagingLink"></v-text-field>
                            <datepicker name='stagingDate' id='stagingDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="stagingDate" v-model='stagingDate'></datepicker>
                        </span>
                    </div>

                    <div class='form-section__platform'>
                        <v-checkbox name='appDevel' id='appDevel' @change="onCheckboxChange" class='form-section__checkbox' label='Devel' v-model='appDevel'></v-checkbox>
                         <span v-if='appDevel'>
                            <v-text-field name='develLink' id='develLink' class='form-section__textfield' label="Devel Link" v-model="develLink"></v-text-field>
                            <datepicker name='develDate' id='develDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="develDate" v-model='develDate'></datepicker>
                        </span>
                    </div>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Milestones:</h4>
           <div class='form-section__details'>
                <v-radio-group name='milestone' id='milestone' row v-model='milestone'>
                    <v-radio  class='form-section__radio' v-for='(milestone, index) in milestones' :key='index' :value='milestone' :label='milestone'></v-radio>
                </v-radio-group>
            </div>
        </div> 

        <div class='form-section'>
            <h4 class='form-section__title'>App Status:</h4>
           <div class='form-section__details'>
                <v-radio-group  name='appStatus' id='appStatus' row v-model='appStatus'>
                    <v-radio class='form-section__radio' v-for='(appStatus, index) in appStatuses' :key='index' :value='appStatus' :label='appStatus'></v-radio>
                </v-radio-group>
            </div>
        </div> 
        
    </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
    name: 'CreateProjectPage',
    components:{
        Datepicker
    },
    data () {
        return {
            appVersions: ["Spine","Classic"],
            countries: ["South Africa","Australia"],
            appTypes: ["NDTec App","iTunes/Google Play App","Web Only"],
            productTypes: ["MySpec","MyQuote","Generic Blinds App", "MyOrder","Project Module","ERP","Portal"],
            priorities: ['Critical', 'Serious', 'Moderate', 'Low Priority', 'none'],
            milestones: ['Not Started', 'Checklist Meeting', 'Mockup Presented', 'Sign Off Mockup', 'Deliver V1', 'Deliver V2', 'Final Sign Off', 'Completed'],
            appStatuses: ['Client Using App', 'Waiting for Client', 'Client Reviewing on Demo', 'Client Reviewing on Staging', 'In Progress', 'Update in Progress', 'Not Started', 'Cancelled', 'Not Paid'],
           url: '',
            buttonText: 'Create Project',
            formMode: 'create',

                appTitle: '',
                appSubtitle: '',
                appVersion:  '' ,
                country: '',
                appType: '',
                productType: '',
                priority: '',
                appLive: false,
                appDemo: false,
                appStaging: false,
                appDevel: false,
                liveDate: '',
                demoDate: '',
                stagingDate: '',
                develDate: '',
                milestone: '',
                appStatus: '',
                liveLink: '',
                demoLink: '',
                stagingLink: '',
                develLink: '',
                icon: '',
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
         this.url = URL.createObjectURL(image);
        this.icon = image;
      },
        onSubmit() {
            this.$store.dispatch('createMobileProject', {
                appTitle: this.appTitle,
                appSubtitle: this.appSubtitle,
                appVersion:  this.appVersion,
                country: this.country,
                appType: this.appType,
                productType: this.productType,
                priority: this.priority,
                appLive: this.appLive,
                appDemo: this.appDemo,
                appStaging: this.appStaging,
                appDevel: this.appDevel,
                liveDate: this.liveDate,
                demoDate: this.demoDate,
                stagingDate: this.stagingDate,
                develDate: this.develDate,
                milestone: this.milestone,
                appStatus: this.appStatus,
                liveLink: this.liveLink,
                demoLink: this.demoLink,
                stagingLink: this.stagingLink,
                develLink: this.develLink,
                icon: this.icon,
            });
            this.$router.push('/mobileprojects');
        }
    }
}
</script>

