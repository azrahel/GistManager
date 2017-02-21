import { observable, computed, action, useStrict } from 'mobx';
import singleton from 'singleton'
import 'whatwg-fetch'

import GistsStore from './gistsStore'

useStrict(true)

class UserStore extends singleton {
  @observable username
  @observable token

  constructor() {
    super()

    this.username = localStorage.getItem('username') || ''
    this.token    = localStorage.getItem('ghtoken') || ''
  }

  fetchUserData(token) {
    this.setField('token', token)
    
    const authObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + token
      }
    }

    fetch('https://api.github.com/users/' + this.username, authObject).then((response) => {
      return response.json()
    }).then((userData) => {
      localStorage.setItem('username', userData.login)
      this.setField('username', userData.login)
      return userData
    }).catch((error) => {
      alert(error)
    })
  }
  
  @action setField(name, value) {
    this[name] = value
  }
}

export default UserStore.get();