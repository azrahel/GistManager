import { observable, computed, action, useStrict } from 'mobx';
import singleton from 'singleton'
import 'whatwg-fetch'

useStrict(true)

class UIStore extends singleton {
  @observable dialog

  constructor() {
    super()
  }
  
  @action setField(name, value) {
    console.log(name)
    console.log(value)

    
    
    this[name] = value
  }
}

export default UIStore.get();