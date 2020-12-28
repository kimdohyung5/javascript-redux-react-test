import reducer from "./reducer";

function createStore(reducer) {
    let state;

    const listeners = [];
    function dispatch(action) {
        state = reducer( state, action );
        listeners.forEach( listener => listener() )
    }
             
    function subscribe( listener ) {
        listeners.push( listener );
    }

    function getState() {
        return state;
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore(reducer);