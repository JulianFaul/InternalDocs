<template>
    <div class='form' v-on:submit.prevent>
        <button type="submit" @click='onSubmit' class="button__absolute-right button button__blue">{{buttonText}}</button>
        <v-text-field v-model='url' label='URL'></v-text-field>
        <v-text-field v-model='username' label='Username'></v-text-field>
        <v-text-field v-model='password' label='Password'></v-text-field>
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
            url:      this.statInfoData.url,
            username: this.statInfoData.username,
            password: this.statInfoData.password,
            editedUrl: '',
            editedUsername: '',
            editedPassword: ''
        }
    },
    watch:{
        url(value){
            this.statInfoData.url ? this.editedUrl = this.url : this.editedUrl = '' ;
        },
        username(value){
            this.statInfoData.username ? this.editedUsername = this.username : this.editedUsername = '' ;
        },
        password(value){
            this.statInfoData.password ? this.editedPassword = this.password : this.editedPassword = '' ;
        }
    },
    methods:{
        onSubmit(){
           let payload = {}
            if(this.formMode === 'edit'){
                payload.url = this.editedUrl
                payload.username = this.editedUsername
                payload.password = this.editedPassword
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
