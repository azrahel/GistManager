import { observable, action, useStrict, autorun } from 'mobx'

import { getRequestConfig, fetchData } from 'helpers/request'
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

  fetchUserGists() {
    const authObject = getRequestConfig(
      'GET',
      'token ' + UserStore.token
    )

    return fetchData(
      this.fetchURLs[this.filter],
      authObject,
      null,
      (gistsArray) => {
        this.setGists(gistsArray)

        this.fetchGist(gistsArray[0].id).then((gist) => {
          this.setActive(gist)
          this.toggleDetailsLoading()
        });
      }
    )
  }

  fetchGist(id) {
    const authObject = getRequestConfig(
      'GET',
      'token ' + UserStore.token
    )

    return fetchData(
      this.fetchURLs[Filters.ALL] + '/' + id,
      authObject,
      null,
      (gist) => {
        return gist
      }
    )
  }

  saveGist() {
    function getFetchURL() {
      let extension = this.gistSaveMode === GistSaveModes.EDIT
        ? '/' + this.editedGist.id
        : ''

      return this.fetchURLs[Filters.ALL] + extension
    }

    const authObject = getRequestConfig(
      this.saveRequestModes[this.gistSaveMode],
      'token ' + UserStore.token,
      JSON.stringify(
        this.editedGist.getPostable()
      )
    )

    return fetchData(
      getFetchURL.bind(this)(),
      authObject,
      (response) => {
        if(response.ok) {
          this.editedGist.reset()
          UIStore.dismissDialog()
        }

        return response.json()
      },
      (gist) => {
        if(this.gistSaveMode === GistSaveModes.EDIT) {
            this.replaceEditedGist(gist)
        } else {
          this.addGist(gist)
        }

        return gist
      }
    )
  }

  deleteGist(id) {
    this.deleteGistFromStore.bind(this)(id)

    const authObject = getRequestConfig(
      'DELETE',
      'token ' + UserStore.token
    )

    return fetchData(
      this.fetchURLs[Filters.ALL] + '/' + id,
      authObject,
      (response) => { return response }
    )
  }
}

export default GistsStore.get()