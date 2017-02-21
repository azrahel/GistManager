import { observable, action, useStrict } from 'mobx'
import File from './File'

useStrict(true)

class Gist {
  @observable name
  @observable description
  @observable files
  @observable publiclyVisible
  fieldsKeys

  constructor(gist) {
    this.name = ''
    this.description = ''
    this.files = [new File(0)]
    this.publiclyVisible = false

    this.fieldsKeys = {
      description: 'description',
      name: 'name',
      files: 'files',
      publiclyVisible: 'publiclyVisible'
    }
  }

  @action updateField(name, value) {
    this[name] = value
  }

  @action addFile() {
    let maxId = 0

    this.files.forEach(file => {
      if(file.id > maxId) {
        maxId = file.id
      }
    })

    this.files.push(
      new File(maxId + 1)
    )
  }

  @action removeFile(id) {
    let updatedFiles = []

    this.files.forEach((file, i) => {
      if(file.id !== id) {
        updatedFiles.push(file)
      }
    })
    
    this.files = updatedFiles
    //TODO: remove on server
  }

  @action reset() {
    this.name = ''
    this.description = ''
    this.files = []
    this.publiclyVisible = false

  }
}

export default Gist