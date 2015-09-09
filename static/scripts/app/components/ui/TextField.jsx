import React from 'react'

class TextField extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
    error: React.PropTypes.string,
    label: React.PropTypes.string
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <label>{this.props.label}</label>
        <input {...this.props} />
        <div className="textfield-error">
          {this.props.error}
        </div>
      </div>
    )
  }
}

export default TextField
