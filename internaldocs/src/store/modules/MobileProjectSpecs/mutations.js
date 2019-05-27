export default {
    setAppSpecs(state, payload) {
        state.loadedAppSpecs = payload
      },
    updateAppSpecs(state, payload) {
        state.loadedAppSpecs = payload
    },
    deleteAppSpecDoc(state, payload){
        const documents = state.loadedAppSpecs.appspecdocs
        documents.splice(documents.findIndex(currentDocument => currentDocument.id === payload), 1)
    },
    
}