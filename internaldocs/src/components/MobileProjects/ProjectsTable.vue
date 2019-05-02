<template>
<div class='content-container'>
  <div class='filter-component'>
    <az-filter :projects='projects' v-on:selected="selectedAlphabeticalFilterOption"></az-filter>

  </div>
    <v-data-table
        :headers="headers"
        :items="projects"
        class="elevation-1 v-data-table"
        >
        <template v-slot:items="props">
            <td class="text-xs-center">
            <v-icon
                small
                class="text-xs-center"
                @click="editItem(props.item)">
                edit
            </v-icon>
            </td>
            <td class="text-xs-center">
              <img src="../../assets/testlogo.png">
            </td>
            <td class='project-name'>
                <div class='project-name__title'>App Name</div>
                <div class='project-name__link'><router-link to="./">Details</router-link></div>
            </td>
            <td class="text-xs-center">MySpec</td>
            <td class="text-xs-center ">
                App is live
            </td>
            <td class="text-xs-center project-status">
                <v-progress-linear class="project-status__progress" v-model="valueDeterminate"></v-progress-linear>
                <div class='project-status__icons'>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                    <div class='project-status__icons__icon'><v-icon>radio_button_checked</v-icon></div>
                </div>
                <div class='project-status__status'>
                    <div class='project-status__status__item project-status__status__item__active'>checklist meeting</div>
                    <div class='project-status__status__item project-status__status__item__disabled'>mocup presented</div>
                    <div class='project-status__status__item project-status__status__item__disabled'>mocup signed off</div>
                    <div class='project-status__status__item project-status__status__item__disabled'>deliver v1</div>
                    <div class='project-status__status__item project-status__status__item__disabled'>deliver v2</div>
                    <div class='project-status__status__item project-status__status__item__disabled'>final sign off</div>
                </div>
            </td>
            <td class="text-xs-center">
              <div class='project-version'>
                <div>
                  <div class='project-version__title'><router-link to='nowhere' class='project-version__title__pink project-version__title__disabled'>Devel</router-link></div>
                  <div class='project-version__date'>29/04/2019</div>
                </div>
                <div>
                  <div class='project-version__title'><router-link to='nowhere' class='project-version__title__yellow'>Staging</router-link></div>
                  <div class='project-version__date'>29/04/2019</div>
                </div>
                <div>
                  <div class='project-version__title'><router-link to='nowhere' class='project-version__title__blue'>Demo</router-link></div>
                  <div class='project-version__date'>29/04/2019</div>
                </div>
                <div>
                  <div class='project-version__title'><router-link to='nowhere' class='project-version__title__green'>Live</router-link></div>
                  <div class='project-version__date'>29/04/2019</div>
                </div>
              </div>
            </td>
            
        </template>
        </v-data-table>
    </div>
</template>


<script>
import azFilter from './AlphabeticalFilter'
import { VDataTable, VIcon, VProgressLinear } from 'vuetify/lib';

export default {
  name: 'ProjectDashoard',
  components: {
      VProgressLinear,
      VIcon,
      VDataTable,
      azFilter
  },
  data: () => ({
     valueDeterminate: 50,
     alphabeticalFilterOption: "",
      headers: [
        { text: '' ,align: 'center', value: '', sortable: false, width:"20px"},
        { text: '' ,align: 'center', value: '', sortable: false, width:"20px"},
        {
          text: 'Name',
          align: '',
          sortable: true,
          value: 'name',
          width:"100px"
        },
        { text: 'Product',align: 'center', value: 'product' },
        { text: 'Status',align: 'center', value: 'status' },
        { text: 'Milestone',align: 'center', value: 'milestone',sortable: false, width:"300px" },
        { text: 'Versions',align: 'center', value: 'versions',sortable: false },
      
      ],
    desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
      }),
      methods:{
        selectedAlphabeticalFilterOption(option) {
            this.alphabeticalFilterOption = option;
        },
      },
      computed: {
        projects(){
           let projects = this.desserts;
           if(this.alphabeticalFilterOption){
             projects = projects.filter(project => {
                    let firstLetter = project.name.charAt(0).toLowerCase();
                    return firstLetter === this.alphabeticalFilterOption;
                });
           }
           return projects
        }
      }
}

</script>

