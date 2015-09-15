import React from 'react'

import {Layout, Container} from 'app/components/layout/system'
import Link from 'app/components/ui/Link'

class RoomItem extends React.Component {

  static propTypes = {
    name: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }


  render() {
    let {name} = this.props
    return (
      <Layout>
        <Container>
          <Link to={`/messages/${name}`}>{name}</Link>
        </Container>
      </Layout>
    )
  }

}

export default RoomItem
