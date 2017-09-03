var LoggedIn = "LOGGED_IN";
var LoggedOut = "LOGGED_OUT";

function emit(store, type, data) {
    var action = {
        type: type
    };

    store.dispatch(action);
}

function get(store) {
    return store.getState();
}

module.exports = {
    LoggedIn: LoggedIn,
    LoggedOut: LoggedOut,
    emit: emit,
    get: get
}