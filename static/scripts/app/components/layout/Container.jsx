import React from 'react'
import Radium from 'radium'
import { isObj, isFloat, isNum, isStr, isArr, forEach, arrHasOneOf, capitalizeFirstLetter }
  from 'app/services/utils'
import {getBreakpoint} from 'app/config/styles/media'
import Immutable from 'immutable'

@Radium
class Container extends React.Component {

  static propTypes = {
    align: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'center', 'end', 'stretch', 'baseline', 'none']),
      React.PropTypes.object
    ]),
    children: React.PropTypes.node,
    order: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    push: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['auto', 'none']),
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.object
    ]),
    span: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['auto', 'fill', 'fit']),
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.array,
      React.PropTypes.object
    ]),
    style: React.PropTypes.object
  }

  static defaultProps = {
    align: 'none',
    order: 0,
    push: 'none',
    span: 1
  }

  constructor(props) {
    super(props)
  }

  static _baseStyle = {}

  _getOrderStyle(assignment) {
    return {order: assignment}
  }

  _getHeightStyle(assignment) {
    return assignment === 'full' ? {height: '100%'} : {}
  }

  static _alignValues = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    baseline: 'baseline',
    stretch: 'stretch'
  }

  _getAlignStyle(assignment) {
    let style = {}
    if (assignment === 'none') {
      return style
    } else if (assignment === 'stretch') {
      style.height = '100%'
    }
    style.alignSelf = Container._alignValues[assignment]
    return style
  }

  _getPushStyle(assignment) {
    let convertAssignment = (value) => {
      if (value === 'none') {
        return 0
      }
      if (isNum(value)) {
        return `${100 * value}%`
      }
      return value
    }
    if (isObj(assignment)) {
      let style = {}
      for (let {key, value} of forEach(assignment)) {
        key = capitalizeFirstLetter(key)
        style[`margin${key}`] = convertAssignment(value)
      }
      return style
    }
    return {margin: convertAssignment(assignment)}
  }

  static _spanValues = Immutable.Map({
    auto: 'auto',
    fill: 'fill',
    fit: 'content',
    none: 'none'
  })

  _getSpanStyle(assignment) {
    if (Container._spanValues.has(assignment)) {
      return {flex: Container._spanValues.get(assignment)}
    }
    if (assignment === 0) {
      return {visibility: 'collapse'}
    }
    if (isFloat(assignment)) {
      assignment = `${100 * assignment}%`
    }
    if (isStr(assignment)) {
      assignment = '0 0 ' + assignment
    }
    if (isArr(assignment)) {
      assignment = assignment.join(' ')
    }
    return {flex: assignment}
  }

  _extractStyle(propName, getStyle) {
    let prop = this.props[propName]
    if (!isObj(prop) || !arrHasOneOf(Object.keys(prop), ['xs', 'sm', 'md', 'lg', 'xl'])) {
      return getStyle(prop)
    }
    let defaultValue = Container.defaultProps[propName]
    let style = getStyle(defaultValue)
    for (let {key, value} of forEach(prop)) {
      style[getBreakpoint(key)] = getStyle(value)
    }
    return style
  }

  render() {
    let compiledStyles = [
      Container._baseStyle,
      this._extractStyle('align', ::this._getAlignStyle),
      this._extractStyle('height', ::this._getHeightStyle),
      this._extractStyle('order', ::this._getOrderStyle),
      this._extractStyle('push', ::this._getPushStyle),
      this._extractStyle('span', ::this._getSpanStyle)
    ].concat(this.props.style)
    return <div {...this.props} style={compiledStyles}>{this.props.children}</div>
  }

}

export default Container
