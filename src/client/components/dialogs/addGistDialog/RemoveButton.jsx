import React from 'react'
import { inject } from 'mobx-react'
import classnames from 'classnames'

import style from './style.scss'

@inject('gistsStore') class RemoveButton extends React.Component {
  render() {
    let editedGist = this.props.gistsStore.editedGist

    return (
      editedGist.files.slice().length > 1
        ? <div
            key = { 'delete' }
            className = { classnames('material-icons', 'md-24', style.removeButton) }
            onClick = {
              () => {
                editedGist.removeFile(
                  this.props.file.filename, this.props.file.value
                )
              }
            }
          >
            { 'delete' }
          </div>
        : null
    )
  }
}

export default RemoveButton