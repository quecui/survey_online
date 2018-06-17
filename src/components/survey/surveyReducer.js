import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function surveyReducer (survey = initialState.survey, action) {
    switch (action.type) {
        case actionType.SHOW_EDIT_SURVEY:
            return action.data
        default:
            return survey
    }
}
