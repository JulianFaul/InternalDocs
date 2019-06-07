<template>
    <div>
    <v-dialog v-model="dialog" scrollable max-width="600px">
      <template v-slot:activator="{ on }">
        <button style='float:right' class='button button__green' v-on="on">Update</button>
      </template>
        <v-card>
            <v-card-title>Upload New Document
                <button class='button button__green' @click='updateFile' flat>Update</button>
                <v-spacer></v-spacer>
                <v-icon flat @click="dialog = false">close</v-icon>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <div class='form-section'>
                    <h4 class='form-section__title'>Select Document to upload</h4>
                    <input style="display:none;" type="file" @change="onFileSelected()" multiple ref="onPriceListSelected">
                    <button style="margin:0;" class='button button__green' small dark @click="$refs.onPriceListSelected.click()">Select File</button>
                </div>
                <div v-if='specDocument' class='form-section'>
                    <h4 class='form-section__title'>Selected Document:</h4>
                    <div>{{specDocument.name}}</div>
                </div>
            </v-card-text>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props:[
        'specDocID'
    ],
    data(){
        return{
            dialog: false,
            specDocument: null
        }
    },
    computed:{
        ...mapGetters([
            'user'
        ]),
    },
    methods:{
        onFileSelected(){
             let file =  event.target.files[0];
             this.specDocument = file;
        },
        updateFile(){
            
            this.$store.dispatch('updateSpecDocument',{userID: this.user.id, specDocID: this.specDocID, specDoc: this.specDocument})
        },
    }
}
</script>

<style>

</style>
