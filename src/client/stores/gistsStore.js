import { observable, action, useStrict } from 'mobx'
import Gist from '../models/Gist'

import UserStore from './userStore'

import singleton from 'singleton'

useStrict(true)

class GistsStore extends singleton {
  @observable gists = []
  @observable filter = ''
  @observable editedGist
  @observable isLoading

  constructor() {
    super()
    this.gists = []
    this.filter = 'all'

    this.loadGists()
  }

  @action loadGists() {
    this.isLoading = true
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
  }

  @action toggleLoading(state) {
    this.isLoading = state
  }

  fetchUserGists() {
    this.reset()
    this.toggleLoading()

    const authObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'token ' + UserStore.token
      }
    }

    fetch('https://api.github.com/gists', authObject).then((response) => {
      return response.json()
    }).then((gistsArray) => {
      this.setGists(gistsArray)
      console.log('gistsArray')
      console.log(gistsArray)
      this.toggleLoading()
    }).catch((error) => {
      alert(error)
    })
  }
}

export default GistsStore.get()