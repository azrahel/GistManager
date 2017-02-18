import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import style from './style.scss'
import CircularProgress from 'material-ui/CircularProgress'

export default @inject('gistsStore') @observer class GistsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = { style.gistsListContainer }>
        GISTS LIST
      </div>
    )
  }
}




