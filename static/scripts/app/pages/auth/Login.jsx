import React from 'react'
import Immutable from 'immutable'
import {Navigation} from 'react-router'
import reactMixin from 'react-mixin'

import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import {extractTargetValue} from 'app/services/utils'

import {Layout, Container} from 'app/components/layout/system'
import TextField from 'app/components/ui/TextField'
import Button from 'app/components/ui/Button'
import Form from 'app/components/ui/Form'
import Anchor from 'app/components/ui/Anchor'

@reactMixin.decorate(Navigation)
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: Immutable.Map({
        passwordHidden: true
      })
    }
    this._formValues = Immutable.Map()
  }

  componentWillMount() {
    this.streams = new StreamMap('identifierField', 'passwordField', 'formSubmit')

    let identifierValues = this.streams.get('identifierField').map(extractTargetValue)
    identifierValues.subscribe((value) => {
      this._formValues = this._formValues.set('identifier', value)
    })

    let passwordValues = this.streams.get('passwordField').map(extractTargetValue)
    passwordValues.subscribe((value) => {
      this._formValues = this._formValues.set('password', value)
    })

    this.streams.get('formSubmit')
      .map((event) => {
        event.preventDefault()
        return false
      })
      .flatMap(() => {
        let data = this._formValues.toObject()
        return Http.post('/api/v1/auth/local', data)
      })
      .subscribe(
        () => {
          this.transitionTo('/messages')
        },
        (error) => {
          let code = error.body.error
          let errorMessage = ''
          switch (code) {
          case 'password_wrong':
            errorMessage = 'Wrong Password'
            this.setState({form: this.state.form.set('passwordError', errorMessage)})
            break
          default:
            errorMessage = 'User not registered'
            this.setState({form: this.state.form.set('identifierError', errorMessage)})
          }
        })
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  render() {
    let {form} = this.state
    return (
      <Layout height="full" align="center" justify="center">
        <Container span={{xs: 0.9, sm: 2 / 3, md: 1 / 3}}>
          <Form onSubmit={this.streams.get('formSubmit')}>
            <TextField
              error={form.get('identifierError')}
              onChange={this.streams.get('identifierField')}
              placeholder="username or email"
              ref="identifierField"
              type="text"
            />
            <TextField
              error={form.get('passwordError')}
              onChange={this.streams.get('passwordField')}
              placeholder="password"
              ref="passwordField"
              type={form.get('passwordHidden') ? 'password' : 'text'}
            />
            <Layout align={'center'}>
              <Container order={2} span={'none'}>
                <Button type="submit">Submit</Button>
              </Container>
              <Container order={1} push={{right: 'auto'}}>
                <Anchor to="/register">Register</Anchor>
              </Container>
            </Layout>
          </Form>
        </Container>
      </Layout>
    )
  }

}

export default Login
