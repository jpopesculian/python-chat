import React from 'react';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import Main from './Main';

import Home from './pages/Home';

import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';

import App from './pages/App';

let router = (
  <Router history={history}>
    <Route component={Main}>
      <Route path='/' component={Home} />
      <Route path='login' component={AuthLogin} />
      <Route path='register' component={AuthRegister} />
      <Route path='app' component={App}>
        {/* App Routes */}
      </Route>
    </Route>
  </Router>
);

export default router;
