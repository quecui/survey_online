import actionType from '../../constants/ActionTypes'
import surveyAjax from '../../ajax/survey'
import {showErrorMsg, showSuccessMsg} from '../notification/notificationAction'

export function setShowSignInForm(flag) {
    return {type: actionType.SET_SHOW_SIGNIN_FORM, flag}
}

export function register(data) {
    return function (dispatch) {
        surveyAjax.register(data).then(function(response) {
            alert('SignUp Successfully')
        }, function(error) {
            dispatch(setShowSignInForm(true))
            alert('Account exist. Please signup again')
        })
    }
}


