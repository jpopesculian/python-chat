import React from 'react'
import {Navigation} from 'react-router'
import reactMixin from 'react-mixin'

import LoginForm from 'app/components/forms/Login'
import StreamMap from 'app/services/stream-map'

import {Layout, Container} from 'app/components/layout/system'
import Button from 'app/components/ui/Button'
import Anchor from 'app/components/ui/Anchor'

@reactMixin.decorate(Navigation)
class Login extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.streams = new StreamMap('formSubmit')
    this.streams.get('formSubmit').subscribe(() => {
      this.transitionTo('/messages')
    })
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  render() {
    return (
      <Layout align="center" height="full"  justify="center">
        <Container span={{xs: 0.9, sm: 2 / 3, md: 1 / 3}}>
          <LoginForm onSuccess={this.streams.get('formSubmit')}>
            <Layout align={'center'}>
              <Container order={2} span={'none'}>
                <Button type="submit">Submit</Button>
              </Container>
              <Container order={1} push={{right: 'auto'}}>
                <Anchor to="/register">Register</Anchor>
              </Container>
            </Layout>
          </LoginForm>
        </Container>
      </Layout>
    )
  }

}

export default Login
