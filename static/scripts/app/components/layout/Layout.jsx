import React from 'react'
import Radium from 'radium'
import {isObj, forEach} from 'app/services/utils'
import {getBreakpoint} from 'app/config/styles/media'
import Immutable from 'immutable'

@Radium
class Layout extends React.Component {

  static propTypes = {
    alignment: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    children: React.PropTypes.node,
    defaults: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    height: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['view', 'full', 'auto']),
      React.PropTypes.object
    ]),
    kind: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['row', 'column']),
      React.PropTypes.object
    ]),
    space: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['around', 'between', 'none']),
      React.PropTypes.object
    ])
  }

  static defaultProps = {
    alignment: ['start', 'start'],
    defaults: ['auto', 'auto'],
    height: 'auto',
    kind: 'row',
    space: 'none'
  }

  constructor(props) {
    super(props)
  }


  _heightStyle() {
    if (!isObj(this.props.height)) {
      return styles.get('heights')[this.props.height]
    }
    let style = styles.get('heights')['auto']
    for (let {key, value} of forEach(this.props.height)) {
      style[getBreakpoint(key)] = styles.get('heights')[value]
    }
    return style
  }

  render() {
    let heightStyle = this._heightStyle()
    let compiledStyles = [styles.get('base'), heightStyle]
    console.log(compiledStyles)
    return <div style={compiledStyles}>Layout</div>
  }

}

var styles = Immutable.Map({
  base: {
    background: 'red'
  },
  heights: {
    full: {
      height: '100%'
    },
    auto: {
      height: 'auto'
    },
    view: {
      height: '100vh'
    }
  }
})


export default Layout
