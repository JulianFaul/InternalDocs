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
import CreateMobileProjectDetailsPage from '../components/MobileProjectDetails/CreateMobileProjectDetailsPage'
import EditMobileProjectDetailsPage from '../components/MobileProjectDetails/EditMobileProjectDetailsPage'

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
      name: 'CreateMobileProjectDetailsPage',
      component: CreateMobileProjectDetailsPage,
      props: true,
    },
    {
      path: '/details/:id/edit',
      name: 'EditMobileProjectDetailsPage',
      component: EditMobileProjectDetailsPage,
      props: true,
    }

    
  ],
  mode: 'history'
})
