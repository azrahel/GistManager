import { observable, action, useStrict, autorun } from 'mobx'
import singleton from 'singleton'

import Gist from 'models/Gist'
import * as GistSaveModes from 'constants/GistSaveModes'

import { fetchUserGists } from 'helpers/gists'

useStrict(true)

class GistsStore extends singleton {
  @observable gists = []
  @observable filter = ''
  @observable editedGist
  @observable activeGist
  @observable isLoading
  @observable gistDetailsLoading
  @observable error

  gistSaveMode

  constructor() {
    super()

    this.gists = []
    this.filter = ''

    autorun(() => {
      if(this.filter !== '') {
        this.toggleGistsLoading()
        this.toggleDetailsLoading()

        fetchUserGists().then(() => {
          this.toggleGistsLoading()
        })
      }
    })
  }

  @action toggleGistsLoading() {
    this.isLoading = !this.isLoading;
  }

  @action toggleDetailsLoading() {
    this.gistDetailsLoading = !this.gistDetailsLoading
  }

  @action loadGists() {
    this.isLoading = true
    this.gistDetailsLoading = true
  }

  @action editGist(gist) {
    if(gist) {
      this.gistSaveMode = GistSaveModes.EDIT
    } else {
      this.gistSaveMode = GistSaveModes.ADD
    }
    
    this.editedGist = new Gist(gist)
  }

  @action setFilter(filter) {
    if(filter !== this.filter) {
      this.filter = filter  
    }
  }

  @action addGist(gist) {
    this.gists.push(gist)
  }

  @action setGists(gistsArray) {
    this.gists = gistsArray
  }

  @action reset() {
    this.gists = []
    this.editedGist = null
    this.isLoading = false
    this.gistDetailsLoading = false
  }

  @action setError(value) {
    this.error = value
  }

  @action setActive(gist) {
    this.activeGist = gist
  }

  replaceEditedGist(gist) {
    this.deleteGistFromStore(gist.id)
    this.addGist(gist)
    this.setActive(gist)
  }

  deleteGistFromStore(id) {
    let updatedGists = []

    this.gists.forEach((gist, i) => {
      if(gist.id !== id) {
        updatedGists.push(gist)
      }
    })
    
    this.setGists(updatedGists)
  }
}

export default GistsStore.get()