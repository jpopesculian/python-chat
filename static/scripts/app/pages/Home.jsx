import React from 'react'
import Rx from 'rx'
import Http from 'app/services/Http'
import RxSubject from 'app/services/RxSubject'
import UserStore from 'app/stores/User'

class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let { seconds } = this.state
    return (
      <div>
        <button onClick={this._buttonClickStream}>{seconds}</button>
      </div>
    );
  }

  componentWillMount() {
    this._buttonClickStream = RxSubject.create()
    this._buttonClickStream.subscribe((event) => console.log(event))
    Rx.Observable.interval(1000).startWith(0).subscribe((seconds) => this.setState({seconds}))
  }
}

export default Home
