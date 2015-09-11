import React from 'react'
import Radium from 'radium'

import Anchor from './Anchor'
import {pop} from 'app/services/utils'
import Immutable from 'immutable'
import {DEFAULT_LINE_HEIGHT} from 'app/config/styles/typography'
import {PRIMARY_COLOR} from 'app/config/styles/colors'

@Radium
class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  render() {
    let Element = this.props.href ? Anchor : 'button'
    let props = pop(Object.assign({}, this.props), 'style')
    let style = [styles.get('base')]
    return (
      <Element {...props} style={style}>{this.props.children}</Element>
    )
  }
}

var styles = Immutable.Map({
  base: {
    lineHeight: DEFAULT_LINE_HEIGHT,
    padding: '.5em 1em',
    color: 'white',
    background: PRIMARY_COLOR.hslString()
  }
})

export default Button
