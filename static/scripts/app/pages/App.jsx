import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import Rx from 'rx'
import StreamMap from 'app/services/stream-map'

@reactMixin.decorate(Navigation)
class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.streams = new StreamMap('buttonClick', 'another')
    this.streams.get('buttonClick').subscribe(() => {
      this.transitionTo('/register')
    })
    let secondStream = Rx.Observable.interval(500).startWith(0)
      .subscribe((s) => this.setState({count: s}))
    this.streams = this.streams.set('seconds', secondStream)
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  render() {
    return (
      <div>
        <button onClick={this.streams.get('buttonClick')}>Transition {this.state.count}</button>
      </div>
    )
  }

}

export default App
