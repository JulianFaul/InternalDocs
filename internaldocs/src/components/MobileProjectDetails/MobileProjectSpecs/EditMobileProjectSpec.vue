<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>
                    <router-link :to="'/details/' + id">
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link>Edit Project Details</h1>
            </div>
        </div>

        <div class='scroll-container'>
            <div class='content-container'>
                <loading-page v-if='loading'></loading-page>
                <MobileProjectSpecForm :formMode="formMode" :projectID="id" :projectDetailsData="formatedAppSpecs" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectSpecForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectSpecForm from './MobileProjectSpecForm';
import LoadingPage from '../../LoadingPage/LoadingPage';
import {VIcon} from 'vuetify/lib';
import { mapGetters } from 'vuex';
export default {
  name: 'EditMobileProjectDetailsPage',
  props: ["id","specID"],
  components:{
      LoadingPage,
      MobileProjectSpecForm,
      VIcon
  },
  data () {
    return {
        buttonText: 'Update Project Details',
        formMode: 'edit'
    }
  },
  computed:{
      formatedAppSpecs(){
          let docs = this.loadedAppSpecs.appspecdocs;
          let existingPricelists = [];
          let existingRepFiles = [];
          let existingStatusFiles = [];
          let existingCustomerFiles = [];
          for(let key in docs){
              let doc = docs[key];
              let header = docs[key].header
              if(header === 'Pricelist Files'){
                  existingPricelists.push(doc)
              }
              if(header === 'Rep Files'){
                  existingRepFiles.push(doc)
              }
              if(header === 'Status Files'){
                  existingStatusFiles.push(doc)
              }
              if(header === 'Customer Files'){
                  existingCustomerFiles.push(doc)
              }
          }
             return {
                ...this.loadedAppSpecs,
                existingPricelists,
                existingRepFiles,
                existingStatusFiles,
                existingCustomerFiles
              }
      },
    ...mapGetters([
        'loadedAppSpecs',
        'loading'
        ]),
  },
  methods: {
    onSubmit(payload) {
        payload.specID = this.loadedAppSpecs.specID
        this.$store.dispatch("updateAppSpecs", payload)
        this.$router.go(-1)
    }
  }
}
</script>

