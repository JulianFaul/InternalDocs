<template>
<div>
    <div class='content-container'>
        <div class='title-container'>
            <h1 class='title-container__title'>Create New Project</h1>
        </div>
    </div>
    <div class='scroll-container'>
        <div class='content-container'>
    <MobileProjectForm :buttonText='buttonText' :project='project' @onSubmit="onSubmit"></MobileProjectForm>
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
            project: {
                appVersion:  '' ,
                country: '',
                appType: '',
                productType: '',
                priority: '',
                appLive: '',
                appDemo: '',
                appStaging: '',
                appDevel: '',
                liveDate: '',
                demoDate: '',
                stagingDate: '',
                develDate: '',
                milestone: '',
                appStatus: ''
            }
        }
    },
    methods: {
        onSubmit(payload) {
            console.log("create project in db with these values", payload);
        }
    }
}
</script>

