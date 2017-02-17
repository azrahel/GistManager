import { observable, computed, action, extendObservable } from 'mobx';
import 'whatwg-fetch'

class UIStore {
  @observable username
  @observable password

  @observable isLogging = false
  @observable isLoggedIn = localStorage.getItem('ghtoken') ? true : false
  @observable error
  

  handleGithubResponse(response) {
    if(response.errors && localStorage.getItem('ghtoken')) {
      this.isLoggedIn = true;
    } else if (response.token){
      localStorage.setItem('ghtoken', response.token)
      this.isLoggedIn = true;
    } else if(response.message){
      this.error = response.message
    } else {
      this.error = 'Something just went terribly wrong. Check the console for details.'
    }
  }

  @action login(username, password) {
    const authObject = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password)
      },
      //Math.random so I can POST how many requests I like 
      //without getting 'already_exists' error from GH
      body: JSON.stringify({ note: Math.random() }) 
    }

    return fetch('https://api.github.com/authorizations', authObject).then((response) => {
      console.log(response)
      return response.json()
    }).then((json) => {
      console.log(json)
      return this.handleGithubResponse(json)
    }).catch((error) => {
      alert(error);
    })
  }

  @action logout() {
     localStorage.removeItem('ghtoken')
     this.isLoggedIn = false
  }

  @computed get loggedIn() {
    return this.isLoggedIn
  }
}

let singleton = new UIStore;
export default singleton;