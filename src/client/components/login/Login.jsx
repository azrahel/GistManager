import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

import style from './style.scss'
import CircularProgress from 'material-ui/CircularProgress'
import Snackbar from 'material-ui/Snackbar'
import LoginForm from './form/Form'

export default @inject('authStore') @observer class Login extends Component {
  render() {
    return (
      <div className = { style.loginBoxContainer }>
        {
          this.props.authStore.isLogging
            ? <CircularProgress/>
            : <LoginForm />
        }
        <Snackbar
          open              = { this.props.authStore.error.length > 0 }
          message           = { this.props.authStore.error }
          autoHideDuration  = { 4000 }
          onRequestClose    = { () => { this.props.authStore.setError('') } }
        />
      </div>
    )
  }
}




