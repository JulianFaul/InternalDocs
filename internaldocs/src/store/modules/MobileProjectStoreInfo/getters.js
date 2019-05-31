export default {
    loadedStoreInfo(state){
        return state.loadedStoreInfo;
    },
    loadedStoreInfoSingle(state){
        
        return (infoID) => {
            return state.loadedStoreInfo.find((info) => {
                return info.id == infoID
            })
        }
    }
}

