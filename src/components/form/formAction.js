import actionType from '../../constants/ActionTypes'

export function showUsernameInHeader(username) {
    return { type: actionType.SHOW_USERNAME, username}
}

export function signIn(data) {
    return function (dispatch) {
        dispatch(showUsernameInHeader(data.name))
        localStorage.setItem('userToken','123213')
    }
}

export function getUsernameByToken(token) {
    return function (dispatch) {
        dispatch(showUsernameInHeader('StormSpirit'))
    }
}

