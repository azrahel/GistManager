import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import AppBar       from 'components/appBar/AppBar'
import Menu         from 'components/menu/Menu'
import GistsList    from 'components/gistsList/GistsList'
import GistDetails  from 'components/gistDetails/GistDetails'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <AppBar/>
        <Menu/>
        <GistsList/>
        <GistDetails/>
      </div>
    );
  }
}
