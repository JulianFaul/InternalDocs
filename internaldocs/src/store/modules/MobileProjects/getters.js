export default {
    loadedMobileProjects(state){
        return state.loadedMobileProjects.sort((projectA, projectB) => {
            return projectA.appTitle.localeCompare(projectB.appTitle)
        })
    },
    loadedProject(state){
        return (projectID) => {
            return state.loadedMobileProjects.find((project) => {
                return project.id == projectID
            })
        }
    }
}