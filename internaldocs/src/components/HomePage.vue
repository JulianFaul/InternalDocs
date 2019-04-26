<template>
  <div class="homepage">
      <MainDashBoard />
  </div>
</template>

<script>
import MainDashBoard from './MainDashBoard/MainDashBoard.vue';
export default {
  components: {
    MainDashBoard
  },
  name: 'HomePage',
  data () {
    return {
    }
  }
}
</script>
