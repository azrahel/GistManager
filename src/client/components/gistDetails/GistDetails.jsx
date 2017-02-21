import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'


import DetailsTopSection from './DetailsTopSection'
import DetailsFilesSection from './DetailsFilesSection'

import style from './style.scss'

export default @inject('gistsStore') @observer class GistsDetails extends Component {
  // getDescription() {
  //   let descriptionLimiter = 30

  //   return ' ' + (
  //     his.props.gistsStore.activeGist.description.length > descriptionLimiter
  //       ? his.props.gistsStore.activeGist.description.substring(0, descriptionLimiter) + '(...)'
  //       : his.props.gistsStore.activeGist.description
  //     )
  // }

  // getDate() {
  //   return  ' ' + his.props.gistsStore.activeGist.created_at.substring(0, 10)
  // }

  // getTime() {
  //   return ' ' +
  //     his.props.gistsStore.activeGist.created_at.substring(
  //       11,
  //       his.props.gistsStore.activeGist.created_at.length - 1
  //     )
  // }

  // getFilesQuantity() {
  //   return ' ' + Object.keys(mobx.toJS(his.props.gistsStore.activeGist.files)).length
  // }

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




