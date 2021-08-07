import React, { Component } from 'react';

class Counter extends Component {

    constructor() {
        super();

        this.state = {
            count : 0
        }
    }

    incrementBy1 = () => {
        const { count: currentCount } = this.state;
        this.setState({
            count : currentCount + 1
        }, () => {
            console.log(this.state.count)
        });
    }

    render() {
        const { count } = this.state

        return (
            <div>
                <h1>Counter : {count}</h1>
                <button onClick = {this.incrementBy1}>Increment By One</button>
            </div>
        )
    }
}


export default Counter;