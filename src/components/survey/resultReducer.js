import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function resultReducer (result = initialState.result, action) {
    switch (action.type) {
        case actionType.SHOW_RESULT:
            return action.data
        default:
            return result
    }
}
