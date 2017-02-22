import React from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

import CodeMirror from 'react-codemirror'

import File from './File'

import style from './style.scss'

@inject('gistsStore') @observer class FilesSection extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let files = []

    this.props.gistsStore.editedGist.files.slice().forEach(
      (file) => {
        if (file.value !== null) {
          files.push(
            <File
              key = { Math.random() }
              file = { file }
            />
          )
        }
      }
    )

    return (
      <div className = { style.filesSectionContainer }>
        { files }
        <FlatButton
          label = 'add new file'
          className = { style.addFileButton }
          onClick = { () => { this.props.gistsStore.editedGist.addFile() } }>
        </FlatButton>
      </div>
    )
  }
}

export default FilesSection