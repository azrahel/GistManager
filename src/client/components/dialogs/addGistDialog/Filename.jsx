import React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'

import style from './style.scss'

@observer class Filename extends React.Component {
  render() {
    return (
      <TextField
        value = { this.props.file.filename }
        errorText = { this.props.file.error }
        onChange = {
          (e, value) => {
            this.props.file.updateName(
              value
            )
          }
        }
        hintText = 'Filename'
        className = { style.filenameField }
        underlineShow = { false }
        hintStyle = { { top: '4px', left: '5px' } }
        errorStyle = { { top: '10px', left: '-5px' } }
      />
    )
  }
}

export default Filename
