import { observable, computed, action, useStrict } from 'mobx'
import 'whatwg-fetch'
import GistsStore from './gistsStore'
import UserStore from './userStore'
import singleton from 'singleton'

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

  handleGithubResponse(response) {  
    if (response.token) {
      this.setLoggedIn(true)
      UserStore.fetchUserData(response.token)
    } else if (response.message) {
      this.toggleLoggingState()
      this.setError(response.message)
    } else {
      this.setError('Something just went terribly wrong. Check the console for details.')
    }
  }

  login(username, password) {
    this.toggleLoggingState()
    localStorage.setItem('username', username)

    const authObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      body: JSON.stringify({ note: Math.random() }) 
    }

    return fetch('https://api.github.com/authorizations', authObject).then((response) => {
      return response.json()
    }).then((json) => {
      return this.handleGithubResponse(json)
    }).catch((error) => {
      alert(error)
    })
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
      localStorage.removeItem('ghtoken')
    }

    this.isLoggedIn = state
  }

  @action setError(message) {
    this.error = message
  }
}

export default AuthStore.get()