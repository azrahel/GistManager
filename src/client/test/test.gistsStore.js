import fetchMock          from 'fetch-mock'
import GistsStore         from 'stores/gistsStore'
import { assert, expect } from 'chai'
import * as GistSaveModes from 'constants/GistSaveModes'
import Gist               from 'models/Gist'

import {fetchURLs} from 'helpers/gists'
import * as Filters from 'constants/Filters'

console.log('fetchURLs')
console.log(fetchURLs)

console.log('Filters')
console.log(Filters)

console.log('fetchURLs[Filters.ALL]')
console.log(fetchURLs[Filters.ALL])

fetchMock.get('*', {})
fetchMock.post('*', {})

describe('- GistsStore ', () => {
  describe('default values:', () => {
    it('default gists value is empty array', () => {
      GistsStore.reset()
      expect(typeof GistsStore.gists).to.equal('object')
      expect(GistsStore.gists).to.be.empty
      expect(GistsStore.gists.slice().length).to.equal(0)
      expect(GistsStore.gists.slice()).to.be.empty
    })
    it('default filter value is empty string', () => {
      GistsStore.reset()
      assert.equal(GistsStore.filter, '')
    })
    it('default editedGist value is undefined', () => {
      GistsStore.reset()
      assert.equal(GistsStore.editedGist, null)
    })
    it('default activeGist value is null', () => {
      GistsStore.reset()
      assert.equal(GistsStore.activeGist, null)
    })
    it('default isLoading value is falsy', () => {
      GistsStore.reset()
      assert.equal(Boolean(GistsStore.isLoading), false)
    })
    it('default gistDetailsLoading value is falsy', () => {
      GistsStore.reset()
      assert.equal(Boolean(GistsStore.gistDetailsLoading), false)
    })
    it('default error value is empty string', () => {
      GistsStore.reset()
      assert.equal(GistsStore.error, '')
    })
    it('default gistSaveMode value is null', () => {
      GistsStore.reset()
      assert.equal(GistsStore.gistSaveMode, null)
    })
  })

  describe('methods:', () => {
    it('toggleGistsLoading toggles isLoading value', () => {
      GistsStore.reset()
      assert.equal(GistsStore.isLoading, false)
      GistsStore.toggleGistsLoading()
      assert.equal(GistsStore.isLoading, true)
    })

    it('toggleDetailsLoading toggles gistDetailsLoading value', () => {
      GistsStore.reset()
      assert.equal(GistsStore.gistDetailsLoading, false)
      GistsStore.toggleDetailsLoading()
      assert.equal(GistsStore.gistDetailsLoading, true)
    })

    it('loadGists changes isLoading and gistDetailsLoading values to true', () => {
      GistsStore.reset()
      assert.equal(GistsStore.gistDetailsLoading, false)
      assert.equal(GistsStore.isLoading, false)
      GistsStore.loadGists()
      assert.equal(GistsStore.gistDetailsLoading, true)
      assert.equal(GistsStore.isLoading, true)
    })

    it('editGist sets gistSaveMode to GistSaveModes.ADD when passed no value', () => {
      GistsStore.reset()
      assert.equal(GistsStore.gistSaveMode, null)
      GistsStore.editGist()
      assert.equal(GistsStore.gistSaveMode, GistSaveModes.ADD)
    })

    it('editGist sets gistSaveMode to GistSaveModes.EDIT when passed ' + 
      'raw Gist object and initializes editedGist with it', () => {
      
      let rawGist = {
        id: '1',
        description: 'something',
        files: [{1: 'a'}, {2: 'b'}],
        public: false
      }

      let newGist = new Gist(rawGist)

      GistsStore.reset()
      assert.equal(GistsStore.gistSaveMode, null)
      GistsStore.editGist(rawGist)
      assert.equal(GistsStore.gistSaveMode, GistSaveModes.EDIT)
      expect(GistsStore.editedGist).to.deep.equal(newGist)
    })

    //AUTORUN FIRING - NOT SO FAST
    it('setFilter sets filter value to provided', () => {
      GistsStore.reset()
      let newFilter = 'newFilter'

      assert.equal(GistsStore.filter, '')
      GistsStore.setFilter(newFilter)
      assert.equal(GistsStore.filter, newFilter)
    })

    it('addGist adds provided gist to gists array', () => {
      GistsStore.reset()
      let newGist = new Gist()

      expect(GistsStore.gists.slice()).to.be.empty
      GistsStore.addGist(newGist)
      expect(GistsStore.gists.slice().length).to.equal(1)
      expect(GistsStore.gists.slice()[0]).to.equal(newGist)
    })

    it('setGists sets provided gists to gists array', () => {
      GistsStore.reset()
      let gistsArray = [new Gist(), new Gist(), new Gist()]

      expect(GistsStore.gists.slice()).to.be.empty
      GistsStore.setGists(gistsArray)
      expect(GistsStore.gists.slice().length).to.equal(3)
    })

    it('setError sets error value to provided', () => {
      GistsStore.reset()
      let error = 'just an error'

      expect(GistsStore.gists.slice()).to.be.empty
      GistsStore.setError(error)
      expect(GistsStore.error).to.equal(error)
    })

    it('setActive sets activeGist to the one passed', () => {
      GistsStore.reset()
      let nextActive = new Gist()

      assert.equal(GistsStore.activeGist, null)
      GistsStore.setActive(nextActive)
      expect(GistsStore.activeGist).to.deep.equal(nextActive)
    })

    it('replaceEditedGist replaces active gist that already is in store with the one passed (with same id)', () => {
      GistsStore.reset()

      let primaryDescription = 'something'
      let primaryVisibility = false

      let rawGist = {
        id: '1',
        description: primaryDescription,
        files: [{1: 'a'}, {2: 'b'}],
        public: primaryVisibility
      }
      
      let updatedDescription = 'another something'
      let updatedVisibility = true

      let gistToBeEdited = new Gist(rawGist)

      expect(GistsStore.gists.slice()).to.be.empty
      
      GistsStore.addGist(gistToBeEdited)
      
      expect(GistsStore.gists.slice().length).to.equal(1)
      expect(GistsStore.gists.slice()[0]).to.deep.equal(gistToBeEdited)
      expect(GistsStore.gists.slice()[0].description).to.equal(primaryDescription)
      expect(GistsStore.gists.slice()[0].publiclyVisible).to.equal(primaryVisibility)

      gistToBeEdited.description = updatedDescription
      gistToBeEdited.publiclyVisible = updatedVisibility

      GistsStore.replaceEditedGist(gistToBeEdited)

      expect(GistsStore.gists.slice()[0]).to.deep.equal(gistToBeEdited)
      expect(GistsStore.gists.slice()[0].description).to.equal(updatedDescription)
      expect(GistsStore.gists.slice()[0].publiclyVisible).to.equal(updatedVisibility)

      expect(GistsStore.activeGist).to.deep.equal(gistToBeEdited)
    })

    it('deleteGistFromStore should remove gist with id that machtes passed one', () => {
      GistsStore.reset()

      let description = 'something'
      let visibility = false

      let rawGist = {
        id: '1',
        description: description,
        files: [{1: 'a'}, {2: 'b'}],
        public: visibility
      }

      let gistToBeEdited = new Gist(rawGist)

      expect(GistsStore.gists.slice()).to.be.empty
      GistsStore.addGist(gistToBeEdited)
      expect(GistsStore.gists.slice().length).to.equal(1)
      GistsStore.deleteGistFromStore(gistToBeEdited.id)
      expect(GistsStore.gists.slice().length).to.equal(0)
    })
  })
})
