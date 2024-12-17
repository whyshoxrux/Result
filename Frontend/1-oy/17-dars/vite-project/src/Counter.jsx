import { useContext } from "react";
import { Context } from "./Context";

const Counter = () => {
    const { state, dispatch } = useContext(Context);

    return (
        <div>
            <h2>{state.count}</h2>
            <button onClick={() => dispatch({ type: "INCREASE" })}>
                Increase
            </button>
            <button onClick={() => dispatch({ type: "DECREASE" })}>
                Decrease
            </button>
            </div>
    );
};

export default Counter;
