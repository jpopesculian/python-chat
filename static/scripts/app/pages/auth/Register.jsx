import React from 'react'
import Immutable from 'immutable'
import {Navigation} from 'react-router'
import reactMixin from 'react-mixin'

import ReactSubject from 'app/services/ReactSubject'
import Http from 'app/services/Http'
import {extractTargetValue, isEmail} from 'app/services/Utils'

import TextField from 'app/components/ui/TextField'
import Button from 'app/components/ui/Button'
import Form from 'app/components/ui/Form'

@reactMixin.decorate(Navigation)
class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: Immutable.Map({
        usernameError: '',
        emailError: '',
        passwordError: '',
        passwordHidden: true
      })
    }
    this._formValues = Immutable.Map()
  }

  componentWillMount() {
    this._usernameFieldStream = ReactSubject.create()
    this._emailFieldStream = ReactSubject.create()
    this._passwordFieldStream = ReactSubject.create()
    this._formSubmitStream = ReactSubject.create()

    let userValues = this._usernameFieldStream.map(extractTargetValue)
    userValues.subscribe((value) => {
      this._formValues = this._formValues.set('username', value)
    })
    userValues.debounce(300)
      .map(this._validateUsername.bind(this))
      .subscribe((error) => this.setState({form: this.state.form.set('usernameError', error)}))

    let emailValues = this._emailFieldStream.map(extractTargetValue)
    emailValues.subscribe((value) => {
      this._formValues = this._formValues.set('email', value)
    })
    emailValues.debounce(300)
      .map(this._validateEmail.bind(this))
      .subscribe((error) => this.setState({form: this.state.form.set('emailError', error)}))

    let passwordValues = this._passwordFieldStream.map(extractTargetValue)
    passwordValues.subscribe((value) => {
      this._formValues = this._formValues.set('password', value)
    })
    passwordValues.debounce(300)
      .map(this._validatePassword.bind(this))
      .subscribe((error) => this.setState({form: this.state.form.set('passwordError', error)}))

    this._formSubmitStream
      .map((event) => {
        event.preventDefault()
        return false
      })
      .filter(this._validateForm.bind(this))
      .flatMap(() => {
        let data = this._formValues.toObject()
        return Http.post('/api/v1/auth/local/register', data)
      })
      .subscribe(
        (response) => {
          console.log(response)
        },
        (error) => {
          let code = error.body.error
          let errorMessage = ''
          switch (code) {
          case 'user_exists':
            errorMessage = 'Username or Email already exists'
            this.setState({form: this.state.form.set('usernameError', errorMessage)})
            break
          case 'invalid_password':
            errorMessage = 'Password Invalid'
            this.setState({form: this.state.form.set('passwordError', errorMessage)})
            break
          default:
            errorMessage = 'User could not be created'
            this.setState({form: this.state.form.set('usernameError', errorMessage)})
          }
        })
  }

  componentWillUnmount() {
    this._usernameFieldStream.dispose()
    this._emailFieldStream.dispose()
    this._passwordFieldStream.dispose()
    this._formSubmitStream.dispose()
  }

  _validateForm() {
    let usernameError = this._validateUsername(this._formValues.get('username'))
    let emailError = this._validateEmail(this._formValues.get('email'))
    let passwordError = this._validatePassword(this._formValues.get('password'))
    let formErrors = this.state.form
      .set('usernameError', usernameError)
      .set('emailError', emailError)
      .set('passwordError', passwordError)
    this.setState({form: formErrors })
    return !usernameError && !emailError && !passwordError
  }

  _validateUsername(username) {
    let error = ''
    let usernameRe = /^[a-zA-Z0-9][a-zA-Z0-9_\-+\.]*[a-zA-Z0-9]$/
    if (!username) {
      error = 'Required'
    } else if (username.length < 3) {
      error = 'Must be at least 3 characters long'
    } else if (username.length > 64) {
      error = 'Must be less than 64 characters long'
    } else if (!usernameRe.test(username)) {
      error = 'May only contain numbers, letters and + . - or _'
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
      <Form onSubmit={this._formSubmitStream}>
        <TextField
          error={form.get('usernameError')}
          label="username"
          onChange={this._usernameFieldStream}
          ref="usernameField"
          type="text"
        />
        <TextField
          error={form.get('emailError')}
          label="email"
          onChange={this._emailFieldStream}
          ref="emailField"
          type="email"
        />
        <TextField
          error={form.get('passwordError')}
          label="password"
          onChange={this._passwordFieldStream}
          ref="passwordField"
          type={form.get('passwordHidden') ? 'password' : 'text'}
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  }

}

export default Register
