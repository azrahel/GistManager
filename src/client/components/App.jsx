import React, { Component } from 'react'
import Devtools from 'mobx-react-devtools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Devtools/>
          <div>
            { this.props.children }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
