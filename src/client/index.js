import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import gistsStore from './stores/gistsStore'
import UIStore from './stores/UIStore'
import rootRoute from './routes/root'

const stores = { gistsStore, UIStore };

ReactDOM.render(
  <Provider { ...stores }>
    <Router history = { browserHistory } routes = { rootRoute(stores) }/>
  </Provider>,
  document.getElementById('root')
);

