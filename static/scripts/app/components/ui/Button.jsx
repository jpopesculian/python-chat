import React from 'react';

import Anchor from './Anchor'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Anchor {...this.props} className={className}>{this.props.children}</Anchor>
    )
  }
}

export default Button
