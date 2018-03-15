import React from 'react'

import UsersListPage from './pages/UsersListPage'
import AdminsListPage from './pages/AdminsListPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import App from './App'

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true
      },{
        ...AdminsListPage,
        path: '/admins'
      },{
        ...UsersListPage,
        path: '/users'
      },{
        ...NotFoundPage
      }
    ]
  }
]
