import alt from 'app/alt'
import AuthLoginFormActions from 'app/actions/forms/auth/Login'

class AuthLoginFormStore {
  constructor() {
    this.bindActions(AuthLoginFormActions);
    let { meta, username, password } = AuthLoginFormStore.initialValues()
    this.meta = meta
    this.username = username
    this.password = password
  }

  static initialValues() {
    return {
      meta: {
        submitted: false,
        valid: true,
        error: '',
        fields: [
          'username',
          'password',
        ]
      },
      username: {
        value: '',
        error: '',
      },
      password: {
        value: '',
        error: '',
      }
    };
  }

  onUpdateUsername(value) {
    let { username } = AuthLoginFormStore.initialValues()
    username.value = value
    this.username = username
  }

  onUpdatePassword(value) {
    let { password } = AuthLoginFormStore.initialValues()
    password.value = value
    this.password = password
  }

  onSubmit() {
    this.meta.sending = true
  }

  onSuccess(user) {
    this.meta.sending = false
    this.meta.submitted = true
  }

  onError(error) {
    this.meta.sending = false
    if (!error) {
      this.username.help = 'Username not found!'
      this.username.valid = false
      this.username.editing = false
    } else {
      this.password.help = 'Password incorrect!'
      this.password.valid = false
      this.username.editing = false
    }
  }

  static extractValues(form) {
    let values = {}
    for (let field of form.meta.fields) {
      values[field] = form[field].value
    }
    return values
  }

}

export default alt.createStore(AuthLoginFormStore);
