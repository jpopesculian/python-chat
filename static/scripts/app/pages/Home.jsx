import React from 'react';
import Socket from 'app/services/Socket';

class Home extends React.Component {

    constructor(props) {
        super(props)
        Socket.emit('some event')
    }

    render() {
        return (
            <div>
                <h1>Hello!</h1>
            </div>
        );
    }
}

export default Home
