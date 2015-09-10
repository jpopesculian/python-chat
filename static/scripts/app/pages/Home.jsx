import React from 'react'
import reactMixin from 'react-mixin'
import { Navigation } from 'react-router'
import {Layout, Container} from 'app/components/layout/system'

@reactMixin.decorate(Navigation)
class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout height={{xs: 'full', md: 'auto'}} kind='column'/>
    )
  }

}

export default Home
