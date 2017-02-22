import { observable, action, useStrict } from 'mobx'
import singleton from 'singleton'

import 'whatwg-fetch'

useStrict(true)

class UserStore extends singleton {
  @observable password
  @observable username
  @observable token

  constructor() {
    super()

    this.password = ''
    this.username = localStorage.getItem('username')  || ''
    this.token    = localStorage.getItem('ghtoken')   || ''
  }
  
  @action setField(name, value) {
    this[name] = value
  }
}

export default UserStore.get()