import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function surveyReducers (surveyList = initialState.surveyList, action) {
    switch (action.type) {
        case actionType.CREATE_NEW_SURVEY:
            return [...surveyList, action.data]
        case actionType.DELETE_SURVEY:
            return surveyList.filter((survey, index) => index !== action.index)
        case actionType.SHOW_SURVEY_LIST:
            return action.surveyList
        case actionType.CHANGE_ACTIVE_SURVEY: {
            const tmp = surveyList[action.index]
            tmp.active = action.flag

            const first = [...surveyList.slice(0, action.index), tmp]
            const second = surveyList.slice(action.index + 1)
            return [...first, ...second]
        }
        default:
            return surveyList
    }
}
