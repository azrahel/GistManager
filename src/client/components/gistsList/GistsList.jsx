import React, { Component } from 'react'
import { action, observer, inject } from 'mobx-react'
import * as Filters from 'constants/Filters'
import style from './style.scss'
import CircularProgress from 'material-ui/CircularProgress'

export default @inject('authStore', 'gistsStore') @observer class GistsList extends Component {
  constructor(props) {
    super(props)

    this.props.gistsStore.setFilter(Filters.ALL)
  }

  render() {
    return (
      <div className = { style.gistsListContainer }>
        <div className = { style.listHeader }>
          {
            this.props.gistsStore.filter === Filters.ALL
              ? 'All your gists'
              : 'Your starred gists'
          }
        </div>
        {
          this.props.gistsStore.isLoading
            ? <CircularProgress/>
            : this.props.gistsStore.gists.slice().length
        }
      </div>
    )
  }
}