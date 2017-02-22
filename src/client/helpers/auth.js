import AuthStore from 'stores/authStore'
import UserStore from 'stores/userStore'

import { fetchUserData } from 'helpers/user'
import { getRequestConfig, fetchData } from 'helpers/request'

function handleGithubResponse(data) {  
  if (data.token) {
    AuthStore.setLoggedIn(true)
    localStorage.setItem('ghtoken', data.token)
    fetchUserData(data.token)
  } else if (data.message) {
    AuthStore.toggleLoggingState()
    AuthStore.setError(data.message)
  } else {
    AuthStore.setError('Something just went terribly wrong. Check the console for details.')
  }
}

export function login(username, password) {
  AuthStore.toggleLoggingState()

  const requestConfig = getRequestConfig(
    'POST',
    'Basic ' + btoa(username + ':' + password),
    JSON.stringify({
      note: Math.random(),
      scopes: ['gist']
    }) 
  )

  return fetchData(
    'https://api.github.com/authorizations',
    requestConfig,
    null,
    (data) => { return handleGithubResponse(data) }
  )
}

export function logout() {
  localStorage.removeItem('username')
  AuthStore.setLoggedIn(false)
}