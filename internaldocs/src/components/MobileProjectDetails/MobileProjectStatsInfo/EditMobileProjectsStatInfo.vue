<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
               <h1 class='title-container__title'>
                     <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Edit Stat Info</h1>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <MobileProjectStatForm :formMode="formMode" :statInfoData="loadedAppInfo" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectStatForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectStatForm from './MobileProjectStatForm';
import {VIcon} from "vuetify/lib";
import { mapGetters } from 'vuex';
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["id"],
  components:{
      MobileProjectStatForm,
      VIcon
  },
  data () {
    return {
        buttonText: 'Update Info',
        formMode: 'edit'
    }
  },
  computed:{
       ...mapGetters([
        'loadedAppInfo',
        'loading'
    ]),
  },
  methods: {
        onSubmit(payload) {
        this.$store.dispatch("updateStatInfo", {projectID: this.id, infoID:this.loadedAppInfo._id , data: payload})
        // this.$router.push('/details/' + this.id)
    }
  }
}
</script>

