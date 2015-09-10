import React from 'react'

import { Router, Route } from 'react-router'
import {createHistory} from 'history'
import LazyLoader from './services/lazy-loader'

let history = createHistory()
let ll = new LazyLoader('app/pages/')

let router = (
  <Router history={history}>
    <Route getComponents={ll.component('Home')}
      path='/'/>
    <Route getComponents={ll.component('auth/Register')}
      path='/register'/>
    <Route getComponents={ll.component('auth/Login')}
      path='/login'/>
    <Route getComponents={ll.component('App')}>
      <Route getComponents={ll.components({main: 'app/Room', sidebar: 'app/Sidebar'})}
        path='/messages'/>
    </Route>
  </Router>
)

export default router
