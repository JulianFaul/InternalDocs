<template>
  <div class='content-container'>
    <div class='main-dashboard'>
      <div class='title-container'>
        <h1 class='title-container__title'>Welcome {{user.userName}} to the Central Hub</h1>
      </div>
      <div class='main-dashboard__items'>
        <router-link class='main-dashboard__item' to='/admin'>Admin</router-link>
        <router-link class='main-dashboard__item' to='/data'>Data</router-link>
        <router-link class='main-dashboard__item' to='/dev'>Dev</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDashBoard',
  data () {
    return {
    }
  },
   computed: {
    user () {
      return this.$store.getters.user
    }
  },
}
</script>

