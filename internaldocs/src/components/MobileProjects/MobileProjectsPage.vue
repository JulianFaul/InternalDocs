<template>
  <div class='content-container'>
    <div class='mobile-projects-page'>
      <div class='title-container'>
        <h1 class='title-container__title'>Mobile Projects</h1>
        <button>Create New Project</button>
      </div>
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

