import { observable, action, useStrict } from 'mobx'

useStrict(true)

class File {
  @observable filename
  @observable toBeDeleted
  @observable value
  @observable error
  fieldsKeys

  constructor(name, content) {
    this.oldName    = name || ''
    this.filename   = name || ''
    
    this.oldValue   = content || ''
    this.value      = content || ''

    this.toBeDeleted = false
    
    this.error      = ''
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