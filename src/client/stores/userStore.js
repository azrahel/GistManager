import { observable, computed, action, useStrict } from 'mobx';
import 'whatwg-fetch'

useStrict(true)

class UserStore {
  @observable username = ''
  @observable password = ''
  
  @action setField(name, value) {
    this[name] = value
  }
}

export default UserStore;