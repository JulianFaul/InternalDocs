import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../components/HomePage'
import AdminPage from '../components/Admin/AdminPage'
import TaskTracker from '../components/TaskTracker/TaskTracker'
import MobileProjectsPage from '../components/MobileProjects/MobileProjectsPage'
import CreateMobileProjectPage from '../components/MobileProjects/CreateMobileProjectPage'
import EditMobileProjectPage from '../components/MobileProjects/EditMobileProjectPage'

import InternalDocumentsDashBoard from '../components/InternalDocuments/InternalDocumentsDashBoard'
import DocumentsPage from '../components/InternalDocuments/DocumentsPage'
import CreateDocumentPage from '../components/InternalDocuments/CreateDocumentPage'

import MobileProjectDetails from '../components/MobileProjectDetails/MobileProjectDetailsPage'
import CreateMobileProjectSpec from '../components/MobileProjectDetails/MobileProjectSpecs/CreateMobileProjectSpec'
import EditMobileProjectSpec from '../components/MobileProjectDetails/MobileProjectSpecs/EditMobileProjectSpec'


import CreateMobileProjectsStatInfo from '../components/MobileProjectDetails/MobileProjectStatsInfo/CreateMobileProjectsStatInfo'
import EditMobileProjectsStatInfo from '../components/MobileProjectDetails/MobileProjectStatsInfo/EditMobileProjectsStatInfo'

import CreateMobileProjectStore from '../components/MobileProjectDetails/MobileProjectStore/CreateMobileProjectStore'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage
    },
    {
      path: '/tasktracker',
      name: 'task',
      component: TaskTracker
    },
    {
      path: '/mobileprojects',
      name: 'MobileProjectsPage',
      component: MobileProjectsPage
    },
    {
      path: '/create',
      name: 'MobileProjectsPageCreate',
      component: CreateMobileProjectPage
    },
    {
      path: '/edit/:projectID',
      name: 'EditMobileProjectPage',
      component: EditMobileProjectPage,
      props: true
    },
    {
      path: '/internaldocuments',
      name: 'InternalDocumentsDashBoard',
      component: InternalDocumentsDashBoard
    },
    {
      path: '/documents',
      name: 'DocumentsPage',
      component: DocumentsPage
    },
    {
      path: '/documentupload',
      name: 'CreateDocumentPage',
      component: CreateDocumentPage
    },
    {
      path: '/details/:id',
      name: 'MobileProjectDetails',
      component: MobileProjectDetails,
      props: true,
    },
    {
      path: '/details/:id/create',
      name: 'CreateMobileProjectSpec',
      component: CreateMobileProjectSpec,
      props: true,
    },
    {
      path: '/details/:id/edit/:specID',
      name: 'EditMobileProjectSpec',
      component: EditMobileProjectSpec,
      props: true,
    },
    {
      path: '/stat/:id/create',
      name: 'CreateMobileProjectsStatInfo',
      component: CreateMobileProjectsStatInfo,
      props: true,
    },
    {
      path: '/stat/:id/edit/:infoID',
      name: 'EditMobileProjectsStatInfo',
      component: EditMobileProjectsStatInfo,
      props: true,
    },
    {
      path: '/store/:id/create',
      name: 'CreateMobileProjectStore',
      component: CreateMobileProjectStore,
      props: true,
    },

  ],
  mode: 'history'
})
