import React, { Component } from 'react'
import { action, observer, inject } from 'mobx-react'
import * as Filters from 'constants/Filters'
import InListGist from './InListGist'
import CircularProgress from 'material-ui/CircularProgress'

import ListHeader from './ListHeader'

import style from './style.scss'

export default @inject('authStore', 'gistsStore') @observer class GistsList extends Component {
  render() {
    let gists = this.props.gistsStore.gists.slice()
    return (
      <div className = { style.itemsContainer }>
        {
          gists.map((gist) => {
            return <InListGist key = { gist.id } gist = { gist }/>
          })
        }
      </div>
      
    )
  }
}