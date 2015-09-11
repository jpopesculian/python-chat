import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import Anchor from 'app/components/ui/Anchor'

@reactMixin.decorate(Navigation)
class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (<div><Anchor href="http://google.com">Google</Anchor></div>)
  }

}

export default Home
