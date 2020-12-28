

const func = state => next => action => {
    if( typeof action === "function") {
        action( state.getState, state.dispatch);
    } else {
        next(action);
    }
}
export default func;