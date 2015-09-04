import React from 'react'

import { Router, Route } from 'react-router'
import LazyLoader from './services/LazyLoader'

let lazyLoader = new LazyLoader('app/pages/')

let router = (
  <Router>
    <Route path='/' getComponents={lazyLoader.component('Home')} />
    <Route path='/register' getComponents={lazyLoader.component('auth/Register')} />
  </Router>
);

export default router;
