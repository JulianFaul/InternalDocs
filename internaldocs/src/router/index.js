import Vue from 'vue'
import Router from 'vue-router'
import AuthGaurd from './auth-gaurd'
import HomePage from '../components/HomePage'
import SettingsPage from '../components/Settings/SettingsPage'
import UsersPage from '../components/Settings/Users/UsersPage'
import LoginPage from '../components/LoginPage/LoginPage'

import AdminPage from '../components/Admin/AdminPage'
import TaskTracker from '../components/TaskTracker/TaskTracker'
import MobileProjectsPage from '../components/MobileProjects/MobileProjectsPage'
import CreateMobileProjectPage from '../components/MobileProjects/CreateMobileProjectPage'
import EditMobileProjectPage from '../components/MobileProjects/EditMobileProjectPage'

import InternalDocumentsDashBoard from '../components/InternalDocuments/InternalDocumentsDashBoard'
import DocumentsPage from '../components/InternalDocuments/DocumentsPage'
import CreateDocumentPage from '../components/InternalDocuments/CreateDocumentPage'

import MobileProjectDetails from '../components/MobileProjectDetails/MobileProjectDetailsPage'

import ViewMobileProjectNote from '../components/MobileProjectDetails/MobileProjectMeetingNotes/ViewMobileProjectNote'

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/admin',
      name: 'AdminPage',
      component: AdminPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/users',
      name: 'UsersPage',
      component: UsersPage,
      beforeEnter: AuthGaurd
      
    },
    {
      path: '/tasktracker',
      name: 'task',
      component: TaskTracker,
      beforeEnter: AuthGaurd
    },
    {
      path: '/mobileprojects',
      name: 'MobileProjectsPage',
      component: MobileProjectsPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/create',
      name: 'MobileProjectsPageCreate',
      component: CreateMobileProjectPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/edit/:projectID',
      name: 'EditMobileProjectPage',
      component: EditMobileProjectPage,
      props: true,
      beforeEnter: AuthGaurd
    },
    {
      path: '/internaldocuments',
      name: 'InternalDocumentsDashBoard',
      component: InternalDocumentsDashBoard,
      beforeEnter: AuthGaurd
    },
    {
      path: '/documents',
      name: 'DocumentsPage',
      component: DocumentsPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/documentupload',
      name: 'CreateDocumentPage',
      component: CreateDocumentPage,
      beforeEnter: AuthGaurd
    },
    {
      path: '/details/:id',
      name: 'MobileProjectDetails',
      component: MobileProjectDetails,
      props: true,
      beforeEnter: AuthGaurd
    },
    {
      path: '/details/:id/meeting/:meetingID',
      name: 'ViewMobileProjectNote',
      component: ViewMobileProjectNote,
      props: true,
      beforeEnter: AuthGaurd
    },
   

    

    

  ],
  mode: 'history'
})
