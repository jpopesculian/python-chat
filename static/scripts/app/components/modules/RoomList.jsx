import React from 'react'
import Immutable from 'immutable'

import StreamMap from 'app/services/stream-map'
import Http from 'app/services/http'
import Socket from 'app/services/socket'
import RoomStore from 'app/stores/room'
import RoomItem from './RoomItem'
import {Layout, Container} from 'app/components/layout/system'

class RoomList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: Immutable.List()
    }
  }

  componentWillMount() {
    this.streams = new StreamMap()
    RoomStore.values('list').subscribe((rooms) => this.setState({rooms}))

    Http.get('/api/v1/rooms')
      .subscribe((response) => {
        if (Http.isOk(response)) {
          let rooms = Immutable.List(response.get('body'))
          RoomStore.set('list', rooms)
        }
      })
    let newRooms = Socket.on('new room')
      .filter(Socket.isOk)
      .map((response) => response.get('data'))
      .subscribe((room) => RoomStore.update('list', 'add', room))
    this.streams.set('newRooms', newRooms)
  }

  componentWillUnmount() {
    this.streams.dispose()
  }


  render() {
    let rooms = this.state.rooms.map((room) => {
      return (<RoomItem {...room}/>)
    })
    return (
      <Layout>
        <Container>
          {{rooms}}
        </Container>
      </Layout>
    )
  }

}

export default RoomList
