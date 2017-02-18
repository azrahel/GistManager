import React, { Component } from 'react'
import { action, observer, inject } from 'mobx-react'

import style from './style.scss'
import CircularProgress from 'material-ui/CircularProgress'

export default @inject('authStore', 'gistsStore') @observer class GistsList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = { style.gistsListContainer }>
        { ' LTNGTH:' + this.props.gistsStore.gists.slice().length}
      </div>
    )
  }
}