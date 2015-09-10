import React from 'react'
import Radium from 'radium'
import {isObj, forEach} from 'app/services/utils'
import {getBreakpoint} from 'app/config/styles/media'
import Immutable from 'immutable'

@Radium
class Layout extends React.Component {

  static propTypes = {
    align: React.PropTypes.array,
    alignCross: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'center', 'end', 'baseline', 'stretch']),
      React.PropTypes.object
    ]),
    alignMain: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['start', 'center', 'end', 'spaceAround', 'spaceBetween']),
      React.PropTypes.object
    ]),
    children: React.PropTypes.node,
    height: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['view', 'full', 'auto']),
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
    wrap: React.PropTypes.oneOfType([
      React.PropTypes.oneOf(['auto', 'none', 'reverse']),
      React.PropTypes.object
    ])
  }

  static defaultProps = {
    alignCross: 'start',
    alignMain: 'start',
    height: 'auto',
    kind: 'row',
    spacing: 'start',
    wrap: 'auto'
  }

  constructor(props) {
    super(props)
  }


  _extractStyle(propName) {
    let prop = this.props[propName]
    let options = styles.get(propName)
    if (!isObj(prop)) {
      return Object.assign({}, options[prop])
    }
    let defaultValue = Layout.defaultProps[propName]
    let style = Object.assign({}, options[defaultValue])
    for (let {key, value} of forEach(prop)) {
      style[getBreakpoint(key)] = Object.assign({}, options[value])
    }
    return style
  }

  render() {
    if (this.props.align && this.props.align.length > 1) {
      this.props.alignMain = this.props.align[0]
      this.props.alignCross = this.props.align[1]
    }
    let compiledStyles = [
      styles.get('base'),
      this._extractStyle('alignCross'),
      this._extractStyle('alignMain'),
      this._extractStyle('height'),
      this._extractStyle('kind'),
      this._extractStyle('spacing'),
      this._extractStyle('wrap')
    ]
    return <div style={compiledStyles}>Layout</div>
  }

}

var styles = Immutable.Map({
  alignMain: {
    start: {
      justifyContent: 'flex-start'
    },
    center: {
      justifyContent: 'center'
    },
    end: {
      justifyContent: 'flex-end'
    },
    spaceAround: {
      justifyContent: 'space-around'
    },
    spaceBetween: {
      justifyContent: 'space-between'
    }
  },
  alignCross: {
    start: {
      alignItems: 'flex-start'
    },
    center: {
      alignItems: 'center'
    },
    end: {
      alignItems: 'flex-end'
    },
    baseline: {
      alignItems: 'baseline'
    },
    stretch: {
      alignItems: 'stretch'
    }
  },
  base: {
    display: ['flex', '-webkit-flex'],
    background: 'red'
  },
  height: {
    full: {
      height: '100%'
    },
    auto: {
      height: 'auto'
    },
    view: {
      height: '100vh'
    }
  },
  kind: {
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
    }
  },
  spacing: {
    start: {
      alignContent: 'flex-start'
    },
    center: {
      alignContent: 'center'
    },
    stretch: {
      alignContent: 'stretch'
    },
    end: {
      alignContent: 'flex-end'
    },
    spaceAround: {
      alignContent: 'space-around'
    },
    spaceBetween: {
      alignContent: 'space-between'
    }
  },
  wrap: {
    auto: {
      flexWrap: 'wrap'
    },
    none: {
      flexWrap: 'nowrap'
    },
    reverse: {
      flexWrap: 'wrap-reverse'
    }
  }
})


export default Layout
