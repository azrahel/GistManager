import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import style from './style.scss'

export default class Menu extends Component {
  render() {
    return (
      <div className = { style.menuContainer }>
        MENU
      </div>
    )
  }
}
