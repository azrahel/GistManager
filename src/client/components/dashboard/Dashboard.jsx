import React, { Component } from 'react'

import AppBar       from 'components/appBar/AppBar'
import Menu         from 'components/menu/Menu'
import GistsListContainer    from 'components/gistsList/GistsListContainer'
import GistDetailsContainer  from 'components/gistDetails/GistDetailsContainer'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <AppBar/>
        <Menu/>
        <GistsListContainer/>
        <GistDetailsContainer/>
      </div>
    );
  }
}
