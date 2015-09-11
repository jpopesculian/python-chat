import React from 'react'
import Radium from 'radium'
import reactMixin from 'react-mixin'

import {Navigation} from 'react-router'
import Immutable from 'immutable'
import {PRIMARY_COLOR} from 'app/config/styles/colors'
import {isUrl} from 'app/services/validators'

@Radium
@reactMixin.decorate(Navigation)
class Link extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    to: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }


  render() {
    let {to} = this.props
    let props = Object.assign({}, this.props)
    if (to) {
      if (isUrl(to)) {
        props.href = to
      } else {
        props.onClick = () => this.transitionTo(to)
      }
    }
    let style = [styles.get('base')]
    return (
      <a {...props} style={style}>{this.props.children}</a>
    )
  }
}

var styles = Immutable.Map({
  base: {
    color: PRIMARY_COLOR.hslString(),
    transition: 'color .2s',
    ':hover': {
      color: PRIMARY_COLOR.lighten(0.4).hslString()
    }
  }
})

export default Link
