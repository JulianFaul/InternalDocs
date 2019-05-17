export default {
    loadedAppSpecs(state){
        console.log(state.loadedAppSpecs)
        return state.loadedAppSpecs;
    },
    loadedAppSpec(state){
        console.log(state.loadedAppSpecs)
        // return (projectID) => {
        //     return state.loadedAppSpecs.find((details) => {
        //         return details.projectID === projectID
        //     })
        // }
    },
    loadedPricelistDocuments(state){
        return state.loadedPricelistDocuments;
    }
}

