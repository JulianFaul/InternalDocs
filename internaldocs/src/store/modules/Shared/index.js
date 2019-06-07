import axios from 'axios';
export default {
    state: {
      loading: false,
      error: null,
      activeTab: null,
      snackbarthing: false
    },
    mutations: {
      snackbar(state, payload){
        state.snackbarthing = payload
      },
      setActiveTab(state, payload){
        state.activeTab = payload;
      },
      setLoading (state, payload) {
       
        state.loading = payload
      },
      setError (state, payload) {
        state.error = payload
      },
      clearsnack(state){
        state.snackbarthing = {show: false, message: ''}
      },
      clearError (state) {
        state.error = null
      }
    },
    actions: {
      setSnack({commit}, payload){
        commit("snackbar", payload)
      },
      clearSnack({commit}, payload){
        commit("clearsnack")
      },
      downloadFile({}, payload){
        let url = payload.url;
        let filename = payload.filename;
        axios({
            method: 'get',
            url: url,
            responseType: 'arraybuffer'
          })
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
            
          })
          .catch(() => console.log('error occured'))
      },
      
      setActiveTab({commit}, payload){
        commit('setActiveTab', payload)
      },
      clearError ({commit}) {
        commit('clearError')
      }
    },
    getters: {
      getActiveTab(state){
        return state.activeTab
      },
      loading (state) {
        return state.loading
      },
      snackbarthing(state){
        return state.snackbarthing;
      },
      error (state) {
        return state.error
      }
    }
  }