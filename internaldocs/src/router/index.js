import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import AdminPage from '../components/Admin/AdminPage'
import TaskTracker from '../components/TaskTracker/TaskTracker'
import MobileProjectsPage from '../components/MobileProjects/MobileProjectsPage'
import CreateMobileProjectPage from '../components/MobileProjects/CreateMobileProjectPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      children: [
        
      ]
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage,
    },
    {
      path: '/tasktracker',
      name: 'task',
      component: TaskTracker,
    },
    {
      path: '/mobileprojects',
      name: 'MobileProjectsPage',
      component: MobileProjectsPage,
    },
    {
      path: '/create',
      name: 'MobileProjectsPageCreate',
      component: CreateMobileProjectPage,
    }

  ],
  mode: 'history'
})
