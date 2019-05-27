// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';

// import Vuetify, {VApp} from 'vuetify/lib'
import store from './store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
// Vue.use(Vuetify, {
//   components: {
//     VApp
//   }
// })

Vue.use(Vuex);
import snackbar from './components/SnackBarNotification/snackbar'
Vue.component('snackbar', snackbar)
// CSS IMPORTS
import 'vuetify/dist/vuetify.min.css' 
import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'normalize.css/normalize.css';

import './styles/styles.scss';



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
