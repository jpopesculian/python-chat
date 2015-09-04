import React from 'react';

class Submit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button {...this.props} className={className} type="submit">{this.props.children}</button>
    )
  }
}

export default Submit
