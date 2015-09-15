import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import Link from 'app/components/ui/Link'

@reactMixin.decorate(Navigation)
class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<div><Link href="http://google.com">Google</Link></div>)
  }

}

export default Home
