import React from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'
import TextField from 'material-ui/TextField'

import CodeMirror from 'react-codemirror'

import style from './style.scss'

@inject('gistsStore') @observer class File extends React.Component {
  render() {
    let editedGist = this.props.gistsStore.editedGist
    let file = this.props.file 

    return (
      <div className = { style.fileContainer }>
        {
          editedGist.files.slice().length > 1
            ? <div
                key = { 'delete' }
                className = { classnames('material-icons', 'md-24', style.removeButton) }
                onClick = { () => {
                    editedGist.removeFile(
                      file.id
                    )
                  }
                }
              >
                { 'delete' }
              </div>
            : null
        }
        <TextField
          value = { file.name }
          errorText = { file.error }
          onChange = { (e, value) => 
            file.updateName(
              value
            )
          }
          hintText = 'Filename'
          className = { style.filenameField }
          underlineShow = { false }
          hintStyle = { { top: '4px', left: '5px' } }
          errorStyle = { { top: '10px', left: '-5px' } }
        />
        <CodeMirror
          className = { style.codeEditor }
          value = { file.content }
          onChange = {(value) => {
              file.updateContent(
                value
              )
            }
          } 
          options = { {
            lineNumbers: true
          } }
        />
      </div>
    )
  }
}

export default File
