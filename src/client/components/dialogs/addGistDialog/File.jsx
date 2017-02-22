import React from 'react'
import { observer, inject } from 'mobx-react'
import TextField  from 'material-ui/TextField'

import CodeEditor   from './CodeEditor'
import Filename     from './Filename'
import RemoveButton from './RemoveButton'

import style from './style.scss'

class File extends React.Component {
  render() {
    let file = this.props.file

    return (
      <div className = { style.fileContainer }>
        <RemoveButton file = { file }/>
        <Filename     file = { file }/>
        <CodeEditor   file = { file }/>
      </div>
    )
  }
}

export default File
