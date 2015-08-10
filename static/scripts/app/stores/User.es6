import alt from 'app/alt'
import UserActions from 'app/actions/User'

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.user = {}
  }

  onAuthenticateUser(user) {
    this.user = user
  }

  onNoUser(error) {
    this.user = {}
  }

}

export default alt.createStore(UserStore);
