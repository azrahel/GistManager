import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import style from './style.scss'

export default @inject('gistsStore') @observer class FileDetails extends Component {
  render() {
    let file = this.props.file

    return (
      <div className = { style.file }>
        <div className = { style.name }>
          <label>
            Filename:
          </label>
          <span>
            { ' ' + file.name }
          </span>
        </div>
        <div className = { style.description }>
          <label>
            File description:
          </label>
          <div className = { style.content }>
            { file.content }  
          </div>
        </div>
      </div>
    )
  }
}








