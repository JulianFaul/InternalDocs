<template>
    <div>
        <v-list class="document-list__group" v-for="(document_group,group_name,index) in documents" :key="index">
           <v-subheader class="document-list__header"><h3>{{group_name}}</h3></v-subheader>
                <v-divider :key="index"></v-divider>
            <v-list-tile class="document-list__item" v-for="doc in documents[group_name]" :key="doc.id">
                <v-list-tile-content>
                    <v-list-tile-title v-html="doc.title"></v-list-tile-title>
                    <v-list-tile-sub-title >Uploaded: {{doc.createdAt}} Division: {{doc.division}} - {{doc.platform}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-spacer></v-spacer>
                    <v-icon @click='download' class="button">vertical_align_bottom</v-icon>
                    <button class="button button__blue">Update</button>
                    <v-icon @click='deleteDocument(doc.id)' class="button button__red-text">delete</v-icon>
            </v-list-tile>
        </v-list>
      </div>
</template>

<script>
import {VIcon, VSpacer,VDivider,VSubheader,VLayout, VList, VListTileContent, VListTileTitle, VListTileSubTitle, VListTile} from 'vuetify/lib';
export default {
    name: 'DocumentList',
    components:{
        VDivider,
        VSubheader,
        VLayout,
        VList,
        VListTile,
        VListTileContent,
        VListTileTitle,
        VListTileSubTitle,
        VSpacer,
        VIcon
    },
    props: [
        "documents"
    ],
    data () {
        return {
        }
    },
    methods:{
        download(){
            console.log("Download file")
        },
        deleteDocument(id){
            this.$store.dispatch("deleteInternalDocument", id)
        }
    }
}
</script>

