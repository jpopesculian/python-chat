import React from 'react'

class Form extends React.Component {

  static propTypes = {
    children: React.PropTypes.node
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <form {...this.props}>
        {this.props.children}
      </form>
    )
  }
}

export default Form
