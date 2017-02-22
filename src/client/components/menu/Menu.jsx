import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import * as Filters from 'constants/Filters'

import AddGistDialog from 'components/dialogs/addGistDialog/AddGistDialog'
import MenuItem from './MenuItem'

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
            this.props.gistsStore.editGist()
            this.props.UIStore.setField('dialog', AddGistDialog)
          }
        },
        {
          icon: 'list',
          label: 'All gists',
          filter: Filters.ALL,
          onClick: () => { 
            this.props.gistsStore.setFilter(Filters.ALL) 
          }
        },
        {
          icon: 'grade',
          label: 'Starred gists',
          filter: Filters.STARRED,
          onClick: () => { 
            this.props.gistsStore.setFilter(Filters.STARRED) 
          }
        }
      ]
    }
  }

  render() {
    return (
      <div className = { style.menuContainer }>
        {
          this.state.items.map(item =>
            <MenuItem key = { item.icon } item = { item }/>
          )
        }
      </div>
    )
  }
}
