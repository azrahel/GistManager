import { observable, action, useStrict } from 'mobx'
import 'whatwg-fetch'
import singleton from 'singleton'

import { fetchUserData } from 'helpers/user'
import UserStore from './userStore'

useStrict(true)

class AuthStore extends singleton {
  @observable isLogging = false
  @observable isLoggedIn = false
  @observable error = ''

  constructor() {
    super()
    
    let token = UserStore.token;

    this.setLoggedIn(token ? true : false)

    if(token) {
      fetchUserData(token)
    }
  }

  @action toggleLoggingState() {
    this.isLogging = !this.isLogging
  }

  @action setLoggedIn(state) {
    if(state) {
      setTimeout(
        this.toggleLoggingState,
        500
      )
    } else {
      this.isLogging = false;
      localStorage.removeItem('ghtoken')
    }

    this.isLoggedIn = state
  }

  @action setError(message) {
    this.error = message
  }
}

export default AuthStore.get()