<template>
    <div class='project-dashboard'>
      <loading-page v-if='loading'></loading-page>
      <ProjectsTable v-else :projectsData="loadedMobileProjects"/>
    </div>
</template>

<script>
import ProjectsTable from './ProjectsTable'
import { mapGetters } from 'vuex';
import LoadingPage from '../LoadingPage/LoadingPage';
export default {
  name: 'ProjectDashoard',
  components: {
        ProjectsTable,
        LoadingPage
    },
  data () {
    return {
    }
  },
  computed: {
     ...mapGetters([
      'loadedMobileProjects',
      'loading'
    ]),
  }
}
</script>

