import { observable, computed, action, useStrict } from 'mobx'
import 'whatwg-fetch'

useStrict(true)

class AuthStore {
  @observable isLogging = false
  @observable isLoggedIn = localStorage.getItem('ghtoken') ? true : false
  @observable error = ''

  handleGithubResponse(response) {
    if (response.errors && localStorage.getItem('ghtoken')) {
      this.setLoggedIn(true)
    } else if (response.token) {
      this.setLoggedIn(true, response.token)
      
      setTimeout(
        this.toggleLoggingState(),
        500
      )
    } else if (response.message) {
      this.toggleLoggingState()
      this.setError(response.message)
    } else {
      this.setError('Something just went terribly wrong. Check the console for details.')
    }
  }

  login(username, password) {
    this.toggleLoggingState()

    const authObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      //Math.random so I can POST how many requests I like 
      //without getting 'already_exists' error from GH
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

  @action logout() {
     this.setLoggedIn(false)
  }

  @action toggleLoggingState() {
    this.isLogging = !this.isLogging
  }

  @action setLoggedIn(state, token) {
    if(state) {
      this.isLoggedIn = state
      
      if(token) {
        localStorage.setItem('ghtoken', token)  
      }
    } else {
      this.isLoggedIn = state
      localStorage.removeItem('ghtoken')
    }
  }

  @action setError(message) {
    this.error = message
  }
}

export default AuthStore