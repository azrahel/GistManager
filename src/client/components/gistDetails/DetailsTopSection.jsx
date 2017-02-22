import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import AddGistDialog from 'components/dialogs/addGistDialog/AddGistDialog'

import style from './style.scss'

export default @inject('UIStore', 'gistsStore') @observer class DetailsTopSection extends Component {
  deleteGist() {
    let gistsStore = this.props.gistsStore

    gistsStore.toggleDetailsLoading()

    gistsStore.deleteGist(this.props.gist.id).then((response) => {
      gistsStore.setActive(gistsStore.gists[0])
      gistsStore.toggleDetailsLoading()   
    })
  }

  getRemoveButton() {
    return <div
      key = { 'delete' }
      className = { classnames('material-icons', 'md-24', style.controlButton) }
      onClick = {
        () => {
          this.deleteGist()
        }
      }
    >
      { 'delete' }
    </div>
  }

  getEditButton() {
    return <div
      key = { 'edit' }
      className = { classnames('material-icons', 'md-24', style.controlButton) }
      onClick = {
        () => {
          this.props.gistsStore.editGist(this.props.gist)
          this.props.UIStore.setField('dialog', AddGistDialog)
        }
      }
    >
      { 'edit' }
    </div>
  }

  render() {
    let gist = this.props.gist

    return (
      <div className = { style.topSection }>
        <div className = { style.descriptionContainer }>
          <label>
            Gist decrtiption: 
          </label>
          <div className = { style.description }>
            { gist.description }
          </div>
        </div>
        <div className = { style.controlsContainer }>
          { this.getRemoveButton() }
          { this.getEditButton() }
        </div>
      </div>
    )
  }
}






