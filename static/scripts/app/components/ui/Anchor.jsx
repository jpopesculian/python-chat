import React from 'react'
import {Link} from 'react-router'

class Anchor extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    href: React.PropTypes.string,
    route: React.PropTypes.string
  }

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
