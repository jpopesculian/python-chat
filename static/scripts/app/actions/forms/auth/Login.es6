import alt from 'app/alt'
import http from 'app/services/Http'

class AuthLoginFormActions {

  updateUsername(username) {
    this.dispatch(username);
  }

  updatePassword(password) {
    this.dispatch(password);
  }

  submit(form) {
    http.post('api/login', form)
      .then((res) => {
        console.log(res)
        // this.actions.success(res)
      }, (error) => {
        console.log(error)
        // this.actions.error(error)
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

export default alt.createActions(AuthLoginFormActions);
