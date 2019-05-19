<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>Edit Project
                 <span @click='deleteMobileProject' style='margin-right:140px; cursor: pointer;' class='button button__red' to='/create'>Delete Project</span>
                </h1>
               
            </div>
        </div>
      
        <div class='scroll-container'>
            <div class='content-container'>
                <loading-page v-if='loading'></loading-page>
                <MobileProjectForm v-else :buttonText='buttonText' :projectData='loadedProject' @onSubmit="onSubmit"></MobileProjectForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectForm from './MobileProjectForm'
import LoadingPage from '../LoadingPage/LoadingPage';
import { mapGetters } from 'vuex';
export default {
    name: 'CreateProjectPage',
    props: ['projectID'],
    components:{
        MobileProjectForm,
        LoadingPage
    },
    data () {
        return {
            buttonText: 'Update Project'
        }
    },
    computed:{
        loadedProject(){
            return this.$store.getters.loadedProject(this.projectID);
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
            console.log("update project in db with these values", payload);
        }
    }
}
</script>

