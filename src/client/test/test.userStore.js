import fetchMock          from 'fetch-mock'
import UserStore          from 'stores/UserStore'
import { assert, expect } from 'chai'
import mobx               from 'mobx'

import * as testHelpers from 'helpers/test'

describe('- UserStore ', () => {
  describe('default values:', () => {
    it('default username value should be empty string', () => {
      UserStore.reset()

      expect(UserStore.username).to.equal('')
    })

    it('default password value should be empty string', () => {
      UserStore.reset()

      expect(UserStore.password).to.equal('')
    })

    it('default token value should be empty string', () => {
      UserStore.reset()

      expect(UserStore.token).to.equal('')
    })
  })
  describe('methods:', () => {
    it('setField should set field of passed key name with passed value', () => {
      UserStore.reset()

      let username = 'antoni'
      let password = 'antonisSuperSecretPass'
      let token    = 'totallyRandomTokenForAntoni'

      expect(UserStore.username).to.equal('')
      expect(UserStore.password).to.equal('')
      expect(UserStore.token).to.equal('')
      
      UserStore.setField('username', username)
      UserStore.setField('password', password)
      UserStore.setField('token', token)

      expect(UserStore.username).to.equal(username)
      expect(UserStore.password).to.equal(password)
      expect(UserStore.token).to.equal(token)
    })

    it('reset should set all non-function values to empty', () => {
      UserStore.reset()

      testHelpers.expectObjectToStoreOnlyFlasyValues(UserStore)

      let username = 'antoni'
      let password = 'antonisSuperSecretPass'
      let token    = 'totallyRandomTokenForAntoni'

      UserStore.setField('username', username)
      UserStore.setField('token', token)

      testHelpers.expectObjectToStoreNonFalsyValues(UserStore)

      UserStore.reset()

      testHelpers.expectObjectToStoreOnlyFlasyValues(UserStore)

      let unresetable = 'abc';

      UserStore.unresetableValue = unresetable
      UserStore.reset()
      expect(UserStore.unresetableValue).to.equal(unresetable)
      testHelpers.expectObjectToStoreNonFalsyValues(UserStore)      

      delete UserStore.unresetableValue;
    })
  })
})
