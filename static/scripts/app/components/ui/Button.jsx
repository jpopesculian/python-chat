import React from 'react';
import classNames from 'classnames';

import Anchor from './Anchor'

class Button extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let className = classNames(this.props.className, 'button')
    return (
      <Anchor {...this.props} className={className}>{this.props.children}</Anchor>
    )
  }
}

export default Button
