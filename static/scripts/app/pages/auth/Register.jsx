import React from 'react'
import Rx from 'rx'
import Http from 'app/services/Http'
import ReactSubject from 'app/services/ReactSubject'

class Register extends React.Component {

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
    this._buttonClickStream = ReactSubject.create()
    this._buttonClickStream.subscribe((event) => console.log(event))
    Rx.Observable.interval(1000).startWith(0).subscribe((seconds) => this.setState({seconds}))
  }
}

export default Register
