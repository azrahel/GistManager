import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'

import AppBar from 'material-ui/AppBar'

import style from './style.scss'

export default @inject('authStore') @observer class AppBar extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.authStore.logout()
    browserHistory.push('/login')
  }

  render() {
    // console.log(mobx.toJS(this.props.stores.gistsStore.gists))
    return (
        <div type = 'horizontal'>
          {
            this.props.authStore.isLoggedIn
              ? <div onClick = { () => { this.logout() } }>logout</div>
              : null
          }
        </div>
    )
  }
}

