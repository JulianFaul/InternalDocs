<template>
<div class='content-container'>
  <div class='filter-component'>
    <az-filter :projects='projects' v-on:selected="selectedAlphabeticalFilterOption"></az-filter>
  </div>
    <v-data-table
        :headers="headers"
        :items="projects"
        class="elevation-1 v-data-table"
        >
        <template v-slot:items="props">
            <td class="text-xs-center">
            <router-link  class="link" :to="{name: 'EditMobileProjectPage', params: {projectID: props.item.id, project: props.item}}">
              <v-icon small class="text-xs-center">
                  edit
              </v-icon>
            </router-link>
            </td>
            <td class="text-xs-center">
              <img v-if="props.item.iconPath" style='width:35px;' :src="props.item.iconPath">
              <img v-else style='width:35px; ' src="../../assets/No_Image_Available.png">
            </td>
            <td class='project-name'>
                <div class='project-name__title'>{{props.item.appTitle}}</div>
                <div @click="setActiveTab()"  class='project-name__link'><router-link :to="'details/' + props.item.id">Details</router-link></div>
            </td>
            <td class="text-xs-center">{{props.item.appType}}</td>
            <td class="text-xs-center" :class='getClass(props.item.appStatus)'>
                <span>{{props.item.appStatus}}</span>
            </td>
            <td class="text-xs-center project-status">
                <v-progress-linear class="project-status__progress" :value="getMilestoneValue(props.item.milestone)"></v-progress-linear>
                <div class='project-status__icons'>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Checklist Meeting' && 'active'">radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Mockup Presented' && 'active'">radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Sign Off Mockup' && 'active'">radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Deliver V1' && 'active'">radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Deliver V2' && 'active'">radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon :class="props.item.milestone === 'Final Sign Off' && 'active'">radio_button_checked</v-icon></div>
                </div>
                <div class='project-status__status'>
                    <div class='project-status__status__item'><span :class="props.item.milestone === 'Checklist Meeting' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">checklist meeting</span></div>
                    <div class='project-status__status__item project-status__status__item__disabled'><span :class="props.item.milestone === 'Mockup Presented' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">mocup presented</span></div>
                    <div class='project-status__status__item project-status__status__item__disabled'><span :class="props.item.milestone === 'Sign Off Mockup' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">mocup signed off</span></div>
                    <div class='project-status__status__item project-status__status__item__disabled'><span :class="props.item.milestone === 'Deliver V1' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">deliver v1</span></div>
                    <div class='project-status__status__item project-status__status__item__disabled'><span :class="props.item.milestone === 'Deliver V2' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">deliver v2</span></div>
                    <div class='project-status__status__item project-status__status__item__disabled'><span :class="props.item.milestone === 'Final Sign Off' ? 'project-status__status__item project-status__status__item__active' : 'project-status__status__item__disabled'">final sign off</span></div>
                </div>
            </td>
  
            <td class="text-xs-center">
              <div class='project-version'>
                <div>
                  <div class='project-version__title'><a target="_blank" :href='"//" + props.item.develLink' :class='props.item.appDevel === true ? "project-version__title__pink" : "project-version__title__disabled"'>Devel</a></div>
                  <div class='project-version__date' v-html='props.item.develDate'></div>
                </div>
                <div>
                  <div class='project-version__title'><a target="_blank" :href='"//" + props.item.stagingLink' :class='props.item.appStaging === true ? "project-version__title__yellow" : "project-version__title__disabled"'>Staging</a></div>
                  <div class='project-version__date' v-html='props.item.stagingDate'></div>
                </div>
                <div>
                  <div class='project-version__title'><a target="_blank" :href='"//" + props.item.demoLink' :class='props.item.appDemo === true ? "project-version__title__blue" : "project-version__title__disabled"' >Demo</a></div>
                  <div class='project-version__date' v-html='props.item.demoDate'></div>
                </div>
                <div>
                  <div class='project-version__title'><a target="_blank" :href='"//" + props.item.liveLink' :class='props.item.appLive === true ? "project-version__title__green" : "project-version__title__disabled"'>Live</a></div>
                  <div class='project-version__date' v-html='props.item.liveDate'></div>
                </div>
              </div>
            </td>
                      
        </template>
  
        </v-data-table>
        
    </div>
</template>


<script>
import azFilter from './AlphabeticalFilter'
import { VDataTable, VIcon, VProgressLinear } from 'vuetify/lib';
import moment from 'moment';

export default {
  name: 'ProjectDashoard',
  props: ["projectsData"],
  components: {
      VProgressLinear,
      VIcon,
      VDataTable,
      azFilter
  },
  data: () => ({
   
     alphabeticalFilterOption: "",
      headers: [
        { text: '' ,align: 'center', value: '', sortable: false, width:"20px"},
        { text: '' ,align: 'center', value: '', sortable: false, width:"20px"},
        { text: 'Name', align: '', sortable: true, value: 'appTitle',width:"150px"},
        { text: 'Product',align: 'center', value: 'product' },
        { text: 'Status',align: 'center', value: 'status' },
        { text: 'Milestone',align: 'center', value: 'milestone',sortable: false, width:"300px" },
        { text: 'Versions',align: 'center', value: 'versions',sortable: false },
      ]
      }),
      methods:{
        setActiveTab(){
          console.log("here")
          this.$store.dispatch('setActiveTab', 0)
        },
        selectedAlphabeticalFilterOption(option) {
            this.alphabeticalFilterOption = option;
        },
        getClass(status){
          if(status === 'Client Using App'){
            return 'status-blue'
          }
          if(status === 'Waiting for Client'){
            return 'status-green'
          }
          if(status === 'Client Reviewing on Demo'){
            return 'status-green'
          }
          if(status === 'In Progress'){
            return 'status-green'
          }
        },
        getMilestoneValue(milestone){
          let value;
          if(milestone === "Not Started"){
             return value = 0;
          }
          if(milestone === "Checklist Meeting"){
             return value = 10;
          }
          if(milestone === "Mockup Presented"){
             return value = 20;
          }
          if(milestone === "Sign Off Mockup"){
             return value = 40;
          }
          if(milestone === "Deliver V1"){
             return value = 60;
          }
          if(milestone === "Deliver V2"){
             return value = 80;
          }
          if(milestone === "Final Sign Off"){
             return value = 100;
          }
          if(milestone === "Completed"){
             return value = 100;
          }
        }
      },
    
      computed: {
        projects(){
           let projects = this.projectsData;
           if(this.alphabeticalFilterOption){
             projects = projects.filter(project => {
                    let firstLetter = project.appTitle.charAt(0).toLowerCase();
                    return firstLetter === this.alphabeticalFilterOption;
                });
           }
           return projects
        }
      },
     
}

</script>