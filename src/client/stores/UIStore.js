import { observable, action, useStrict } from 'mobx'
import singleton from 'singleton'
import 'whatwg-fetch'

useStrict(true)

class UIStore extends singleton {
  @observable dialog
  @observable dialogLoading

  constructor() {
    super()

    this.dialogLoading = false
  }

  @action dismissDialog() {
    this.dialog = null
  }
  
  @action setField(name, value) {
    this[name] = value
  }

  @action reset() {
    this.dialog = null
    this.dialogLoading = false
  }
}

export default UIStore.get();