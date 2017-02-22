import UserStore from 'stores/userStore'
import { getRequestConfig, fetchData } from 'helpers/request'

export function fetchUserData(token) {
  UserStore.setField('token', token)
  
  const requestConfig = getRequestConfig(
    'GET',
    'token ' + token
  )

  return fetchData(
    'https://api.github.com/users/' + UserStore.username,
    requestConfig,
    (userData) => {
      localStorage.setItem('username', userData.login)
      UserStore.setField('username', userData.login)
      
      return userData
    },
    (response) => {
      return response.json()
    }
  )
}