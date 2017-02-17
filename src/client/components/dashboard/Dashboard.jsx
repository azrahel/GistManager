import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import AppBar from 'components/appBar/AppBar'

export default class Dashboard extends Component {
  componentDidMount() {
    let { children, params } = this.props
  }

  render() {
    return (
      <div>
        <AppBar/>
        DASHBOARD!!!!!!!!!
      </div>
    );
  }
}
