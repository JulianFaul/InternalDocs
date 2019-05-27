<template>
    <div class='form' v-on:submit.prevent>
        <button type="submit" @click='onSubmit' class="button__absolute-right button button__blue">{{buttonText}}</button>
        <v-text-field v-model='nameonstore' label='Name On Store'></v-text-field>
        <div class='form-section'>
            <h4 class='form-section__title'>Devices:</h4>
            <v-checkbox class='form-section__checkbox' v-for="(option, index) in preselecteddevices" :key="index" :label='option' :value="option" v-model="devices"></v-checkbox>
        </div>
        <v-text-field v-model='dateSubmitted' label='Date Submitted'></v-text-field>
    </div>
</template>

<script>
import {VForm, VTextField} from 'vuetify/lib';
export default {
    props: [
        "statInfoData",
        "buttonText",
        "formMode"
    ],
    components:{
        VForm,
        VTextField
    },
    data(){
        return {
            preselecteddevices: ['Desktop', 'Tablets', 'Phones'],
            nameonstore:      this.statInfoData.nameonstore,
            devices: this.statInfoData.devices,
            dateSubmitted: this.statInfoData.dateSubmitted,
            editednameonstore: '',
            editeddevices: '',
            editeddateSubmitted: ''
        }
    },
    watch:{
        nameonstore(value){
            this.statInfoData.nameonstore ? this.editednameonstore = this.url : this.editednameonstore = '' ;
        },
        devices(value){
            this.statInfoData.devices ? this.editeddevices = this.devices : this.editeddevices = '' ;
        },
        dateSubmitted(value){
            this.statInfoData.dateSubmitted ? this.editeddateSubmitted = this.dateSubmitted : this.editeddateSubmitted = '' ;
        }
    },
    methods:{
        onSubmit(){
           let payload = {}
            if(this.formMode === 'edit'){
                payload.editednameonstore = this.editednameonstore
                payload.devices = this.editeddevices
                payload.dateSubmitted = this.editeddateSubmitted
            }else{
                payload.url = this.url
                payload.username = this.username
                payload.password = this.password
                
            }
            this.$emit('onSubmit', payload);
        
        },
    } 
}
</script>

<style>

</style>
