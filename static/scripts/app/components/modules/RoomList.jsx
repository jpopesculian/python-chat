import React from 'react'
import Immutable from 'immutable'

import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import Socket from 'app/services/socket'
import RoomStore from 'app/stores/room'
import {Layout, Container} from 'app/components/layout/system'

class NewRoomForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      messages: Immutable.List()
    }
  }

  componentWillMount() {
    this.streams = new StreamMap()
    RoomStore.values('list').subscribe((messages) => this.setState({messages}))

    Http.get('/api/v1/rooms')
      .subscribe((response) => {
        if (Http.isOk(response)) {
          let rooms = Immutable.List(response.get('body'))
          RoomStore.set('list', rooms)
        }
      })
    Socket.on('new room')
      .subscribe(::console.log)
  }

  componentWillUnmount() {
    this.streams.dispose()
  }


  render() {
    return (
      <Layout>
        <Container>
          <h1>Channels</h1>
        </Container>
      </Layout>
    )
  }

}

export default NewRoomForm
