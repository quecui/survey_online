import { combineReducers } from 'redux'
import header from '../components/header/headerReducer'
import survey from '../components/survey/surveyReducer'

const rootReducer = combineReducers({
    header,
    survey
})

export default rootReducer
