<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
               <h1 class='title-container__title'>
                     <router-link :to="'/details/' + id">
                    <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
                </router-link>Update</h1>
                <button type="submit" @click='onSubmit' class="button button__blue">{{buttonText}}</button>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <div class='form' v-on:submit.prevent>

                    <div class='form-section'>
                        <h4 class='form-section__title'>App Type : {{eappType}}</h4>
                        
                    </div> 

                    <div class='form-section'>
                        <h4 class='form-section__title'>Name on Store:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="nameOnStore" id="nameOnStore" v-model='enameOnStore' label='Name On Store'></v-text-field>
                        </div>
                    </div> 
                   

                    <div class='form-section'>
                        <h4 class='form-section__title'>Devices:</h4>
                        <v-checkbox name='devices' id='devices' class='form-section__checkbox' v-for="(option, index) in deviceList" :key="index" :label='option' :value="option" v-model="edevices"></v-checkbox>
                    </div>

                    <div class='form-section form-section__inline'>
                        <div>
                            <h4 class='form-section__title'>Date Submitted:</h4>
                            <div class='form-section__details'>
                            <datepicker style='margin:0px;' name='dateSubmitted' id='dateSubmitted' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="edateSubmitted" v-model='edateSubmitted'></datepicker>
                            </div>
                        </div>
                        <div>
                            <h4 class='form-section__title'>Date Published:</h4>
                            <div class='form-section__details'>
                            <datepicker style='margin:0px;' name='datePublished' id='datePublished' placeholder='Please select a date' class='form-section__datepicker' :format="customFormatter" :value="edatePublished" v-model='edatePublished'></datepicker>
                            </div>
                        </div>
                    </div> 
                    <div class='form-section'>
                        <h4 class='form-section__title'>Store Link:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="storeLink" id="storeLink" v-model='estoreLink' label='Store Link:'></v-text-field>
                        </div>
                    </div>
                    
                    <div class='form-section'>
                        <h4 class='form-section__title'>Version:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="version" id="version" v-model='eversion' label='Version'></v-text-field>
                        </div>
                    </div>

                    <div class='form-section'>
                        <h4 class='form-section__title'>Whats New:</h4>
                        <div class='form-section__details'>
                         <v-text-field name="whatsnew" id="whatsnew" v-model='ewhatsnew' label='Whats new'></v-text-field>
                        </div>
                    </div> 
                     
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment';
export default {
    
  name: 'UpdateMobileProjectsStatInfo',
  props: ["id","storeDetails"],
  components:{
      Datepicker
  },
  data () {
    return {
        buttonText: 'Update',
        formMode: 'create',
        deviceList: ['Desktop', 'Tablets', 'Phones'],
        appTypes: ["Android", "IOS"],

        eappType:        this.storeDetails.appType,
        enameOnStore:    this.storeDetails.nameOnStore,
        edevices:        this.storeDetails.devices,
        edateSubmitted:  this.storeDetails.dateSubmitted,
        edatePublished:  this.storeDetails.datePublished,
        eversion:        this.storeDetails.version,
        ewhatsnew:       this.storeDetails.whatsnew,
        estoreLink:      this.storeDetails.storeLink
    }
  },
  computed:{
      
  },
  methods: {
      customFormatter(date) {
            return moment(date).format('dddd, MMMM Do YYYY');
        },
        onSubmit(payload) {
        this.$store.dispatch("createStoreInfo", {
            projectID:      this.id,
            appType:        this.eappType,
            nameOnStore:    this.enameOnStore,
            devices:        this.edevices,
            dateSubmitted:  this.edateSubmitted,
            datePublished:  this.edatePublished,
            version:        this.eversion,
            whatsnew:       this.ewhatsnew,
            storeLink:      this.estoreLink
        })
        let vm = this;
        setTimeout(function(){ vm.$router.push("/details/" + vm.id) }, 5);
        
       
    }
  }
}
</script>

