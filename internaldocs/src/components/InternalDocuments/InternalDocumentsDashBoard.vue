<template>
  <div class='content-container'>
    <div class='main-dashboard'>
      <div class='title-container'>
        <h1 class='title-container__title'>Internal Documents</h1>
      </div>
      <div class='main-dashboard__items'>
        <router-link class='main-dashboard__item' to='/documents'>Documents</router-link>
        <router-link class='main-dashboard__item' to='/autospecstandard'>Autospec Standards</router-link>
        <router-link class='main-dashboard__item' to='/howto'>How To</router-link>
        <!-- <router-link class='main-dashboard__item' to='/platformupdates'>How To</router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InternalDocuments',
  data () {
    return {
    }
  }
}
</script>

