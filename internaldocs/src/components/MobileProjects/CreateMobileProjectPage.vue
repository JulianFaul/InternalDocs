<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>Create New Project</h1>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <MobileProjectForm :buttonText='buttonText' :projectData='projectData' @onSubmit="onSubmit"></MobileProjectForm>
            </div>
        </div>
    </div>
</template>

<script>

import MobileProjectForm from './MobileProjectForm'
export default {
    name: 'CreateProjectPage',
    components:{
        MobileProjectForm
    },
    data () {
        return {
            buttonText: 'Create Project',
            projectData: {
                appTitle: '',
                appSubtitle: '',
                appVersion:  '' ,
                country: '',
                appType: '',
                productType: '',
                priority: '',
                appLive: false,
                appDemo: false,
                appStaging: false,
                appDevel: false,
                liveDate: '',
                demoDate: '',
                stagingDate: '',
                develDate: '',
                milestone: '',
                appStatus: '',
                liveLink: '',
                demoLink: '',
                stagingLink: '',
                develLink: '',
                icon: '',
            }
        }
    },
    methods: {
        onSubmit(payload) {
            this.$store.dispatch('createMobileProject', payload);
            this.$router.push('/mobileprojects');
        }
    }
}
</script>

