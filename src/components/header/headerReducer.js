import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function headerReducer (header = initialState.header, action) {
    switch (action.type) {
        case actionType.SHOW_USERNAME:
            return Object.assign({}, header, {username: action.username})
        case actionType.SET_SHOW_SIGNIN_FORM:
            return Object.assign({}, header, {login: action.flag})
        case actionType.SET_SHOW_SIGNUP_FORM:
            return Object.assign({}, header, {register: action.flag})
        case actionType.CHANGE_VIEW_SURVEY:
            return Object.assign({}, header, {changeView: action.data})
        case actionType.SET_SHOW_MODAL_URL:
            return Object.assign({}, header, {showUrl: action.flag})
        case actionType.SHOW_SURVEY_LINK:
            return Object.assign({}, header, {link: action.link})
        default:
            return header
    }
}
