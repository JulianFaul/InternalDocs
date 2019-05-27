<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>
                    <router-link to='/mobileprojects'>
            <v-icon style='vertical-align: middle;'>keyboard_backspace</v-icon>
          </router-link> Edit Project
                 <span @click='deleteMobileProject' style='margin-right:140px; cursor: pointer;' class='button button__red' to='/create'>Delete Project</span>
                </h1>
               
            </div>
        </div>
      
        <div class='scroll-container'>
            <div class='content-container'>
                <loadingPage v-if='loading'></loadingPage>
                <MobileProjectForm v-else :formMode='formMode' :buttonText='buttonText' :projectData='loadedProject' @onSubmit="onSubmit"></MobileProjectForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectForm from './MobileProjectForm'
import LoadingPage from '../LoadingPage/LoadingPage';
import {VIcon} from 'vuetify/lib';
import { mapGetters } from 'vuex';
export default {
    name: 'CreateProjectPage',
    props: ['projectID'],
    components:{
        MobileProjectForm,
        LoadingPage,
        VIcon
    },
    data () {
        return {
            buttonText: 'Update Project',
            formMode: 'edit'
        }
    },
    computed:{
        loadedProject(){
            let project = this.$store.getters.loadedProject(this.projectID);
            if(project){
                return this.$store.getters.loadedProject(this.projectID);
            }else{
                return this.$store.dispatch('getMobileProjects')
            }
        },
        ...mapGetters([
        'loadedAppSpecs',
        'loading'
        ]),
    },
    methods: {
        deleteMobileProject(){
            this.$store.dispatch('deleteMobileProject', {projectID : this.projectID, specID: this.loadedAppSpecs.specID})
            this.$router.push('/mobileprojects');
        },
        onSubmit(payload) {
            payload.projectID = this.projectID
            this.$store.dispatch("updateMobileProject", payload);
        }
    },
    
}
</script>

