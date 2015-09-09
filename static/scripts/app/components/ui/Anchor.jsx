import React from 'react'
import {Link} from 'react-router'

class Anchor extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  render() {
    let {href} = this.props
    if (href.startsWith('/')) {
      return <Link to={href} {...this.props}>{this.props.children}</Link>
    }
    return <a href={href} {...this.props}>{this.props.children}</a>
  }
}

export default Anchor
