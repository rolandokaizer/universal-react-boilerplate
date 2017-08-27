import React, { Component } from 'react';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: 'App'
        }
    }

    componentDidMount() {
        this.setState({
            content: 'New state of app'
        });
    }

    render() {
        return (
            <div>
                {this.state.content}
            </div>
        )
    }
}
