import React from 'react'

import { Router, Route } from 'react-router'
import {createHistory} from 'history'
import LazyLoader from './services/lazy-loader'

let history = createHistory()
let lazyLoader = new LazyLoader('app/pages/')

let router = (
  <Router history={history}>
    <Route path='/' getComponents={lazyLoader.component('Home')} />
    <Route path='/register' getComponents={lazyLoader.component('auth/Register')} />
    <Route path='/login' getComponents={lazyLoader.component('auth/Login')} />
    <Route path='/app' getComponents={lazyLoader.component('App')} />
  </Router>
)

export default router
