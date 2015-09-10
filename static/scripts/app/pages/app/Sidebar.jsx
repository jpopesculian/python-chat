import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@reactMixin.decorate(Navigation)
class Sidebar extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return <div>Sidebar</div>
  }

}

export default Sidebar
