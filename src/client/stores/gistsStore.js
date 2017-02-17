import { observable, action, useStrict } from 'mobx'

useStrict(true)

class GistsStore {
  @observable gists = []
  @observable editedGist
  @observable isLoading = true

  constructor() {
    this.gists = [{ testGist: 1 }]

    this.loadGists()
  }

  @action loadGists() {
    this.isLoading = true
  }
}

export default GistsStore