import { createContext, useReducer } from "react"

const initialState = {
    count: 0
}

export const Context = createContext()

const reducer = (state = initialState, action) => {
    const {type, payload} = action
    console.log(type);

    switch(type){
        case "INCREASE":
            return {...state, count: state.count + 1}
        case "DECREASE":
            return {...state, count:state.count - 1}
        default:
            return {state}
    }
}

const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
}

export default Provider