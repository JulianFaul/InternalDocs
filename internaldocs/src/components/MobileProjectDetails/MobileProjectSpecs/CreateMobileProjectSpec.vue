<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>
                    <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Create New Project Specs</h1>
            </div>
        </div>

        <div class='scroll-container'>
            <div class='content-container'>
                <loading-page v-if='loading'></loading-page>
                <MobileProjectSpecForm :formMode="formMode" :projectID="id" :projectDetailsData="projectDetailsData" :buttonText='buttonText' @onSubmit="onSubmit"></MobileProjectSpecForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectSpecForm from './MobileProjectSpecForm';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { mapGetters } from 'vuex';
import {VIcon} from "vuetify/lib";
export default {
  name: 'CreateMobileProjectDetailsPage',
  props: ["id"],
  components:{
      MobileProjectSpecForm,
      LoadingPage,
      VIcon
  },
  data () {
    return {
        buttonText: 'Create Project Spec',
        formMode: 'create',
        projectDetailsData:{
                usedBy:                     [],
                devices:                    [],
                stores:                     [],
                generatedDoc:               '',
                multiPricelist:             false,
                multiPricelistDate:         '',
                priceListDetails:           '',
                setStatus:                  false,
                setStatusDate:              '',
                setStatusDetails:           '',
                maintenanceContactName:     '',
                maintenanceContactEmail:    '',
                quoteRequestDetails:        [],
                contactMeDetails:           [],
                specialComments:            '',
                setRepsDate:                '',
                dueDate:                    ''
        }
    }
  },
  computed:{
      ...mapGetters([
        'loading'
        ]),
  },
  methods: {
        onSubmit(payload) {
            this.$store.dispatch("createAppSpecs", payload)
            this.$router.go(-1)
    }
  }
}
</script>

