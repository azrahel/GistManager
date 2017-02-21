import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

import style from './style.scss'

export default @inject('gistsStore') @observer class GistsDetails extends Component {
  render() {
    console.log('this.props.gistsStore.activeGist')
    console.log(this.props.gistsStore.activeGist)
    return (
      <div className = { style.gistDetails }>
        { this.props.gistsStore.activeGist.id }
      </div>
    )
  }
}




