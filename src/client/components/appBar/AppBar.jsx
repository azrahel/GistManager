import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { observer, inject } from 'mobx-react'
import FlatButton from 'material-ui/FlatButton';

import style from './style.scss'

export default @inject('userStore','authStore') @observer class AppBar extends Component {
  constructor(props) {
    super(props)
  }

  logout() {
    this.props.authStore.logout()
    browserHistory.push('/login')
  }

  render() {
    return (
      this.props.authStore.isLoggedIn 
        ? <div className = { style.appBar }>
            <span className = { style.appName }>
              Super Gist Manager
            </span>
            <FlatButton
              label = 'sign out'
              className = { style.logoutButton }
              onClick = { () => { this.logout() } }>
            </FlatButton>
            <div className = { style.accountLink }>
              <div className = { style.githubIcon }/>
              <span className = { style.username }>
                { this.props.userStore.username } 
              </span>
            </div>
          </div>
        : null
    )
  }
}

