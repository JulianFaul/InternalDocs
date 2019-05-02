<template>
<div>
  <div class='content-container'>
    <div class='mobile-projects-page'>
      <div class='title-container'>
        <h1 class='title-container__title'>Mobile Projects</h1>
        <router-link class='button button__blue' to='/create'>Create New Project</router-link>
      </div>
      </div>
    </div>
    <div class='scroll-container'>
        <ProjectDashBoard />
      </div>
    </div>
</template>

<script>
import ProjectDashBoard from './ProjectDashBoard'

export default {
    components: {
        ProjectDashBoard
    },
    name: 'MobileProjectsPage',
    data () {
        return {
        }
    }
}
</script>

