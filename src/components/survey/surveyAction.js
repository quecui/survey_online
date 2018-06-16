import actionType from '../../constants/ActionTypes'

export function addNewSurvey(data) {
    return { type: actionType.CREATE_NEW_SURVEY, data}
}

export function deleteSurvey(index) {
    return {type: actionType.DELETE_SURVEY, index}
}