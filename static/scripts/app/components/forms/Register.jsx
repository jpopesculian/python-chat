import React from 'react'
import Immutable from 'immutable'

import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import {extractTargetValue, isEmail, isSlug, preventDefault} from 'app/services/utils'

import TextField from 'app/components/ui/TextField'
import Form from 'app/components/ui/Form'

class Register extends React.Component {

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
    this.streams = new StreamMap('usernameField', 'emailField', 'passwordField', 'formSubmit')

    let userValues = this.streams.get('usernameField').map(extractTargetValue)
    userValues.subscribe((value) => {
      this._formValues = this._formValues.set('username', value)
    })
    userValues.debounce(300)
      .map(::this._validateUsername)
      .subscribe((error) => this.setState({form: this.state.form.set('usernameError', error)}))

    let emailValues = this.streams.get('emailField').map(extractTargetValue)
    emailValues.subscribe((value) => {
      this._formValues = this._formValues.set('email', value)
    })
    emailValues.debounce(300)
      .map(::this._validateEmail)
      .subscribe((error) => this.setState({form: this.state.form.set('emailError', error)}))

    let passwordValues = this.streams.get('passwordField').map(extractTargetValue)
    passwordValues.subscribe((value) => {
      this._formValues = this._formValues.set('password', value)
    })
    passwordValues.debounce(300)
      .map(::this._validatePassword)
      .subscribe((error) => this.setState({form: this.state.form.set('passwordError', error)}))

    this.streams.get('formSubmit')
      .map(preventDefault)
      .filter(::this._validateForm)
      .flatMap(() => {
        let data = this._formValues.toObject()
        return Http.post('/api/v1/auth/local/register', data)
      })
      .subscribe(
        (response) => {
          if (Http.isOk(response)) {
            return this.props.onSuccess(response)
          }
          let code = response.get('body').error
          return this._handleFormError(code)
        }
      )
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  _handleFormError(code) {
    let field = ''
    let message = ''
    switch (code) {
    case 'user_exists':
      field = 'username'
      message = 'Username or Email already exists'
      break
    case 'invalid_password':
      field = 'password'
      message = 'Password Invalid'
      break
    default:
      field = 'username'
      message = 'User could not be created'
    }
    this.setState({form: this.state.form.set(`${field}Error`, message)})
    return false
  }

  _validateForm() {
    let usernameError = this._validateUsername(this._formValues.get('username'))
    let emailError = this._validateEmail(this._formValues.get('email'))
    let passwordError = this._validatePassword(this._formValues.get('password'))
    // let formErrors = this.state.form
    //   .set('usernameError', usernameError)
    //   .set('emailError', emailError)
    //   .set('passwordError', passwordError)
    // this.setState({form: formErrors })
    return !usernameError && !emailError && !passwordError
  }

  _validateUsername(username) {
    let error = ''
    if (!username) {
      error = 'Required'
    } else if (username.length < 3) {
      error = 'Must be at least 3 characters long'
    } else if (username.length > 64) {
      error = 'Must be less than 64 characters long'
    } else if (!isSlug(username)) {
      error = 'Invalid username (no spaces or weird characters)'
    }
    return error
  }

  _validateEmail(email) {
    let error = ''
    if (!email) {
      error = 'Required'
    } else if (!isEmail(email)) {
      error = 'Must be a valid email address'
    }
    return error
  }

  _validatePassword(password) {
    let error = ''
    if (!password) {
      error = 'Required'
    } else if (password.length < 5) {
      error = 'Must be at least 5 characters long'
    } else if (password.length > 64) {
      error = 'Must be less than 64 characters long'
    }
    return error
  }

  render() {
    let {form} = this.state
    return (
      <Form onSubmit={this.streams.get('formSubmit')}>
        <TextField
          error={form.get('usernameError')}
          onChange={this.streams.get('usernameField')}
          placeholder="username"
          ref="usernameField"
          type="text"
        />
        <TextField
          error={form.get('emailError')}
          onChange={this.streams.get('emailField')}
          placeholder="email"
          ref="emailField"
          type="email"
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

export default Register
