// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';

import 'material-design-icons-iconfont/dist/material-design-icons.css';
import Vuetify, {VApp} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VApp
  }
})



import 'vuetify/dist/vuetify.min.css' 
import 'vuetify/src/stylus/app.styl'

import 'normalize.css/normalize.css';
import './styles/styles.scss';



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
