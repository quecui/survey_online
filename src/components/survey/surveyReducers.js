import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function surveyReducers (surveyList = initialState.surveyList, action) {
    switch (action.type) {
        case actionType.CREATE_NEW_SURVEY:
            return [...surveyList, action.data]
        case actionType.DELETE_SURVEY:
            return surveyList.filter((survey, index) => index !== action.index)
        default:
            return surveyList
    }
}
