import React, { Component } from 'react'
import mobx from 'mobx'
import { observer, inject } from 'mobx-react'

import FileDetails from './FileDetails'

import style from './style.scss'

export default @inject('gistsStore') @observer class DetailsFilesSection extends Component {
  render() {
    let files = []

    for(var file in this.props.files) {
      files.push({
        name: file,
        content: mobx.toJS(this.props.files)[file].content
      })
    }

    return (
      <div className = { style.filesSection }>
        {
          files.map((file) => {
            return <FileDetails key = { file.name + Math.random() } file = { file }/>
          })
        }
      </div>
    )
  }
}








