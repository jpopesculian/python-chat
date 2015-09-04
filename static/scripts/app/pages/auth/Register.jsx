import React from 'react'
import Rx from 'rx'
import Immutable from 'immutable'
import validator from 'validator'

import ReactSubject from 'app/services/ReactSubject'
import Http from 'app/services/Http'

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

    let userValues = this._usernameFieldStream.map((event) => event.target.value)
    userValues.subscribe((value) => {
      this._formValues = this._formValues.set('username', value)
    })
    userValues.debounce(300).subscribe(this._validateUsername.bind(this))

    this._formSubmitStream
      .map((event) => {
        event.preventDefault()
        return false
      })
      .filter(this._validateForm.bind(this))
      .flatMap(() => {
        let data = this._formValues.toObject()
        return Http.get('/test')
      })
      .subscribe(
        (success) => {
          console.log(response)
        },
        (error) => {

        })
  }

  _validateForm() {
    let valid = true
    valid = valid ? this._validateUsername(this._formValues.get('username')) : false
    return valid
  }

  _validateUsername(username) {
    let error = ''
    if (!username) {
      error = 'Username Required'
    } else if (username.length < 3) {
      error = 'Username must be 3 characters long'
    }
    this.setState({form: this.state.form.set('usernameError', error)})
    return !error
  }

}

export default Register
