import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { browserHistory } from 'react-router'
import CircularProgress from 'material-ui/CircularProgress'
import DetailsHeaderBar from './DetailsHeaderBar'
import GistDetails from './GistDetails'

import style from './style.scss'

export default @inject('gistsStore') @observer class GistsDetailsContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className = { style.gistDetailsContainer }>
        <DetailsHeaderBar/>
        {
          this.props.gistsStore.gistDetailsLoading
            ? <CircularProgress className = { style.loader }/>
            : <GistDetails/>
         }
      </div>
    )
  }
}




