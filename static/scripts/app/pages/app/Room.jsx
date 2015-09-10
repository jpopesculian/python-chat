import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@reactMixin.decorate(Navigation)
class Room extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return <div>Room</div>
  }

}

export default Room
