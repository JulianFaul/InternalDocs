import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import MobileProjects from './modules/MobileProjects'
import MobileProjectDetails from './modules/MobileProjectDetails'
import InternalDocuments from './modules/InternalDocuments'
import Shared from './modules/Shared'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    MobileProjects,
    MobileProjectDetails,
    InternalDocuments,
    Shared
  },
  plugins: [createPersistedState()],
})