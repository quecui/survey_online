import actionType from '../../constants/ActionTypes'
import surveyAjax from '../../ajax/survey'

export function showUsernameInHeader(username) {
    return { type: actionType.SHOW_USERNAME, username}
}

export function signIn(data) {
    return function (dispatch) {
        surveyAjax.login(data).then(function (res) {
            dispatch(showUsernameInHeader(res.data.dataReq.username))
            alert('SignIn Successfully')
            localStorage.setItem('token', res.data.dataReq.token)
        }, function (err) {
            alert("Account doesn't exist")
        })
    }
}

export function getUsernameByToken(data) {
    return function (dispatch) {
        surveyAjax.getUsernameByToken(data).then(function (res) {
            dispatch(showUsernameInHeader(res.data.dataReq.username))
        }, function (err) {
            dispatch(showUsernameInHeader(''))
            localStorage.clear()
        })
    }
}

