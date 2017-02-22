import 'whatwg-fetch'

export function getRequestConfig(method, authString, body) {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: authString
    },
    body
  }
}

export function fetchData(url, authObject, firstCallback, secondCallback) {
  if(!firstCallback) {
    firstCallback = (response) => {
      return response.json()
    }
  } 
  if(!secondCallback) {
    secondCallback = (data) => {
      return data
    }
  }

  return fetch(url, authObject).then((response) => {
    return firstCallback(response)
  }).then((data) =>{
    return secondCallback(data)
  }).catch((error) => {
    alert(error)
  })
}