import { observable, action, useStrict, autorun } from 'mobx'
import Gist from 'models/Gist'
import * as Filters from 'constants/Filters'

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

  constructor() {
    super()

    this.gists = []
    this.filter = ''

    this.fetchURLs = {
      [Filters.ALL]: 'https://api.github.com/gists',
      [Filters.STARRED]: 'https://api.github.com/gists/starred',
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

  @action loadGists() {
    this.isLoading = true
    this.gistDetailsLoading = true
  }

  @action editGist(gist = new Gist()) {
    this.editedGist = gist
  }

  @action setFilter(filter) {
    if(filter !== this.filter) {
      this.filter = filter  
    }
  }

  @action saveGist() {
    let files = {}

    this.editedGist.files.slice().forEach((file) => {
      //only text files support implemented, hence .txt extension 
      files[file.name + '.txt'] = { content: file.content }
    })

    let postableGist = {
      'description': this.editedGist.description,
      'public': this.editedGist.publiclyVisible,
      'files': files
    }

    const postObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + UserStore.token
      },
      body: JSON.stringify(postableGist)
    }

    fetch(this.fetchURLs[Filters.ALL], postObject).then((response) => {
      if(response.ok) {
        this.editedGist.reset()
        UIStore.setField('dialog', null)
      }

      return response.json()
    }).then((gist) => {
      if(gist.id) {
        this.addGist(gist)
      }

      return gist
    }).catch((error) => {
      alert(error)
    })
  }

  @action addGist(gist) {
    this.gists.push(gist)
  }

  @action removeGist(id) {
    //TODO: remove on server
    let updatedGists = []

    this.gists.forEach(gist => {
      if(gist.id !== id) {
        updatedGists.push(gist)
      }
    })
    
    this.setGists(updatedGists)
  }

  @action removeFile(id) {
    
    //TODO: remove on server
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

  @action toggleGistsLoading() {
    this.isLoading = !this.isLoading;
  }

  @action toggleDetailsLoading() {
    this.gistDetailsLoading = !this.gistDetailsLoading
  }

  @action setError(value) {
    this.error = value
  }

  @action setActive(gist) {
    this.activeGist = gist
  }

  fetchUserGists() {
    // this.reset()

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
}

export default GistsStore.get()