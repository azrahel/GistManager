import { observable, action, useStrict, toJS } from 'mobx'
import File from './File'

useStrict(true)

class Gist {
  @observable description
  @observable files
  @observable publiclyVisible
  id
  fieldsKeys

  constructor(gist) {
    this.id               = gist ? gist.id : ''
    this.description      = gist ? gist.description : ''
    this.files            = gist ? this.transformGistFilesForModel(gist.files) : [new File()]
    this.publiclyVisible  = gist ? gist.public : false

    this.fieldsKeys = {
      description: 'description',
      files: 'files',
      publiclyVisible: 'publiclyVisible'
    }
  }

  @action updateField(name, value) {
    this[name] = value
  }

  @action addFile() {
    let maxId = 0

    this.files.push(
      new File()
    )
  }

  @action removeFile(name, value) {
    let updatedFiles = []

    this.files.forEach((file, i) => {
      if(file.filename !== name && file.value !== value) {
        updatedFiles.push(file)
      }
    })
    
    this.files = updatedFiles
  }

  @action reset() {
    this.description = ''
    this.files = []
    this.publiclyVisible = false
  }

  getPostable() {
    let files = {}

    this.files.slice().forEach((file) => {
      //only text files support implemented, hence .txt extension 
      files[file.filename + '.txt'] = { content: file.value }
    })

    return {
      'description': this.description,
      'public': this.publiclyVisible,
      'files': files
    }
  }

  transformGistFilesForModel(files) {
    let filesArray = []
    files = toJS(files)

    for(var key in files) {
      filesArray.push(new File(key, files[key].content))
    }

    return filesArray
  }
}

export default Gist