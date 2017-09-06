import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateContent from '../actions/update_content';

class App extends Component {

    componentDidMount() {
        this.props.updateContent('This message is being applied by the client once the app was served to the browser and React kicked in. Check the source code to see what\'s been rendered by the server side.');
    }

    render() {
        return (
            <div>
                {this.props.content}
            </div>
        )
    }

}

function mapStateToProps({ content }) {
    return {
        content
    }
}

export default connect(mapStateToProps, { updateContent })(App);
