import React from 'react';
import classNames from 'classnames';

class Submit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let className = classNames(this.props.className, 'button')
    return (
      <button {...this.props} className={className} type="submit">{this.props.children}</button>
    )
  }
}

export default Submit
