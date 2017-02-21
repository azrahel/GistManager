import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import * as Filters from 'constants/Filters'

import style from './style.scss'

export default @inject('gistsStore') @observer class MenuItem extends Component {
  render() {
    return (
      <div 
        className = { classnames(
            style.menuItem,
            this.props.gistsStore.filter === this.props.item.filter
              ? style.active
              : ''
          )
        }
        onClick = { () => this.props.item.onClick() }
      >
        <i
          key = { this.props.item.icon }
          className = { classnames('material-icons', 'md-24') }
        >
          { this.props.item.icon }
        </i>
        <span>{ this.props.item.label }</span>
      </div>
    )
  }
}


