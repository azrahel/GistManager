import GistsStore from 'stores/gistsStore'
import UserStore from 'stores/userStore'
import * as GistSaveModes from 'constants/GistSaveModes'
import * as Filters from 'constants/Filters'
import { getRequestConfig, fetchData } from 'helpers/request'

export const fetchURLs = {
  [Filters.ALL]: 'https://api.github.com/gists',
  [Filters.STARRED]: 'https://api.github.com/gists/starred'
}

export const saveRequestModes = {
  [GistSaveModes.ADD]: 'POST',
  [GistSaveModes.EDIT]: 'PATCH'
}

export function fetchUserGists() {
  const requestConfig = getRequestConfig(
    'GET',
    'token ' + UserStore.token
  )

  return fetchData(
    fetchURLs[GistsStore.filter],
    requestConfig,
    null,
    (gistsArray) => {
      GistsStore.setGists(gistsArray)

      fetchGist(gistsArray[0].id).then((gist) => {
        GistsStore.setActive(gist)
        GistsStore.toggleDetailsLoading()
      })
    }
  )
}

export function fetchGist(id) {
  const requestConfig = getRequestConfig(
    'GET',
    'token ' + UserStore.token
  )

  return fetchData(
    fetchURLs[Filters.ALL] + '/' + id,
    requestConfig,
    null,
    (gist) => {
      return gist
    }
  )
}

export function saveGist() {
  function getFetchURL() {
    let extension = GistsStore.gistSaveMode === GistSaveModes.EDIT
      ? '/' + GistsStore.editedGist.id
      : ''

    return fetchURLs[Filters.ALL] + extension
  }

  const requestConfig = getRequestConfig(
    saveRequestModes[GistsStore.gistSaveMode],
    'token ' + UserStore.token,
    JSON.stringify(
      GistsStore.editedGist.getPostable()
    )
  )

  return fetchData(
    getFetchURL(),
    requestConfig,
    (response) => {
      if(response.ok) {
        GistsStore.editedGist.reset()
        UIStore.dismissDialog()
      }

      return response.json()
    },
    (gist) => {
      if(GistsStore.gistSaveMode === GistSaveModes.EDIT) {
          GistsStore.replaceEditedGist(gist)
      } else {
        GistsStore.addGist(gist)
      }

      return gist
    }
  )
}

export function deleteGist(id) {
  GistsStore.deleteGistFromStore(id)

  const requestConfig = getRequestConfig(
    'DELETE',
    'token ' + UserStore.token
  )

  return fetchData(
    fetchURLs[Filters.ALL] + '/' + id,
    requestConfig,
    (response) => { return response }
  )
}