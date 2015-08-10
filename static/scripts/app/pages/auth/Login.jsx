import React from 'react'
import router from 'app/router'

import AuthLoginFormActions from 'app/actions/forms/auth/Login'
import AuthLoginFormStore from 'app/stores/forms/auth/Login'

import {TextField} from 'app/components/Ui'

class AuthLogin extends React.Component {

    constructor(props) {
        super(props)
        this.state = { form: AuthLoginFormStore.getState() }
        this.listeners = {
          AuthLoginForm: this.onFormUpdate.bind(this)
        }
    }

    doActionOnField(actionName, field) {
      let fieldName = field.charAt(0).toUpperCase() + field.slice(1)
      let action = AuthRegisterFormActions[actionName + fieldName]
      return (event) => action(event.currentTarget.value)
    }

    updateField(field) { return this.doActionOnField('update', field) }


    submit(event) {
      event.preventDefault()
      let { form } = this.state
      let data = AuthLoginFormStore.extractValues(form)
      AuthLoginFormActions.submit(data)
    }

    onFormUpdate() {
      let form = AuthLoginFormStore.getState()
      if (form.meta.submitted) {
        // router.transitionTo('app.profile')
      }
      this.setState({ form: form })
    }

    render() {
      return (
        <div>
          <h1>Login</h1>
          <TextField placeholder="Username" onChange={this.updateField('username')}/>
          <TextField placeholder="Password" onChange={this.updateField('password')} />
          <a onClick={this.submit.bind(this)}>Submit</a>
        </div>
      )
    }

    componentWillMount() {
      AuthLoginFormStore.listen(this.listeners.AuthLoginForm)
    }

    componentWillUnmount() {
      AuthLoginFormStore.unlisten(this.listeners.AuthLoginForm)
    }
}

export default AuthLogin
