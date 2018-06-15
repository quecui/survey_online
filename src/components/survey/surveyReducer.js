import initialState from '../../initialState'
import actionType from '../../constants/ActionTypes'

export default function surveyReducer (survey = initialState.survey, action) {
    switch (action.type) {
        default:
            return survey
    }
}
