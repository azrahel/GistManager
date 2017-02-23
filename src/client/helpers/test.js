import { assert, expect } from 'chai'
import mobx               from 'mobx'

export function isEmptyMobxArray(toBeTested) {
  return  toBeTested &&
          typeof mobx.toJS(toBeTested === 'object') &&
          toBeTested.slice && 
          toBeTested.slice().length === 0
}

export function isEmptyObject(toBeTested) {
  return  toBeTested &&
          typeof toBeTested === 'object' && 
          Object.keys(toBeTested).length === 0
}

export function expectObjectToStoreNonFalsyValues(container) {
  let containsTrue = []

  for(var key in container) {
    containsTrue.push(Boolean(container[key]))
  }

  expect(containsTrue.find(value => value)).to.be.true
}

export function expectObjectToStoreOnlyFlasyValues(container) {
  let onlyFalsy = []

  for(var key in container) {
    if(isEmptyMobxArray(container[key])) {
      onlyFalsy.push(false)
    } else if(isEmptyObject(container[key])){
      onlyFalsy.push(false)
    } else {
      onlyFalsy.push(Boolean(container[key]))
    }
  }

  expect(onlyFalsy.find(value => value)).to.equal(undefined)
  onlyFalsy.push(true)
  expect(onlyFalsy.find(value => value)).to.equal(true)
}