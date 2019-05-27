<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
               <h1 class='title-container__title'>
                     <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Create</h1>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <MobileProjectStoreForm :formMode="formMode" :statInfoData="statInfoData" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectStoreForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectStoreForm from './MobileProjectStoreForm';
import {VIcon} from "vuetify/lib";
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["id"],
  components:{
      MobileProjectStoreForm,
      VIcon
  },
  data () {
    return {
        buttonText: 'Create Info',
        formMode: 'create',
        statInfoData:{
            nameonstore: '',
            devices: [],
            dateSubmitted: ''
        }
    }
  },
  computed:{
      
  },
  methods: {
        onSubmit(payload) {
        this.$store.dispatch("createStatInfo", {projectID: this.id, data: payload})
        this.$router.go(-1)
    }
  }
}
</script>

