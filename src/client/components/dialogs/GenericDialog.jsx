import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

export default @inject('UIStore') @observer class GenericDialog extends Component {
  render() {
    return this.props.UIStore.dialog
      ? React.createFactory(this.props.UIStore.dialog)()
      : null
  }
}




