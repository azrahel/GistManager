import { observable, computed, action, useStrict } from 'mobx';
import singleton from 'singleton'
import 'whatwg-fetch'

import GistsStore from './gistsStore'

useStrict(true)

class UserStore extends singleton {
  @observable username
  @observable password
  @observable token

  constructor() {
    super()

    this.username = ''
    this.password = ''
    this.token    = localStorage.getItem('ghtoken') || ''
  }

  fetchUserData(token) {
    this.setField('token', token)
    localStorage.setItem('ghtoken', token)

    GistsStore.reset()
    GistsStore.fetchUserGists()

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
      //TODO: set user data
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