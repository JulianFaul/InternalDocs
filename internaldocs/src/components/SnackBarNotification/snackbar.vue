<template>
  <v-card>
    <v-snackbar
      v-model="snackbarthing.show"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
     {{snackbarthing.message}}
      <button
        class="button button__green"
        @click="clearSnack"
      >
        Close
      </button>
      
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        y: 'top',
        x: null,
        mode: '',
        timeout: 3000,
      }
    },
    methods: {
        clearSnack(){
            this.$store.dispatch("clearSnack")
        },
    },
     computed: {
    
     ...mapGetters([
         'snackbarthing'
    ]),
  },
  }
</script>