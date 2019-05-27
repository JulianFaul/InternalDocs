export default {
    setAppInfo(state, payload) {
        state.loadedAppInfo = payload
      },
    createStatInfo(state, payload){
        state.loadedAppInfo = payload
    },
    updateInfo(state, payload){
        if(payload.url){
            state.loadedAppInfo.url = payload.url
        }
        if(payload.username){
            state.loadedAppInfo.username = payload.username
        }
        if(payload.password){
            state.loadedAppInfo.password = payload.password
        }
    }
    
}