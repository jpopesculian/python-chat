import React from 'react'
import reactMixin from 'react-mixin'
import Immutable from 'immutable'
import { Navigation } from 'react-router'
import {Container, Layout} from 'app/components/layout/system'
import Http from 'app/services/http'
import UserStore from 'app/stores/User'

@reactMixin.decorate(Navigation)
class App extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    Http.get('/api/v1/auth/who')
      .subscribe((response) => {
        if (Http.isOk(response)) {
          let user = Immutable.Map(response.get('body'))
          return UserStore.set('current', user)
        }
        this.transitionTo('/login')
      })
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
