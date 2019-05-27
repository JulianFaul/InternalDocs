<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
               <h1 class='title-container__title'>
                     <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Create New Stat Info</h1>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <MobileProjectStatForm :formMode="formMode" :statInfoData="statInfoData" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectStatForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectStatForm from './MobileProjectStatForm';
import {VIcon} from "vuetify/lib";
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["id"],
  components:{
      MobileProjectStatForm,
      VIcon
  },
  data () {
    return {
        buttonText: 'Create Info',
        formMode: 'create',
        statInfoData:{
            url: '',
            username: '',
            password: ''
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

