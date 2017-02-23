import AuthStore from '../stores/authStore'
import { assert } from 'chai'

describe('- AuthStore', () => {
  describe('default values:', () => {
    it('default isLogging value is false', () => {
      AuthStore.reset()
      assert.equal(AuthStore.isLogging, false)
    })
    it('default error value is empty string', () => {
      AuthStore.reset()
      assert.equal(AuthStore.error, '')
    })
    it('default isLoggedIn value is false', () => {
      AuthStore.reset()
      assert.equal(AuthStore.isLoggedIn, false)
    })
  })

  describe('methods:', () => {
    it('toggleLoggingState toggles isLogging value', () => {
      AuthStore.reset()
      assert.equal(AuthStore.isLogging, false)
      AuthStore.toggleLoggingState()
      assert.equal(AuthStore.isLogging, true)
    })
    it('setError method sets error value to provided', () => {
      AuthStore.reset()
      const testText = 'Easy, am just testing you.'
      
      assert.equal(AuthStore.error, '')
      AuthStore.setError(testText)
      assert.equal(AuthStore.error, testText)
    })
    it('setLoggedIn method sets isLoggedIn value to provided', () => {
      AuthStore.reset()
      
      assert.equal(AuthStore.isLoggedIn, false)
      AuthStore.setLoggedIn(true)
      assert.equal(AuthStore.isLoggedIn, true)

      AuthStore.setLoggedIn(false)
      assert.equal(AuthStore.isLoggedIn, false)
    })
  })
})
