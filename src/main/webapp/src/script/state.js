var LoggedIn = "LOGGED_IN";
var LoggedOut = "LOGGED_OUT";

function emit(store, type, data) {
    var action = {
        type: type
    };

    console.warn("STATE SET " + action.type)
    store.dispatch(action);
}

function get(store) {
    console.warn("STATE GET " + store.getState())
    return store.getState();
}

module.exports = {
    LoggedIn: LoggedIn,
    LoggedOut: LoggedOut,
    emit: emit,
    get: get
}