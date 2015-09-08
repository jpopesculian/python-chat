import React from 'react'
import Rx from 'rx'
import Immutable from 'immutable'
import validator from 'validator'

import ReactSubject from 'app/services/ReactSubject'
import Http from 'app/services/Http'
import Utils from 'app/services/Utils'

import TextField from 'app/components/ui/TextField'
import Button from 'app/components/ui/Button'
import Form from 'app/components/ui/Form'

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

  render() {
    let {form} = this.state
    return (
      <Form onSubmit={this._formSubmitStream}>
        <TextField label="username"
          type="text"
          onChange={this._usernameFieldStream}
          error={form.get('usernameError')}
          ref="usernameField"
          />
        <TextField label="email"
          type="email"
          onChange={this._emailFieldStream}
          error={form.get('emailError')}
          ref="emailField"
        />
        <TextField label="password"
          type={this.state.passwordHidden ? 'password' : 'text'}
          onChange={this._passwordFieldStream}
          error={form.get('passwordError')}
          ref="passwordField"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }

  componentWillMount() {
    this._registerButtonClickStream = ReactSubject.create()
    this._usernameFieldStream = ReactSubject.create()
    this._emailFieldStream = ReactSubject.create()
    this._passwordFieldStream = ReactSubject.create()
    this._formSubmitStream = ReactSubject.create()

    let userValues = this._usernameFieldStream.map(Utils.extractTargetValue)
    userValues.subscribe((value) => {
      this._formValues = this._formValues.set('username', value)
    })
    userValues.debounce(300).subscribe(this._validateUsername.bind(this))

    let emailValues = this._emailFieldStream.map(Utils.extractTargetValue)
    emailValues.subscribe((value) => {
      this._formValues = this._formValues.set('email', value)
    })
    emailValues.debounce(300).subscribe(this._validateEmail.bind(this))

    let passwordValues = this._passwordFieldStream.map(Utils.extractTargetValue)
    passwordValues.subscribe((value) => {
      this._formValues = this._formValues.set('password', value)
    })
    passwordValues.debounce(300).subscribe(this._validatePassword.bind(this))

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
          console.error(error)
        })
  }

  _validateForm() {
    let valid = true
    valid = Utils.AND(this._validateUsername(this._formValues.get('username')), valid)
    valid = Utils.AND(this._validateEmail(this._formValues.get('email')), valid)
    valid = Utils.AND(this._validatePassword(this._formValues.get('password')), valid)
    return valid
  }

  _validateUsername(username) {
    let error = ''
    let username_re = /^[a-zA-Z0-9][a-zA-Z0-9_\-+\.]*[a-zA-Z0-9]$/
    if (!username) {
      error = 'Required'
    } else if (username.length < 3) {
      error = 'Must be at least 3 characters long'
    } else if (username.length > 64) {
      error = "Must be less than 64 characters long"
    } else if (!username_re.test(username)) {
      error = 'May only contain numbers, letters and + . - or _'
    }
    this.setState({form: this.state.form.set('usernameError', error)})
    return !error
  }

  _validateEmail(email) {
    let error = ''
    if (!email) {
      error = 'Required'
    } else if (!Utils.isEmail(email)) {
      error = 'Must be a valid email address'
    }
    this.setState({form: this.state.form.set('emailError', error)})
    return !error
  }

  _validatePassword(password) {
    let error = ''
    if (!password) {
      password = 'Required'
    } if (password.length < 5) {
      error = 'Must be at least 5 characters long'
    } else if (password.length > 64) {
      error = "Must be less than 64 characters long"
    }
    this.setState({form: this.state.form.set('passwordError', error)})
    return !error
  }

}

export default Register
