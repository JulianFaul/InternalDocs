<template>
    
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

