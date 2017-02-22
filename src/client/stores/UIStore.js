import { observable, action, useStrict } from 'mobx';
import singleton from 'singleton'
import 'whatwg-fetch'

useStrict(true)

class UIStore extends singleton {
  @observable dialog

  constructor() {
    super()
  }
  
  @action setField(name, value) {
    this[name] = value
  }
}

export default UIStore.get();