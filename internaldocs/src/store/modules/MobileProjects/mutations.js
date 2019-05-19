export default {
    setMobileProjects (state, payload) {
        state.loadedMobileProjects = payload
      },
    createMobileProject(state, payload) {
      state.loadedMobileProjects.push(payload)
    },
    deletemobileProject(state, payload){
      const mobileprojects = state.loadedMobileProjects;
      mobileprojects.splice(mobileprojects.findIndex(currentProject => currentProject.id === payload), 1)
    }
}