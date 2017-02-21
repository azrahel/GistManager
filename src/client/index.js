import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import UIStore from './stores/UIStore'
import userStore from './stores/userStore'
import gistsStore from './stores/gistsStore'
import authStore from './stores/authStore'

import rootRoute from './routes/root'

const stores = { authStore, userStore, gistsStore, UIStore };

ReactDOM.render(
  <Provider { ...stores }>
    <Router history = { browserHistory } routes = { rootRoute(stores) }/>
  </Provider>,
  document.getElementById('root')
);

