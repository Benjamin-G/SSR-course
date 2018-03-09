import React from 'react'

import UsersList from './components/UsersList'
import Home from './components/Home'

export default () => [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/users',
    component: UsersList
  }
]