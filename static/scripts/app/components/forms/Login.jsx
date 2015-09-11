import React from 'react'
import Immutable from 'immutable'

import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import {extractTargetValue, preventDefault} from 'app/services/utils'

import TextField from 'app/components/ui/TextField'
import Form from 'app/components/ui/Form'

class LoginForm extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    onSuccess: React.PropTypes.func
  }

  static defaultProps = {
    onSuccess: () => {}
  }

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
      .map(preventDefault)
      .flatMap(() => {
        let data = this._formValues.toObject()
        return Http.post('/api/v1/auth/local', data)
      })
      .subscribe(
        (response) => {
          if (Http.isOk(response)) {
            return this.props.onSuccess(response)
          }
          let code = response.get('body').error
          return this._handleFormError(code)
        })
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  _handleFormError(code) {
    let field = ''
    let message = ''
    switch (code) {
    case 'password_wrong':
      field = 'password'
      message = 'Wrong Password'
      break
    default:
      field = 'identifier'
      message = 'User not registered'
    }
    this.setState({form: this.state.form.set(`${field}Error`, message)})
    return false
  }

  render() {
    let {form} = this.state
    return (
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
        {this.props.children}
      </Form>
    )
  }

}

export default LoginForm
