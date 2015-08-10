import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <form {...this.props}>
          {this.props.children}
          <div className="form-error">
            {this.props.error}
          </div>
        </form>
      </div>
    )
  }
}

export default Form
