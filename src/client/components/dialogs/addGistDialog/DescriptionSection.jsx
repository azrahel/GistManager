import React from 'react'
import { observer, inject } from 'mobx-react'
import TextField from 'material-ui/TextField'

import style from './style.scss'

@inject('gistsStore') @observer class DescriptionSection extends React.Component {
  render() {
    let editedGist = this.props.gistsStore.editedGist
    
    return (
      <div className = { style.descriptionSectionContainer }>
        <TextField
          onChange = { (e, value) => 
            editedGist.updateField(
              editedGist.fieldsKeys.description,
              value
            )
          }
          value = { editedGist.description }
          className = { style.descriptionField }
          fullWidth
          hintStyle = { { top: '5px', left: '5px' } }
          rows = { 3 }
          hintText = 'Please describe your new gist'
          multiLine = { true }
          underlineShow = { false }
        />
      </div>
    )
  }
}

export default DescriptionSection