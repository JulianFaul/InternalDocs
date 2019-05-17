export default {
    setInternalDocuments (state, payload) {
        state.loadedInternalDocuments = payload
      },
    createInternalDocument(state, payload){
        state.loadedInternalDocuments.push(payload)
    },
    deleteInternalDocument(state, payload){
        const internalDocuments = state.loadedInternalDocuments;
        internalDocuments.splice(internalDocuments.findIndex(currentDocument => currentDocument.id === payload), 1)
    }
}