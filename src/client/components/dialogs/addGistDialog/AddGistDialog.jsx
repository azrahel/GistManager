import React from 'react'
import { observer, inject } from 'mobx-react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
@inject('UIStore') @observer class AddGistDialog extends React.Component {
  handleSubmision() {
    //submit data to store and to server (from the store level)    
    this.props.UIStore.setField('dialog', null)
  }

  render() {
    const actions = [
      <FlatButton
        key = 'cancel'
        label = "Cancel"
        primary = { true }
        onClick = { () => { this.props.UIStore.setField('dialog', null) } }
      />,
      <FlatButton
        key = 'submit'
        label = "Submit"
        primary = { true }
        onClick = { this.handleSubmision }
      />,
    ]

    return (
      <div>
        <Dialog
          title   = "Add gist"
          actions = { actions }
          modal   = { true }
          open    = { true }
        >
          Only actions can close this dialog.
        </Dialog>
      </div>
    )
  }
}

export default AddGistDialog