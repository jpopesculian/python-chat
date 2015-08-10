import React from 'react';
import {Link} from 'react-router';

class Anchor extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {href, route} = this.props
    if (route) {
      return <Link to={route} {...this.props}>{this.props.children}</Link>
    }
    return <a href={href} {...this.props}>{this.props.children}</a>
  }
}

export default Anchor
