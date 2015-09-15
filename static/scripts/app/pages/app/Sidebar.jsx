import React from 'react'
import Radium from 'radium'
import Immutable from 'immutable'

import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { Layout, Container } from 'app/components/layout/system'
import NewRoomForm from 'app/components/forms/NewRoom'
import RoomList from 'app/components/modules/RoomList'

@Radium
@reactMixin.decorate(Navigation)
class Sidebar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: Immutable.Map()
    }
    this._formValues = Immutable.Map()
  }


  render() {
    return (
      <Layout align={"stretch"} height={"full"} kind={"column"} style={{background: '#DDD'}}>
        <Container push={'.5em'} span={"none"}>
          <NewRoomForm />
        </Container>
        <Container push={'.5em'}>
          <RoomList/>
        </Container>
      </Layout>
    )
  }

}

export default Sidebar
