import React, { Component } from 'react'
import { action, observer, inject } from 'mobx-react'
import * as Filters from 'constants/Filters'
import InListGist from './InListGist'
import CircularProgress from 'material-ui/CircularProgress'

import style from './style.scss'

export default class ListHeader extends Component {
  render() {
    return (
      <div className = { style.listHeader }>
        {
          this.props.filter === Filters.ALL
            ? 'All gists'
            : 'Starred gists'
        }
      </div>
    )
  }
}

