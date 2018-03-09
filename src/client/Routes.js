import React from 'react'

import UsersList, { loadData } from './components/UsersList'
import Home from './components/Home'

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },{
    loadData ,
    path: '/users',
    component: UsersList
  }
]