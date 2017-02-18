import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'

import style from './style.scss'
import CircularProgress from 'material-ui/CircularProgress'

export default @inject('gistsStore') @observer class GistsDetails extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = { style.gistDetailsContainer }>
        GIST DETAILS
      </div>
    )
  }
}




