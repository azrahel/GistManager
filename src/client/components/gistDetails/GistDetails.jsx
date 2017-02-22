import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'


import DetailsTopSection from './DetailsTopSection'
import DetailsFilesSection from './DetailsFilesSection'

import style from './style.scss'

export default @inject('gistsStore') @observer class GistsDetails extends Component {
  render() {
    let gist = this.props.gistsStore.activeGist

    return (
      <div className = { style.gistDetails }>
        <DetailsTopSection gist = { gist }/>
        <DetailsFilesSection files = { gist.files }/>
      </div>
      : null
    )
  }
}




