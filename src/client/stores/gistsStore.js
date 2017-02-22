import { observable, action, useStrict, autorun } from 'mobx'
import Gist from 'models/Gist'
import * as Filters from 'constants/Filters'
import * as GistSaveModes from 'constants/GistSaveModes'

import UserStore  from './userStore'
import UIStore    from './UIStore'

import singleton from 'singleton'

useStrict(true)

class GistsStore extends singleton {
  @observable gists = []
  @observable filter = ''
  @observable editedGist
  @observable activeGist
  @observable isLoading
  @observable gistDetailsLoading
  @observable error

  fetchURLs
  gistSaveMode
  saveRequestModes

  constructor() {
    super()

    this.gists = []
    this.filter = ''

    this.fetchURLs = {
      [Filters.ALL]: 'https://api.github.com/gists',
      [Filters.STARRED]: 'https://api.github.com/gists/starred'
    }

    this.saveRequestModes = {
      [GistSaveModes.ADD]: 'POST',
      [GistSaveModes.EDIT]: 'PATCH'
    }

    autorun(() => {
      if(this.filter !== '') {
        this.toggleGistsLoading()
        this.toggleDetailsLoading()

        this.fetchUserGists().then(() => {
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

  fetchUserGists() {
    const authObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + UserStore.token
      }
    }

    return fetch(this.fetchURLs[this.filter], authObject).then((response) => {
      return response.json()
    }).then((gistsArray) => {
      this.setGists(gistsArray)

      this.fetchGist(gistsArray[0].id).then((gist) => {
        this.setActive(gist)
        this.toggleDetailsLoading()
      });
      
    }).catch((error) => {
      alert(error)
    })
  }

  fetchGist(id) {
    const authObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + UserStore.token
      }
    }

    return fetch(this.fetchURLs[Filters.ALL] + '/' + id, authObject).then((response) => {
      return response.json()
    }).then((gist) => {
      return gist
    }).catch((error) => {
      alert(error)
    })
  }

  replaceEditedGist(gist) {
    this.deleteGistFromStore(gist.id)
    this.addGist(gist)
    this.setActive(gist)
  }

  saveGist() {
    function getFetchURL() {
      let extension = this.gistSaveMode === GistSaveModes.EDIT
        ? '/' + this.editedGist.id
        : ''

      return this.fetchURLs[Filters.ALL] + extension
    }

    const postObject = {
      method: this.saveRequestModes[this.gistSaveMode],
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + UserStore.token
      },
      body: JSON.stringify(
        this.editedGist.getPostable()
      )
    }

    return fetch(getFetchURL.bind(this)(), postObject).then((response) => {
      if(response.ok) {
        this.editedGist.reset()
        UIStore.dismissDialog()
      }

      return response.json()
    }).then((gist) => {
      if(this.gistSaveMode === GistSaveModes.EDIT) {
          this.replaceEditedGist(gist)
      } else {
        this.addGist(gist)
      }

      return gist
    }).catch((error) => {
      alert(error)
    })
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

  deleteGist(id) {
    this.deleteGistFromStore.bind(this)(id)

    const authObject = {
      method: 'DELETE',
      headers: {
        Authorization: 'token ' + UserStore.token
      }
    }

    return fetch(this.fetchURLs[Filters.ALL] + '/' + id, authObject).then((response) => {
      return response
    }).catch((error) => {
      alert(error)
    })
  }
}

export default GistsStore.get()