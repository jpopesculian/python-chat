import React from 'react'
import Immutable from 'immutable'
import {Navigation} from 'react-router'
import reactMixin from 'react-mixin'

import { initiateStreams, disposeStreams } from 'app/services/ReactSubject'
import Http from 'app/services/Http'
import {extractTargetValue} from 'app/services/Utils'

import TextField from 'app/components/ui/TextField'
import Button from 'app/components/ui/Button'
import Form from 'app/components/ui/Form'

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
    this.streams = initiateStreams('identifierField', 'passwordField', 'formSubmit')

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
        (response) => {
          console.log(response)
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
    this.streams = disposeStreams(this.streams)
  }

  render() {
    let {form} = this.state
    return (
      <Form onSubmit={this.streams.get('formSubmit')}>
        <TextField
          error={form.get('identifierError')}
          label="identifier"
          onChange={this.streams.get('identifierField')}
          ref="identifierField"
          type="text"
        />
        <TextField
          error={form.get('passwordError')}
          label="password"
          onChange={this.streams.get('passwordField')}
          ref="passwordField"
          type={form.get('passwordHidden') ? 'password' : 'text'}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  }

}

export default Login
