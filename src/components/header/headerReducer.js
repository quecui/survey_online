import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function headerReducer (header = initialState.header, action) {
    switch (action.type) {
        case actionType.SHOW_USERNAME:
            return Object.assign({}, header, {username: action.username})
        default:
            return header
    }
}
