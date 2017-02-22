import { observable, action, useStrict } from 'mobx'
import 'whatwg-fetch'
import singleton from 'singleton'
import { getRequestConfig, fetchData } from 'helpers/request'
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
      UserStore.fetchUserData(token)
    }
  }

  handleGithubResponse(data) {  
    if (data.token) {
      this.setLoggedIn(true)
      localStorage.setItem('ghtoken', data.token)
      UserStore.fetchUserData(data.token)
    } else if (data.message) {
      this.toggleLoggingState()
      this.setError(data.message)
    } else {
      this.setError('Something just went terribly wrong. Check the console for details.')
    }
  }
  
  login(username, password) {
    this.toggleLoggingState()

    const authObject = getRequestConfig(
      'POST',
      'Basic ' + btoa(username + ':' + password),
      JSON.stringify({
        note: Math.random(),
        scopes: ['gist']
      }) 
    )

    return fetchData(
      'https://api.github.com/authorizations',
      authObject,
      null,
      (data) => { return this.handleGithubResponse(data) }
    )
  }

  logout() {

    localStorage.removeItem('username')
    this.setLoggedIn(false)
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