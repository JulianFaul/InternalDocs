export default {
    setloadedStoreInfo(state, payload) {
        state.loadedStoreInfo = payload
      },
      createStoreInfo(state, payload){
        state.loadedStoreInfo.push(payload)
      },
      removeStoreInfo(state, payload){
        const projectInfo = state.loadedStoreInfo;
        projectInfo.splice(projectInfo.findIndex(currentInfo => currentInfo.id === payload), 1)

      }
}