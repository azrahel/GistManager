import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import CircularProgress from 'material-ui/CircularProgress'
import DetailsHeaderBar from './DetailsHeaderBar'
import GistDetails from './GistDetails'

import style from './style.scss'

export default @inject('gistsStore') @observer class GistsDetailsContainer extends Component {
  render() {
    return (
      <div className = { style.gistDetailsContainer }>
        <DetailsHeaderBar/>
        {
          this.props.gistsStore.gistDetailsLoading ||
          this.props.gistsStore.gistDetailsLoading === undefined
            ? <CircularProgress className = { style.loader }/>
            : <GistDetails/>
         }
      </div>
    )
  }
}




