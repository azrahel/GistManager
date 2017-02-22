import React, { Component } from 'react'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import style from './style.scss'

export default @inject('gistsStore') @observer class InListGist extends Component {
  getDescription() {
    let descriptionLimiter = 30

    return ' ' + (
      this.props.gist.description.length > descriptionLimiter
        ? this.props.gist.description.substring(0, descriptionLimiter) + '(...)'
        : this.props.gist.description
      )
  }

  getDate() {
    return  ' ' + this.props.gist.created_at.substring(0, 10)
  }

  getTime() {
    return ' ' +
      this.props.gist.created_at.substring(
        11,
        this.props.gist.created_at.length - 1
      )
  }

  getFilesQuantity() {
    return ' ' + Object.keys(mobx.toJS(this.props.gist.files)).length
  }

  selectItem() {
    this.props.gistsStore.toggleDetailsLoading()
    
    this.props.gistsStore.fetchGist(this.props.gist.id).then((gist) => {
      this.props.gistsStore.setActive(gist)
      this.props.gistsStore.toggleDetailsLoading()
    })
  }

  isActive(id) {
    if(this.props.gistsStore.activeGist) {
      return this.props.gist.id === this.props.gistsStore.activeGist.id
    } 

    return false
  }

  render() {
    return (
      <div
        className = { classnames(
            style.listItem,
            this.isActive(this.props.gist.id)
              ? style.active
              : ''
          )
        }
        onClick = { () => this.selectItem(this.props.gist.id) }
      >
        <div className = { style.description }>
          <label>
            Description:   
          </label>
          { this.getDescription() }
        </div>
        <div className = { style.created_at }>
          <div className = { style.left }>
            <label>
              Created at:   
            </label>
            { this.getDate() }
          </div>
          <div className = { style.right }>
            <label>
              Time:   
            </label>
            { this.getTime() }
          </div>
        </div>
        <div className = { style.filesNo }>
        <label>
          Files inside:
        </label>
          { this.getFilesQuantity() }
        </div>
      </div>
    )
  }
}