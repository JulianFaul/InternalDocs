<template>
<div>
  <div class='content-container'>
    <div class='mobile-projects-page'>
      <div class='title-container'>
        
        <h1 class='title-container__title' style="margin: 6px 0px;">
          <router-link to='/mobileprojects'>
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link> 
            {{projectName}} Details</h1>
      </div>
    </div>
    <v-tabs :value="getActiveTab" color="#00a09d" dark slider-color="#ffffff">
      <v-tab @click='setActiveTab(component.id)' v-for="component in myComponents" :key="component.id" ripple>
            {{ component.name }}
      </v-tab>

      <v-tab-item  v-for="component in myComponents" :key="component.id">
        <component :projectID="id" :is="component.component" :key="component.component"></component>
      </v-tab-item>

    </v-tabs>
  </div>

</div>
</template>

<script>
import {VIcon, VTabs, VTab, VBtn, VTabItem, VCard, VCardText } from "vuetify/lib";
import { mapGetters } from 'vuex';
import MobileProjectSpecs from './MobileProjectSpecs/MobileProjectSpecs'
import MobileProjectStatInfo from './MobileProjectStatsInfo/MobileProjectsStatInfo'
import MobileProjectStore from './MobileProjectStore/MobileProjectStore'

export default {
  props: ["id"],
  components: {
    VTabs,
    VTab,
    VBtn,
    VTabItem,
    VCard,
    VIcon,
    VCardText,
    MobileProjectSpecs,
    MobileProjectStatInfo,
    MobileProjectStore
  },
  name: "MobileProjectsDetailsPage",
  data() {
    return {
      myComponents:[
            {id:0, name:"App Specs", component:"MobileProjectSpecs"},
            {id:1, name:"Stats Info", component:"MobileProjectStatInfo"},
            {id:2, name: "Store Details", component:"MobileProjectStore"}
        ]
    };
  },
  methods: {
    setActiveTab(id){
      this.$store.dispatch('setActiveTab', id)
    }
  },
  computed: {
     ...mapGetters([
        'getActiveTab'
    ]),
    projectName() {
      let project = this.$store.getters.loadedProject(this.id);
      if(project){
        return this.$store.getters.loadedProject(this.id).appTitle;
      }else{
        return this.$store.dispatch('getMobileProjects')
      }
      
    }
  },
  created(){
    this.$store.dispatch('getAppSpecs', this.id)
    this.$store.dispatch('getStatInfo', this.id)
  }
};
</script>