import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@reactMixin.decorate(Navigation)
class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.children.main}
        {this.props.children.sidebar}
      </div>
    )
  }

}

export default App
