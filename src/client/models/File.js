import { observable, action, useStrict } from 'mobx'

useStrict(true)

class File {
  @observable filename
  @observable value
  @observable error
  fieldsKeys

  constructor(name, content) {
    this.filename = name || ''
    this.value = content || ''
    this.error = ''
    this.fieldsKeys = {
      filename: 'filename',
      files: 'conent',
      error: ''
    }
  }

  @action updateName(value) {
    this.filename = value
  }

  @action updateContent(value) {
    this.value = value
  }

  @action valid() {
    this.error = ''

    if(this.filename === '' || this.content === '') {
      this.error = 'File needs name and content'
    }

    return this.error === ''
  }
}

export default File