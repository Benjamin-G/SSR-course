import React from 'react'
import { Route } from 'react-router-dom'

import UsersList from './components/UsersList'
import Home from './components/Home'

export default () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={UsersList} />
    </div>
  )
}