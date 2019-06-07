<template>
<v-dialog v-model="dialog" scrollable max-width="1200px">
      <template v-slot:activator="{ on }">
        <button style='float:right' class='button button__blue' v-on="on">Create New Store Details</button>
      </template>
      <v-card>
        <v-card-title>Store Details
           <button class='button button__green' flat @click="onSubmit">Save</button>
            <v-spacer></v-spacer>
            <v-icon flat @click="dialog = false">close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
       
            <div class='content-container'>
                <div class='form' v-on:submit.prevent>
                    <div class='form-section'>
                        <h4 class='form-section__title'>App Type</h4>
                        <div class='form-section__details'>
                           <v-select name='appType' id='appType' :rules="[v => !!v || 'App Type is required']" :items="appTypes" label="App Type" v-model='appType'></v-select>
                        </div>
                    </div> 

                    <div class='form-section'>
                        <h4 class='form-section__title'>Name on Store:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="nameOnStore" id="nameOnStore" v-model='nameOnStore' label='Name On Store'></v-text-field>
                        </div>
                    </div> 
                   

                    <div class='form-section'>
                        <h4 class='form-section__title'>Devices:</h4>
                        <v-checkbox name='devices' id='devices' class='form-section__checkbox' v-for="(option, index) in deviceList" :key="index" :label='option' :value="option" v-model="devices"></v-checkbox>
                    </div>

                    <div class='form-section form-section__inline'>
                        <div>
                            <h4 class='form-section__title'>Date Submitted:</h4>
                            <div class='form-section__details'>
                            <datepicker style='margin:0px;' name='dateSubmitted' id='dateSubmitted' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="dateSubmitted" v-model='dateSubmitted'></datepicker>
                            </div>
                        </div>
                        <div>
                            <h4 class='form-section__title'>Date Published:</h4>
                            <div class='form-section__details'>
                            <datepicker style='margin:0px;' name='datePublished' id='datePublished' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="datePublished" v-model='datePublished'></datepicker>
                            </div>
                        </div>
                    </div> 
                    <div class='form-section'>
                        <h4 class='form-section__title'>Store Link:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="storeLink" id="storeLink" v-model='storeLink' label='Store Link:'></v-text-field>
                        </div>
                    </div>
                    
                    <div class='form-section'>
                        <h4 class='form-section__title'>Version:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="version" id="version" v-model='version' label='Version'></v-text-field>
                        </div>
                    </div>

                    <div class='form-section'>
                        <h4 class='form-section__title'>Whats New:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="whatsnew" id="whatsnew" v-model='whatsnew' label='Whats new'></v-text-field>
                        </div>
                    </div> 
                     
                </div>
            </div>

        </v-card-text>
        <v-divider></v-divider>
       
      </v-card>
    </v-dialog>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
  name: 'CreateMobileProjectsStatInfo',
  props: ["projectID"],
  components:{
      Datepicker
  },
  data () {
    return {
        dialog:false,
        buttonText: 'Create App on Store',
        formMode: 'create',
        deviceList: ['Desktop', 'Tablets', 'Phones'],
        appTypes: ["Android", "IOS"],
        appType: "Android",
        nameOnStore:    "",
        devices:        [],
        dateSubmitted:  "",
        datePublished: "",
        version: "",
        whatsnew: "",
        storeLink: ""
    }
  },
  computed:{
      
  },
  methods: {
      customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onSubmit() {
        this.$store.dispatch("createStoreInfo", {
            projectID:      this.projectID,
            appType:        this.appType,
            nameOnStore:    this.nameOnStore,
            devices:        this.devices,
            dateSubmitted:  this.dateSubmitted,
            datePublished:  this.datePublished,
            version:        this.version,
            whatsnew:       this.whatsnew,
            storeLink:      this.storeLink
        })
        this.dialog=false
        
       
    }
  }
}
</script>

