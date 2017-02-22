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
    this.files.push(
      new File()
    )
  }

  @action removeFile(name, value) {
    let updatedFiles = []

    this.files.forEach((file, i) => {
      //files has no id. name and value fields identify it
      if(file.filename === name && file.value === value) {
        //https://developer.github.com/v3/gists/
        //Note: All files from the previous version of the gist are carried over by
        //default if not included in the object. Deletes can be performed by
        //including the filename with a null object.
        file.toBeDeleted = true
      }

      updatedFiles.push(file)
    })
    
    this.files = updatedFiles
  }

  @action reset() {
    this.description = ''
    this.files = []
    this.publiclyVisible = false
  }

  getPostable() {
    function getFilesToBePosted() {
      let gistFromGithub = this.id !== ''
      let files = {}

      if(gistFromGithub) {
        this.files.slice().forEach((file) => {
          let modified = file.value !== file.oldValue || file.oldName !== file.filename
          let toBeDeleted = file.toBeDeleted
          //https://developer.github.com/v3/gists/
          // Note: All files from the previous version of the gist are carried over 
          //by default if not included in the object. Deletes can be performed by 
          //including the filename with a null object.
          if(toBeDeleted) {
            files[file.oldName] = null
          } else if(modified) {
            files[file.oldName] = { filename: file.filename, content: file.value }
          }
        })
      } else {
        this.files.slice().forEach((file) => {
          if(!file.toBeDeleted)  {
            files[file.filename] = { content: file.value }  
          }
        })
      }

      return files
    }

    return {
      'description': this.description,
      'public': this.publiclyVisible,
      'files': getFilesToBePosted.bind(this)()
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