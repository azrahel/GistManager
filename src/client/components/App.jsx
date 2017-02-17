import React, { Component } from 'react'
import { inject, observer } from 'mobx-react';

import AppBar from 'components/appBar/AppBar'

import style from 'styles/index.scss';

import Devtools from 'mobx-react-devtools'

export default @inject('UIStore') @observer class App extends Component {
  constructor(props) {
    super(props)

    this.store = this.props.UIStore
  }

  render() {
    return (
      <div className = { style.appContainer }>
        <Devtools/>
        <AppBar/>
        <div className = { style.appBody }>
          { this.props.children }
        </div>
      </div>
    )
  }
}
