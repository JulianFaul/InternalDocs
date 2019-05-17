<template>
    <div>
        <div class='content-container'>
            <div class='title-container'>
                <h1 class='title-container__title'>Documents</h1>
                 <router-link class='button button__blue' to='/documentupload'>Upload New Document</router-link>
            </div>
        </div>
        <loading-page v-if='loading'></loading-page>
        <div v-else class='scroll-container'>
            <div class='content-container'>
                <h3 v-if="notEmptyObject(loadedInternalDocuments)">No Documents uploaded</h3>
                <DocumentList :documents="groupedDocuments" />
            </div>
        </div>
    </div>
</template>

<script>
import DocumentList from './DocumentList';
import LoadingPage from '../LoadingPage/LoadingPage';
import { mapGetters } from 'vuex';
export default {
    name: 'DocumentsPage',
    components:{
        DocumentList,
        LoadingPage
    },
    data () {
        return {
        }
    },
    computed: {
        groupedDocuments(){
 
         let sortedInternalDocuments = this.loadedInternalDocuments.sort((projectA, projectB) => {
            return projectA.document_type.localeCompare(projectB.document_type)
        })
        
        let groupedDocuments = {};
        for (let d = 0; d < sortedInternalDocuments.length; d ++){
                let doc = sortedInternalDocuments[d];
                    if (groupedDocuments[doc.document_type] === undefined) {
                        groupedDocuments[doc.document_type] = []
                    }
                    groupedDocuments[doc.document_type].push(doc);
            }
        const orderedGroupedDocuments = {};
            Object.keys(groupedDocuments).sort().forEach((key) => {
                orderedGroupedDocuments[key] = groupedDocuments[key];
            });
            return orderedGroupedDocuments
        },
        
     ...mapGetters([
            'loadedInternalDocuments',
            'loading'
        ]),
    },
    methods: {
        

        notEmptyObject(loadedInternalDocuments){
            return Object.keys(loadedInternalDocuments).length === 0
        }
    },
    mounted () {
        this.$store.dispatch('getInternalDocuments')
    }
}
</script>

