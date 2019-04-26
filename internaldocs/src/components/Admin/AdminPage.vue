<template>
  <div class='content-container'>
    <div class='main-dashboard'>
      <div class='title-container'>
        <h1 class='title-container__title'>Admin</h1>
      </div>
      <div class='main-dashboard__items'>
        <router-link class='main-dashboard__item' to='/tasktracker'>Task Tracker</router-link>
        <router-link class='main-dashboard__item' to='/mobileprojects'>Mobile Projects</router-link>
        <router-link class='main-dashboard__item' to='/internaldocuments'>Internal Documents</router-link>
        <router-link class='main-dashboard__item' to='/statsmailer'>Autospec Stats Mailer</router-link>
        <router-link class='main-dashboard__item' to='/bannerstats'>Banner Ad Stats</router-link>
        <!-- <router-link class='main-dashboard__item' to='/bannerstats'>Banner Ad Stats</router-link> -->
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
  }
}
</script>

