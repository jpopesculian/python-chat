import React from 'react'
import ReactSubject from 'app/services/ReactSubject'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@reactMixin.decorate(Navigation)
class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this._buttonClickStream = ReactSubject.create()
    this._buttonClickStream.subscribe(() => {
      this.transitionTo('/register')
    })
  }

  componentWillUnmount() {
    this._buttonClickStream.dispose()
  }

  render() {
    return (
      <div>
        <button onClick={this._buttonClickStream}>Transition</button>
      </div>
    )
  }

}

export default Home
