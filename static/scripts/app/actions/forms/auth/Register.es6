import alt from 'app/alt'
import http from 'app/services/Http'

class AuthRegisterFormActions {

  updateUsername(username) {
    this.dispatch(username);
    // setTimeout(this.actions.validateUsername.bind(this, username), 300)
  }

  validateUsername(username) {
    this.dispatch(username);
  }


  updatePassword(password) {
    this.dispatch(password);
    // setTimeout(this.actions.validatePassword.bind(this, password), 300)
  }

  validatePassword(password) {
    this.dispatch(password);
  }

  updatePasswordRepeat(password) {
    this.dispatch(password);
    setTimeout(this.actions.validatePasswordRepeat.bind(this, password), 300)
  }

  validatePasswordRepeat(password) {
    this.dispatch(password);
  }

  submit(form) {
    http.post('api/register', form)
      .then((res) => {
        console.log(res)
        // this.actions.success(res)
      }, (error) => {
        console.log(error)
        this.actions.error(error)
      });
    this.dispatch(form);
  }

  success(user) {
    this.dispatch(user);
  }

  error(error) {
    this.dispatch(error);
  }

}

export default alt.createActions(AuthRegisterFormActions);
