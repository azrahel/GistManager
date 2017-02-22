import React from 'react'
import { observer, inject } from 'mobx-react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress'
import DescriptionSection from './DescriptionSection'
import FilesSection from './FilesSection'

import style from './style.scss'

const togglerStyles = {
  thumbOn: {
    backgroundColor: '#449DEA'
  },
  trackOn: {
    backgroundColor: '#449DEA'
  }
}

@inject('UIStore', 'gistsStore') @observer class AddGistDialog extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.addEventListener('keyup', function (e) {
        var escapeKey = e.key === 'Escape' || 
                        e.key === 'Esc' || 
                        e.keyCode === 27
        if (escapeKey) { //
          this.props.UIStore.dismissDialog()
        }
    }.bind(this))
  }

  handleSubmision() {
    let gistValid = true

    this.props.UIStore.setField('dialogLoading', true)
    
    this.props.gistsStore.editedGist.files.slice().forEach(file => {
      if(!file.valid()) {
        gistValid = false
      }
    })

    if(gistValid) {
      this.props.gistsStore.saveGist().then(() => {
        this.props.UIStore.setField('dialogLoading', false)
      })
    }
  }

  render() {
    let editedGist = this.props.gistsStore.editedGist

    const actions = [
      <Toggle
        key = { 'toggle' }
        onToggle = { (e, state) => {
            editedGist.updateField(
              editedGist.fieldsKeys.publiclyVisible,
              state
            )
          }
        }
        toggled = { !editedGist.publiclyVisible }
        label = "Publicly visible"
        thumbSwitchedStyle = { togglerStyles.thumbOn }
        trackSwitchedStyle = { togglerStyles.trackOn }
      />,
      <FlatButton
        key = 'cancel'
        label = "Cancel"
        labelStyle = { { color: '#449DEA' } }
        onClick = { () => { this.props.UIStore.dismissDialog() } }
      />,
      <FlatButton
        key = 'submit'
        label = "Submit"
        labelStyle = { { color: '#449DEA' } }
        onClick = { () => { this.handleSubmision() } }
      />,
    ]

    return (
      <div>
        <Dialog
          className = { style.dialog }
          bodyStyle = { { padding: 0, minHeight: '450px'} }
          actionsContainerClassName = { style.actionsContainer }
          onRequestClose = { () => { this.props.UIStore.dismissDialog() } }
          autoScrollBodyContent = { true }
          title   = "Add new gist"
          actions = { this.props.UIStore.dialogLoading ? null : actions }
          modal   = { true }
          open    = { true }
          key = { 'dialog' }
        >
          {
            this.props.UIStore.dialogLoading
              ? <div className = { style.loadingContainer }>
                  <CircularProgress/>
                </div>
              : [
                <DescriptionSection key = 'descriptionSection'/>,
                <FilesSection key = 'filesSection'/>
              ]
          }
          
        </Dialog>
      </div>
    )
  }
}

export default AddGistDialog