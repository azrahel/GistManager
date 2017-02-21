import { observable, action, useStrict } from 'mobx'

useStrict(true)

class File {
  id
  @observable name
  @observable content
  @observable error
  fieldsKeys

  constructor(id) {
    this.id = id
    this.name = ''
    this.content = ''
    this.error = ''
    this.fieldsKeys = {
      name: 'name',
      files: 'conent',
      error: ''
    }
  }

  @action updateName(value) {
    this.name = value
  }

  @action updateContent(value) {
    this.content = value
  }

  @action valid() {
    this.error = ''

    if(this.name === '' || this.content === '') {
      this.error = 'File needs name and content'
    }

    return this.error === ''
  }
}

export default File