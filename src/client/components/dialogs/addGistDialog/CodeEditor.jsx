import React from 'react'
import { observer } from 'mobx-react'
import CodeMirror from 'react-codemirror'

import style from './style.scss'

@observer class CodeEditor extends React.Component {
  render() {
    return (
      <CodeMirror
        className = { style.codeEditor }
        value = { this.props.file.value }
        onChange = {
          (value) => {
            this.props.file.updateContent(
              value
            )
          }
        } 
        options = { {
          lineNumbers: true
        } }
      />
    )
  }
}

export default CodeEditor


