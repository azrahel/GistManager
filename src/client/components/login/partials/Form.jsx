import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

import style from '../style.scss'

import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export default @inject('authStore', 'userStore') @observer class LoginForm extends Component {
  constructor(props) {
    super(props)
  }

  login() {
    this.props.authStore.login(
      this.props.userStore.username,
      this.props.userStore.password
    ).then(() => {
      if(this.props.authStore.isLoggedIn) {
        browserHistory.push('/dashboard')
      }
    })
  }

  onInputChange(name, value) {
    this.props.userStore.setField(name, value)
  }

  render() {
    return (
      <div>
        <div className = { style.githubIcon }/>
        <div>Please provide your Github data</div>
        <TextField
          className = { style.loginInput }
          value     = { this.props.userStore.username }
          hintText  = 'username'
          onChange  = { (e, value) => { this.onInputChange('username', value) } }
        />
        <TextField
          className = { style.passwordInput }
          value     = { this.props.userStore.password }
          hintText  = 'password'
          type      = 'password'
          onChange  = { (e, value) => { this.onInputChange('password', value) } }
        />
        <FlatButton
          label     = 'SIGN IN'
          className = { style.loginButton }
          onClick   = { () => this.login() }
        />
      </div>
    )
  }
}





