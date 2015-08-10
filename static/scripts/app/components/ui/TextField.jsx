import React from 'react';

class TextField extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <input {...this.props} />
        <div className="textfield-error">
          {this.props.error}
        </div>
      </div>
    )
  }
}

export default TextField
