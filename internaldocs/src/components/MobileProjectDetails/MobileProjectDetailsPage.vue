<template>
<div>
  <div class='content-container'>
    <div class='mobile-projects-page'>
      <div class='title-container'>
        <h1 class='title-container__title' style="margin: 6px 0px;">{{projectName}} Details </h1>
      </div>
       
      </div>

    <v-tabs v-model="active" color="#00a09d" dark slider-color="#ffffff">
      <v-tab v-for="component in myComponents" :key="component.id" ripple>
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
import { VTabs, VTab, VBtn, VTabItem, VCard, VCardText } from "vuetify/lib";
import MobileProjectSpecs from './MobileProjectSpecs'

export default {
  props: ["id"],
  components: {
    VTabs,
    VTab,
    VBtn,
    VTabItem,
    VCard,
    VCardText,
    MobileProjectSpecs,
  },
  name: "MobileProjectsDetailsPage",
  data() {
    return {
      active: null,
      myComponents:[
            {id:"1", name:"App Specs", component:"MobileProjectSpecs"}
        ]
    };
  },
  methods: {
  
  },
  computed: {

    projectName() {
      return this.$store.getters.loadedProject(this.id).appTitle;
    }
  }
};
</script>