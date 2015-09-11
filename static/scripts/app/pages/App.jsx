import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import {Container, Layout} from 'app/components/layout/system'

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
      <Layout align={'stretch'} height={'view'}>
        <Container span={'16em'}>
          {this.props.children.sidebar}
        </Container>
        <Container>
          {this.props.children.main}
        </Container>
      </Layout>
    )
  }

}

export default App
