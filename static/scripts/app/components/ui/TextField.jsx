import React from 'react'
import Radium from 'radium'
import Immutable from 'immutable'
import {DEFAULT_LINE_HEIGHT} from 'app/config/styles/typography'

@Radium
class TextField extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    styles: React.PropTypes.instanceOf(Immutable.Map)
  }

  static defaultProps = {
    styles: Immutable.Map()
  }

  constructor(props) {
    super(props)
  }

  render() {
    let inputStyles = [
      styles.get('input').get('base')
    ].concat(this.props.styles.get('input'))
    let labelStyles = [
      styles.get('label').get('base')
    ].concat(this.props.styles.get('label'))
    let hintStyles = [
      styles.get('hint').get('base')
    ].concat(this.props.styles.get('hint'))
    return (
      <div>
        <label style={labelStyles}>{this.props.label}</label>
        <input {...this.props} style={inputStyles} />
        <span style={hintStyles}>{this.props.error}</span>
      </div>
    )
  }
}

var styles = Immutable.Map({
  input: Immutable.Map({
    base: {
      display: 'block',
      width: '100%',
      lineHeight: DEFAULT_LINE_HEIGHT,
      padding: '.2em 0',
      borderBottom: '.1em solid hsla(189, 65%, 0%, .3)'
    }
  }),
  label: Immutable.Map({
    base: {
      display: 'none'
    }
  }),
  hint: Immutable.Map({
    base: {
      display: 'block',
      lineHeight: DEFAULT_LINE_HEIGHT,
      height: `${DEFAULT_LINE_HEIGHT}em`,
      color: 'red'
    }
  })
})

export default TextField
