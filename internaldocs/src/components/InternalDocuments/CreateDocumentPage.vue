<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>Upload New Document</h1>
            </div>
        </div>
        <div class='scroll-container'>
            <div class='content-container'>
                <DocumentForm :buttonText='buttonText' :data="documentData" @onSubmit="onSubmit"></DocumentForm>
            </div>
        </div>
    </div>
</template>

<script>

import DocumentForm from './DocumentForm'
export default {
    name: 'CreateProjectPage',
    components:{
        DocumentForm
    },
    data () {
        return {
            buttonText: 'Upload Document',
            documentData: {
                title:          "",
                document_type:  "",
                division:       "",
                platform:       "",
                document_name:  ""
            }
        }
    },
    methods: {
        onSubmit(payload) {
            this.$store.dispatch("uploadInternalDocument", payload);
            this.$router.push('/documents');
        }
    }
}
</script>

