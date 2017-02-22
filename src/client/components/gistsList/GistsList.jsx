import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import InListGist from './InListGist'

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