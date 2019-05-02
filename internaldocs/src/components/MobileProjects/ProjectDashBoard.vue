<template>
    <div class='project-dashboard'>
      <ProjectsTable />
    </div>
</template>

<script>
import ProjectsTable from './ProjectsTable'
export default {
  name: 'ProjectDashoard',
  components: {
        ProjectsTable
    },
  data () {
    return {
    }
  }
}
</script>

