import React from 'react'
import Radium from 'radium'
import Immutable from 'immutable'

import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import { Layout, Container } from 'app/components/layout/system'
import StreamMap from 'app/services/stream-map'
import NewChannelForm from 'app/components/forms/NewChannel'

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

  componentWillMount() {
    this.streams = new StreamMap('newChannelSubmit')
    this.streams.get('newChannelSubmit')
      .subscribe((data) => {
        console.log(data)
      })
  }

  componentWillUnmount() {
    this.streams.dispose()
  }

  render() {
    return (
      <Layout align={"stretch"} height={"full"} kind={"column"} style={{background: '#DDD'}}>
        <Container push={'.5em'} span={"none"}>
          <NewChannelForm onSuccess={this.streams.get('newChannelSubmit')}/>
        </Container>
        <Container push={'.5em'} />
      </Layout>
    )
  }

}

export default Sidebar
