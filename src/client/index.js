import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import GistsStore from './stores/gistsStore'
import UIStore from './stores/UIStore'
import AuthStore from './stores/authStore'
import UserStore from './stores/userStore'
import rootRoute from './routes/root'

const authStore   = new AuthStore();
const userStore   = new UserStore();
const gistsStore  = new GistsStore();

const stores = { authStore, userStore, gistsStore, UIStore };

ReactDOM.render(
  <Provider { ...stores }>
    <Router history = { browserHistory } routes = { rootRoute(stores) }/>
  </Provider>,
  document.getElementById('root')
);

