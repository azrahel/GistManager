import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import * as Filters from 'constants/Filters'

import CircularProgress from 'material-ui/CircularProgress'

import ListHeader from './ListHeader'
import GistsList from './GistsList'

import style from './style.scss'

export default @inject('authStore', 'gistsStore') @observer class GistsListContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.gistsStore.setFilter(Filters.ALL)
  }

  render() {
    return (
      <div className = { style.gistsListContainer }>
        <ListHeader filter = { this.props.gistsStore.filter }/>
        {
          this.props.gistsStore.isLoading ||
          this.props.gistsStore.isLoading === undefined
            ? <CircularProgress className = { style.loader }/>
            : <GistsList/>
        }
      </div>
    )
  }
}