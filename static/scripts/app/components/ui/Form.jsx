import React from 'react';

class Form extends React.Component {
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
