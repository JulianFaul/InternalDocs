import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import MobileProjects from './modules/MobileProjects'
import MobileProjectSpecs from './modules/MobileProjectSpecs'
import MobileProjectInfo from './modules/MobileProjectInfo'

import InternalDocuments from './modules/InternalDocuments'
import Shared from './modules/Shared'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    MobileProjects,
    MobileProjectSpecs,
    InternalDocuments,
    MobileProjectInfo,
    Shared
  },
  // plugins: [createPersistedState()],
})