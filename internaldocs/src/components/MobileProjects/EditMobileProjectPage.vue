<template>
    <div>

        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>
                    <router-link to='/mobileprojects'>
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link> Edit Project
                 <span @click='deleteMobileProject' style='margin-right:140px; cursor: pointer;' class='button button__red' to='/create'>Delete Project</span>
                </h1>
               
            </div>
        </div>
      
        <div class='scroll-container'>
            <div class='content-container'>
                <loadingPage v-if='loading'></loadingPage>
                <div class='form'>
        <button @click='onSubmit' :disabled='!editAppTitle' class="button__absolute-right button button__blue" >{{buttonText}}</button>
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
                <v-text-field name='apptitle' id='apptitle'  label="App Title *" v-model="editAppTitle"></v-text-field>
                <v-text-field name='appSubtitle' id='appSubtitle' label="App Subtitle" v-model="editAppSubtitle"></v-text-field>
                <v-select name='appVersions' id='appVersions' :items="appVersions" label="App Version" v-model='editAppVersion'></v-select>
                <v-select name='countries' id='countries' :items="countries" label="Countries" v-model='editCountry'></v-select>
                <v-select name='appTypes' id='appTypes' :items="appTypes" label="App Type" v-model='editAppType'></v-select>
                <v-select name='productTypes' id='productTypes' :items="productTypes" label="Product Type" v-model='editProductType'></v-select>
            </div>
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>Priority:</h4>
            <div class='form-section__details'>
                <v-radio-group name='priority' id='priority' row v-model='editPriority'>
                    <v-radio class='form-section__radio' v-for='(priority, index) in priorities' :key='index' :value='priority' :label='priority'></v-radio>
                </v-radio-group>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>App Platforms:</h4>
            <div class='form-section__platforms'>
                    <div class='form-section__platform'>
                        <v-checkbox  name='appLive' id='appLive' @change="onCheckboxChange" class='form-section__checkbox' label='Live' v-model='editAppLive'></v-checkbox>
                        <span v-if='editAppLive'>
                            <v-text-field  name='liveLink' id='liveLink' class='form-section__textfield' label="Live Link" v-model="editLiveLink"></v-text-field>
                            <datepicker name='liveDate' id='liveDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="editLiveDate" v-model='editLiveDate'></datepicker>
                        </span>
                    </div>
           
                    <div class='form-section__platform'>
                        <v-checkbox @change="onCheckboxChange" name='appDemo' id='appDemo' class='form-section__checkbox' label='Demo' v-model='editAppDemo'></v-checkbox>
                        <span v-if='editAppDemo'>
                            <v-text-field  name='demoLink' id='demoLink' class='form-section__textfield' label="Demo Link" v-model="editDemoLink"></v-text-field>
                            <datepicker name='demoDate' id='demoDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="editDemoDate" v-model='editDemoDate'></datepicker>
                        </span>
                    </div>
        
                    <div class='form-section__platform'>
                        <v-checkbox name='appStaging' id='appStaging' @change="onCheckboxChange" class='form-section__checkbox' label='Staging' v-model='editAppStaging'></v-checkbox>
                        <span v-if='editAppStaging'>
                            <v-text-field name='stagingLink' id='stagingLink' class='form-section__textfield' label="Staging Link" v-model="editStagingLink"></v-text-field>
                            <datepicker name='stagingDate' id='stagingDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="editStagingDate" v-model='editStagingDate'></datepicker>
                        </span>
                    </div>

                    <div class='form-section__platform'>
                        <v-checkbox name='appDevel' id='appDevel' @change="onCheckboxChange" class='form-section__checkbox' label='Devel' v-model='editAppDevel'></v-checkbox>
                         <span v-if='editAppDevel'>
                            <v-text-field name='develLink' id='develLink' class='form-section__textfield' label="Devel Link" v-model="editDevelLink"></v-text-field>
                            <datepicker name='develDate' id='develDate' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="editDevelDate" v-model='editDevelDate'></datepicker>
                        </span>
                    </div>
            </div>
        </div>

        <div class='form-section'>
            <h4 class='form-section__title'>Milestones:</h4>
           <div class='form-section__details'>
                <v-radio-group name='milestone' id='milestone' row v-model='editMilestone'>
                    <v-radio  class='form-section__radio' v-for='(milestone, index) in milestones' :key='index' :value='milestone' :label='milestone'></v-radio>
                </v-radio-group>
            </div>
        </div> 

        <div class='form-section'>
            <h4 class='form-section__title'>App Status:</h4>
           <div class='form-section__details'>
                <v-radio-group  name='appStatus' id='appStatus' row v-model='editAppStatus'>
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
import MobileProjectForm from './MobileProjectForm'
import LoadingPage from '../LoadingPage/LoadingPage';
import { mapGetters } from 'vuex';
export default {
    name: 'CreateProjectPage',
    props: ['projectID','project'],
    components:{
        MobileProjectForm,
        LoadingPage,
        Datepicker
    },
    data () {
        return {
            buttonText: 'Update Project',
            formMode: 'edit',
             appVersions: ["Spine","Classic"],
            countries: ["South Africa","Australia"],
            appTypes: ["NDTec App","iTunes/Google Play App","Web Only"],
            productTypes: ["MySpec","MyQuote","MyOrder","Project Module","ERP","Portal"],
            priorities: ['Critical', 'Serious', 'Moderate', 'Low Priority', 'none'],
            milestones: ['Not Started', 'Checklist Meeting', 'Mockup Presented', 'Sign Off Mockup', 'Deliver V1', 'Deliver V2', 'Final Sign Off', 'Completed'],
            appStatuses: ['Client Using App', 'Waiting for Client', 'Client Reviewing on Demo', 'Client Reviewing on Staging', 'In Progress', 'Update in Progress', 'Not Started', 'Cancelled', 'Not Paid'],
            url: '',

                editAppTitle: this.project.appTitle,
                editAppSubtitle: this.project.appSubtitle,
                editAppVersion:  this.project.appVersion ,
                editCountry: this.project.country,
                editAppType: this.project.appType,
                editProductType: this.project.productType,
                editPriority: this.project.priority,
                editAppLive: this.project.appLive,
                editAppDemo: this.project.appDemo,
                editAppStaging: this.project.appStaging,
                editAppDevel: this.project.appDevel,
                editLiveDate: this.project.liveDate,
                editDemoDate: this.project.demoDate,
                editStagingDate: this.project.stagingDate,
                editDevelDate: this.project.develDate,
                editMilestone: this.project.milestone,
                editAppStatus: this.project.appStatus,
                editLiveLink: this.project.liveLink,
                editDemoLink: this.project.demoLink,
                editStagingLink: this.project.stagingLink,
                editDevelLink: this.project.develLink,
                editIcon: "",
        }
    },
    computed:{
        ...mapGetters([
            'loadedAppSpecs',
            'loading'
        ]),
    },
    methods: {
         onCheckboxChange(){
            this.editLiveDate = this.editAppLive === true ? this.editLiveDate : null;
            this.editDemoDate = this.editAppDemo === true ? this.editDemoDate : null;
            this.editStagingDate = this.editAppStaging === true ? this.editStagingDate : null;
            this.editDevelDate = this.editAppDevel === true ? this.editDevelDate : null;
        },
        customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onFileSelected(event){
        const image = event.target.files[0];
        this.url = URL.createObjectURL(image);
        this.editIcon = image;
        },
        deleteMobileProject(){
            this.$store.dispatch('deleteMobileProject', this.projectID)
            this.$router.push('/mobileprojects');
        },
        onSubmit() {
            this.$store.dispatch("updateMobileProject", {
                projectID: this.projectID,
                appTitle: this.editAppTitle,
                appSubtitle: this.editAppSubtitle,
                appVersion:  this.editAppVersion,
                country: this.editCountry,
                appType: this.editAppType,
                productType: this.editProductType,
                priority: this.editPriority,
                appLive: this.editAppLive,
                appDemo: this.editAppDemo,
                appStaging: this.editAppStaging,
                appDevel: this.editAppDevel,
                liveDate: this.editLiveDate,
                demoDate: this.editDemoDate,
                stagingDate: this.editStagingDate,
                develDate: this.editDevelDate,
                milestone: this.editMilestone,
                appStatus: this.editAppStatus,
                liveLink: this.editLiveLink,
                demoLink: this.editDemoLink,
                stagingLink: this.editStagingLink,
                develLink: this.editDevelLink,
                icon: this.editIcon,
            });
            this.$router.push('/mobileprojects')
        }
    },
}
</script>



