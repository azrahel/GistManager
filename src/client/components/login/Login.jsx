import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router'

export default @inject('UIStore') @observer class Login extends Component {
  constructor(props) {
    super(props)

    this.store = this.props.UIStore
  }

  login() {
    this.store.login('usrename', 'password').then(() => {
      if(this.store.isLoggedIn) {
        browserHistory.push('/dashboard')
      }
    })
  }

  render() {
    return (
      <div>
        <div onClick = { () => { this.login() } }>
          !! LOGIN !!
          { 
            // INPUTS HERE
          }
          { this.store.error }
        </div>
      </div>
    );
  }
}




