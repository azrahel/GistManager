import fetchMock          from 'fetch-mock'
import UIStore            from 'stores/UIStore'
import { assert, expect } from 'chai'
import mobx               from 'mobx'

import * as testHelpers from 'helpers/test'

describe('- UIStore ', () => {
  describe('default values:', () => {
    it('default dialog value is null', () => {
      UIStore.reset()

      expect(UIStore.dialog).to.equal(null)
    })

    it('default dialogLoading value is false', () => {
      UIStore.reset()

      expect(UIStore.dialogLoading).to.equal(false)
    })
  })
  describe('methods:', () => {
    it('setField should set field of passed key name with passed value', () => {
      UIStore.reset()

      let dialogMock = { a: 1, b: 2 }

      expect(UIStore.dialog).to.equal(null)
      expect(UIStore.dialogLoading).to.equal(false)

      UIStore.setField('dialog', dialogMock)
      UIStore.setField('dialogLoading', true)

      expect(mobx.toJS(UIStore.dialog)).to.deep.equal(dialogMock)
      expect(UIStore.dialogLoading).to.equal(true)
    })

    it('dismissDialog should nullify "dialog" field', () => {
      UIStore.reset()

      let dialogMock = { a: 1, b: 2 }

      expect(UIStore.dialog).to.equal(null)
      UIStore.setField('dialog', dialogMock)
      expect(mobx.toJS(UIStore.dialog)).to.deep.equal(dialogMock)

      UIStore.dismissDialog()
      expect(UIStore.dialog).to.equal(null)
    })

    it('reset should set all non-function values to empty', () => {
      UIStore.reset()

      testHelpers.expectObjectToStoreOnlyFlasyValues(UIStore)

      let dialogMock = { a: 1, b: 2 }

      expect(UIStore.dialog).to.equal(null)
      UIStore.setField('dialog', dialogMock)
      expect(mobx.toJS(UIStore.dialog)).to.deep.equal(dialogMock)

      testHelpers.expectObjectToStoreNonFalsyValues(UIStore)

      UIStore.dismissDialog()
      expect(UIStore.dialog).to.equal(null)

      let unresetable = 'abc';

      UIStore.unresetableValue = unresetable
      UIStore.reset()
      expect(UIStore.unresetableValue).to.equal(unresetable)
      testHelpers.expectObjectToStoreNonFalsyValues(UIStore)      

      delete UIStore.unresetableValue;
    })
  })
})

// import { observable, action, useStrict } from 'mobx'
// import singleton from 'singleton'
// import 'whatwg-fetch'

// useStrict(true)

// class UIStore extends singleton {
//   @observable dialog
//   @observable dialogLoading

//   constructor() {
//     super()

//     this.dialogLoading = false
//   }

//   @action dismissDialog() {
//     this.dialog = null
//   }
  
//   @action setField(name, value) {
//     this[name] = value
//   }

//   @action reset() {
//     this.dialog = null
//     this.dialogLoading = false
//   }
// }

// export default UIStore.get();