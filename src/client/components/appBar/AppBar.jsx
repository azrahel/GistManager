import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import mobx from 'mobx';
import { observer, inject } from 'mobx-react';

import style from './style.scss';

export default @inject('UIStore') @observer class AppBar extends Component {
  constructor(props) {
    super(props)

    this.store = this.props.UIStore
  }

  logout() {
    this.store.logout()
    browserHistory.push('/login')
  }

  render() {
    // console.log(mobx.toJS(this.props.stores.gistsStore.gists))

    return (
      <div className = { style.appBar }>
        <div type = 'horizontal'>
          {
            this.store.loggedIn
              ? <div onClick = { () => { this.logout() } }>logout</div>
              : null
          }
        </div>
      </div>
    )
  }
}

