import { combineReducers } from 'redux'
import {reducer as notifications} from 'react-notification-system-redux'
import header from '../components/header/headerReducer'
import survey from '../components/survey/surveyReducer'
import surveyList from '../components/survey/surveyReducers'
import result from '../components/survey/resultReducer'

const rootReducer = combineReducers({
    header,
    survey,
    surveyList,
    notifications,
    result
})

export default rootReducer
