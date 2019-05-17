<template>

    <v-form class='form' v-on:submit.prevent>
        <button @click='onSubmit' class="button__absolute-right button button__blue">{{buttonText}}</button>
        <div class='form-section'>
            <h4 class='form-section__title'>Document:</h4>
            <input style="display:none;" type="file" @change="onFileSelected" ref="fileInput">
            <button class='button button__blue' small dark @click="$refs.fileInput.click()">Pick File</button>
            <p v-if="document_name">Current Docment: {{document_name}}</p>
            <!-- <p class='form-section__note'><b>Please note:</b> Please upload a .png file with size 120 x 120px</p> -->
        </div>
        <div class='form-section'>
            <h4 class='form-section__title'>Document Details:</h4>
            <div class='form-section__details'>
                <v-text-field  label="Document Name" v-model="payload.title"></v-text-field>
                <v-select :items="divisions" label="Document Division" v-model='payload.division'></v-select>
                <v-select :items="documentTypes" label="Document Type" v-model='payload.document_type'></v-select>
                <v-select :items="platforms" label="Document Type" v-model='payload.platform'></v-select>
            </div>
        </div>
 

        
    </v-form>
</template>

<script>

import {VForm, VTextField,VSelect, VRadioGroup, VRadio, VCheckbox} from 'vuetify/lib';
import Datepicker from 'vuejs-datepicker';
export default {
    props: [
        'data',
        'buttonText'
    ],
    components:{
        VForm,
        VSelect,
        VTextField,
        VRadioGroup,
        VRadio,
        VCheckbox,
        Datepicker
    },
    name: 'MobileProjectForm',
    data () {
        return {
            divisions: ["Sales","Marketing/Advertising", "Stationery/Media", "Company Policies", "Procedures", "CRM/CL"],
            documentTypes: ["Applications", "Checklist/Requirements", "License Agreement", "Proposals", "Quotes","Price Adjustments", "Reviews/Signoffs", "Sales Agreements", "Sales Cards", "Business Cards"],
            platforms: ["AutoSpec", "MySpec", "MyQuote", "NDTec", "QSPlus/BuilderPlus"],
            document_name:  this.data.document_name,
            payload: {
                title:          this.data.title,
                document_type:  this.data.document_type,
                division:       this.data.division,
                platform:       this.data.platform,
                file:           null
            }
        }
    },
    methods:{
        onSubmit(){
            this.$emit('onSubmit', this.payload);
        },
       
        onFileSelected(event){
        const file = event.target.files[0];
        this.payload.file = file
        // console.log(image)
        // this.previewUrl = URL.createObjectURL(image);
        // const imageName = image.name;
  
        // if(imageName.lastIndexOf(".") <= 0){
        //   alert("Please select a valid file type.")
        // }

        // this.formdata.selectedImage = image;
        
      }
    }
}
</script>

