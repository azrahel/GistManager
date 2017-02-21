import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import FlatButton from 'material-ui/FlatButton';

import style from './style.scss'

export default @inject('gistsStore') @observer class DetailsTopSection extends Component {
  getRemoveButton() {
    return <div
      key = { 'delete' }
      className = { classnames('material-icons', 'md-24', style.controlButton) }
      onClick = {
        () => {
          this.props.gistsStore.removeGist(this.props.gist.id)
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
            Decrtiption: 
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






