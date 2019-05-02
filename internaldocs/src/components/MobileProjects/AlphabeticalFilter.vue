<template>
    <div class='azfilter'>
        <v-btn-toggle>
            <v-btn class="active" flat @click="setSelected(undefined)">
                <span>all</span>
            </v-btn>
            <v-btn :class="getClass(option)" flat v-for="(option, index) in filterOptions" :key="index" @click="setSelected(option)">
                <span>{{option}}</span>
            </v-btn>
        </v-btn-toggle>
    </div>
</template>

<script>
import {VBtnToggle, VBtn} from 'vuetify/lib';
export default {
    props:["projects"],
    components:{
        VBtnToggle,
        VBtn
    },
    data () {
        return{
            filterOptions: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
            selectedOption: undefined
        }
    },
        methods:{
            setSelected(option){
                console.log(option)
                this.$emit("selected",option);
            },
            getClass(option){
                for(var x = 0; x < this.projects.length; x++){
                   var appFirstLetter = this.projects[x].name.charAt(0).toLowerCase();
                   if(option === appFirstLetter){
                     return "active"
                   }
                }
            }
        },
    computed:{
        
    }
}
</script>

