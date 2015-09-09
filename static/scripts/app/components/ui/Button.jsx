import React from 'react'

class Button extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button {...this.props}>{this.props.children}</button>
    )
  }
}

export default Button
