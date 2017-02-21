import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import style from './style.scss'

export default @inject('gistsStore') @observer class DetailsSectionFile extends Component {
  render() {
    let file = this.props.file

    return (
      <div className = { style.file }>
        <div className = { style.name }>
          { file.name }
        </div>
        <div className = { style.content }>
          { file.content }
        </div>
      </div>
    )
  }
}








