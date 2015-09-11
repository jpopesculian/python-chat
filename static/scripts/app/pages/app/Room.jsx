import React from 'react'
import Radium from 'radium'

import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'

@Radium
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
