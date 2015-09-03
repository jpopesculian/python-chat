import React from 'react';

import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/HashHistory';

import Main from './Main';
import EventQueue from './services/EventQueue'

let importQueue = new EventQueue()
let firstPageImported = false

function importLater(path) {
  if (firstPageImported) return System.import(path)
  return importQueue.add(System.import.bind(System, path))
}

function importAll() {
  firstPageImported = true
  importQueue.execute(System)
}

function page(path) {
  path = 'app/pages/' + path
  importLater(path)
  return (cb) => {
    System.import(path).then((component) => {
      cb(null, component.default)
      importAll()
    })
  }
}

let router = (
  <Router history={history}>
    <Route path='/' getComponents={page('Home')} />
  </Router>
);

export default router;
