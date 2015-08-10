import React from 'react'
import router from 'app/router'

import AuthRegisterFormActions from 'app/actions/forms/auth/Register'
import AuthRegisterFormStore from 'app/stores/forms/auth/Register'

import {TextField, Form, Submit} from 'app/components/Ui'

class AuthRegister extends React.Component {

    constructor(props) {
        super(props)
        this.state = { form: AuthRegisterFormStore.getState() }
        this.listeners = {
          AuthRegisterForm: this.onFormUpdate.bind(this)
        }
    }

    doActionOnField(actionName, field) {
      let fieldName = field.charAt(0).toUpperCase() + field.slice(1)
      let action = AuthRegisterFormActions[actionName + fieldName]
      return (event) => action(event.currentTarget.value)
    }

    updateField(field) { return this.doActionOnField('update', field) }

    validateField(field) { return this.doActionOnField('validate', field) }


    submit(event) {
      event.preventDefault()
      let { form } = this.state
      if (AuthRegisterFormStore.isValidForm(form)) {
        let data = AuthRegisterFormStore.extractValues(form)
        AuthRegisterFormActions.submit(data)
      }
    }

    onFormUpdate() {
      let form = AuthRegisterFormStore.getState()
      if (form.meta.submitted) {
        router.transitionTo('app.survey')
      }
      this.setState({ form: form })
    }

    render() {
      let form = this.state.form
      return (
        <div>
          <h1>Register</h1>
          <Form error={form.meta.error} onSubmit={this.submit.bind(this)}>
            <TextField placeholder="Username"
              onChange={this.updateField('username')}
              onBlur={this.validateField('username')}
              error={form.username.error} />
            <TextField placeholder="Password"
              onChange={this.updateField('password')}
              onBlur={this.validateField('password')}
              error={form.password.error} />
            <TextField placeholder="Repeat Password"
              onChange={this.updateField('passwordRepeat')}
              onBlur={this.validateField('passwordRepeat')}
              error={form.passwordRepeat.error} />
            <Submit>Register</Submit>
          </Form>
        </div>
      );
    }

    componentWillMount() {
      AuthRegisterFormStore.listen(this.listeners.AuthRegisterForm)
    }

    componentWillUnmount() {
      AuthRegisterFormStore.unlisten(this.listeners.AuthRegisterForm)
    }
}

export default AuthRegister
