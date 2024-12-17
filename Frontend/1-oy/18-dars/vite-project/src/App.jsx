import React from "react";
import Counter from "./Counter";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            products: null,
        };
    }

    Increment = () => {
        this.setState({ count: this.state.count + 1 });
    };
    Decrement = () => {
        this.setState({ count: this.state.count - 1 });
    };

    render() {
        return (
            <div>
                <h1>Class App</h1>
                <Counter
                    count={this.state.count}
                    decrement={this.Decrement}
                    increment={this.Increment}
                />
            </div>
        );
    }
}
export default App;
