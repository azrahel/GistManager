import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

export default class Dashboard extends Component {
  componentDidMount() {
    let { children, params } = this.props
  }

  render() {
    return (
      <div>DASHBOARD!!!!!!!!!</div>
    );
  }
}
