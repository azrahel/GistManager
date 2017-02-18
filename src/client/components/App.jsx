import React, { Component } from 'react'
import Devtools from 'mobx-react-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import style from 'styles/index.scss'

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          {
            // <Devtools/>
          }
          <div className = { style.appContainer }>
            { this.props.children }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}



