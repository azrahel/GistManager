import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import classnames from 'classnames'

import AddGistDialog from 'components/dialogs/addGistDialog/AddGistDialog'

import style from './style.scss'

export default @inject('UIStore', 'gistsStore') @observer class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          icon: 'note_add',
          label: 'Add new gist',
          onClick: () => { 
            this.props.UIStore.setField('dialog', AddGistDialog) 
          }
        },
        {
          icon: 'list',
          label: 'All gists'
        },
        {
          icon: 'grade',
          label: 'Starred gists'
        }
      ]
    }
  }

  addNewGist() {

  }

  render() {
    return (
      <div className = { style.menuContainer }>
        {
          this.state.items.map(item =>
            <div className = { style.menuItem } onClick = { () => item.onClick() }>
              <i
                key = { item.icon }
                className = { classnames('material-icons', 'md-24') }
              >
                { item.icon }
              </i>
              <span>{ item.label }</span>
            </div>
          )
        }
      </div>
    )
  }
}
