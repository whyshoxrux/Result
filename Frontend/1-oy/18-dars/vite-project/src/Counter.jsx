import React from "react";

class Counter extends React.Component {
    render() {
        const { count, increment, decrement } = this.props;

        return (
            <div>
                <h2>Counter Component</h2>
                <p>Count: {count}</p>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        );
    }
}

export default Counter; 
