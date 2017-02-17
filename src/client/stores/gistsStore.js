import { observable } from 'mobx';


class GistsStore {
  @observable gists = [];
  @observable editedGist;
  @observable isLoading = true;

  constructor() {
    this.gists = [{ testGist: 1 }];

    this.loadGists();
  }

  loadGists() {
    this.isLoading = true;
  }
}

export default new GistsStore();