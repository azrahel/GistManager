import AuthStore from '../stores/authStore'
import { assert } from 'chai'

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('AuthStore', () => {
  it('default isLogging value is false', () => {
    assert.equal(AuthStore.isLogging, false)
  })
})

// describe('AuthStore', () => {
//   it('default error value is empty string', () => {
//     const store = new AuthStore()
    
//     expect(store.error).toBe('')
//   })
// })

// describe('AuthStore', () => {
//   it('toggleLoggingState toggles isLogging value', () => {
//     const store = new AuthStore()
    
//     expect(store.isLogging).toBe(false)
//     store.toggleLoggingState()
//     expect(store.isLogging).toBe(true)
//   })
// })

// describe('AuthStore', () => {
//   it('toggleLoggingState toggles isLogging value', () => {
//     const store = new AuthStore()
    
//     expect(store.isLogging).toBe(false)
//     store.toggleLoggingState()
//     expect(store.isLogging).toBe(true)
//   })
// })

// describe('AuthStore', () => {
//   it('setError method sets error value to provided', () => {
//     const store = new AuthStore()
//     const testText = 'Easy, am just testing you.'
    
//     expect(store.error).toBe('')
//     store.setError(testText)
//     expect(store.error).toBe(testText)
//   })
// })

// describe('AuthStore', () => {
//   it('setLoggedIn method sets isLoggedIn value to provided', () => {
//     const store = new AuthStore()
    
//     expect(store.isLoggedIn).toBe(false)
//     store.setLoggedIn(true)
//     expect(store.isLoggedIn).toBe(true)

//     store.setLoggedIn(false)
//     expect(store.isLoggedIn).toBe(false)
//   })
// })
