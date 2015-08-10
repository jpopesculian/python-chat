import React from 'react';

import ReactRouter from 'react-router';
var { RouteHandler } = ReactRouter;
import router from 'app/router';


class App extends React.Component {

    constructor(props) {
      super(props)
    }

    render() {
      return (
        <div id="app-container">
          {this.props.children}
        </div>
      );
    }

}

export default App
