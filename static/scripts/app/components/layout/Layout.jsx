import React from 'react'
import Radium from 'radium'
import {isObj, forEach} from 'app/services/utils'
import {getBreakpoint} from 'app/config/styles/media'
import Immutable from 'immutable'

@Radium
class Layout extends React.Component {

  static propTypes = {
    align: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
      React.PropTypes.object
    ]),
    children: React.PropTypes.node,
    height: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['view', 'full', 'auto']),
      React.PropTypes.object
    ]),
    justify: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']),
      React.PropTypes.object
    ]),
    kind: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['row', 'column']),
      React.PropTypes.object
    ]),
    spacing: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'stretch', 'center', 'end', 'spaceAround', 'spaceBetween']),
      React.PropTypes.object
    ]),
    style: React.PropTypes.object,
    wrap: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['auto', 'none', 'reverse']),
      React.PropTypes.object
    ])
  }

  static defaultProps = {
    align: 'start',
    justify: 'start',
    height: 'auto',
    kind: 'row',
    spacing: 'start',
    wrap: 'auto'
  }

  constructor(props) {
    super(props)
  }

  static _baseStyle = {
    display: ['flex', '-webkit-flex']
  }

  static _cssProps = Immutable.Map({
    align: 'alignItems',
    justify: 'justifyContent',
    height: 'height',
    kind: 'flexDirection',
    spacing: 'alignContent',
    wrap: 'flexWrap'
  })

  static _styleValues = Immutable.Map({
    justify: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      spaceAround: 'space-around',
      spaceBetween: 'space-between'
    },
    align: {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      baseline: 'baseline',
      stretch: 'stretch'
    },
    height: {
      full: '100%',
      auto: 'auto',
      view: '100vh'
    },
    kind: {
      column: 'column',
      row: 'row'
    },
    spacing: {
      start: 'flex-start',
      center: 'center',
      stretch: 'stretch',
      end: 'flex-end',
      spaceAround: 'space-around',
      spaceBetween: 'space-between'
    },
    wrap: {
      auto: 'wrap',
      none: 'nowrap',
      reverse: 'wrap-reverse'
    }
  })

  _getStyle(propName, value) {
    let style = {}
    let cssProp = Layout._cssProps.get(propName)
    style[cssProp] = Layout._styleValues.get(propName)[value]
    return style
  }

  _extractStyle(propName, getStyle) {
    let prop = this.props[propName]
    if (!isObj(prop)) {
      return getStyle(prop)
    }
    let defaultValue = Layout.defaultProps[propName]
    let style = getStyle(defaultValue)
    for (let {key, value} of forEach(prop)) {
      style[getBreakpoint(key)] = getStyle(value)
    }
    return style
  }

  render() {
    let compiledStyles = [Layout._baseStyle]
    Layout._cssProps.map((cssProp, propName) => {
      compiledStyles.push(this._extractStyle(propName, this._getStyle.bind(this, propName)))
    })
    compiledStyles = compiledStyles.concat(this.props.style)
    return <div {...this.props} style={compiledStyles}>{this.props.children}</div>
  }

}


export default Layout
