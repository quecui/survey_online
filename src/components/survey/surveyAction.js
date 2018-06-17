import actionType from '../../constants/ActionTypes'
import surveyAjax from '../../ajax/survey'

export function addNewSurvey(data) {
    return { type: actionType.CREATE_NEW_SURVEY, data}
}

export function deleteSurvey(index) {
    return {type: actionType.DELETE_SURVEY, index}
}

export function showSurveyList(surveyList) {
    return {type: actionType.SHOW_SURVEY_LIST, surveyList}
}

export function getSurveyListByUser(data) {
    return function (dispatch) {
        surveyAjax.getSurveyList(data).then(function (res) {
            dispatch(showSurveyList(res.data.dataReq.surveys))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function deleteSurveyFromServer(data, index) {
    return function (dispatch) {
        surveyAjax.deleteSurvey(data).then(function (res) {
            dispatch(deleteSurvey(index))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function createNewSurvey(data) {
    return function (dispatch) {
        surveyAjax.createSurvey(data).then(function (res) {
            dispatch(addNewSurvey(res.data.dataReq))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function changeActiveSurvey(index, flag) {
    return {type: actionType.CHANGE_ACTIVE_SURVEY, index, flag}
}

export function publishSurvey(data, index) {
    return function (dispatch) {
        surveyAjax.publishSurvey(data).then(function (res) {
            dispatch(changeActiveSurvey(index, true))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function showEditSurvey(data) {
    return {type: actionType.SHOW_EDIT_SURVEY, data}
}

export function changeViewSurvey(data) {
    return {type: actionType.CHANGE_VIEW_SURVEY, data}
}

export function getDetailSurvey(data) {
    return function (dispatch) {
        surveyAjax.getDetailSurvey(data).then(function (res) {
            dispatch(showEditSurvey(res.data.dataReq))
            dispatch(changeViewSurvey(1)) // Edit view
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function saveSurvey(data) {
    return function (dispatch) {
        surveyAjax.saveSurvey(data).then(function (res) {
            dispatch(getSurveyListByUser({token: localStorage.getItem('token')})) // Todo: Sau nay se change o stage - khong call api nua
            dispatch(changeViewSurvey(2))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function setShowModalLink(flag) {
    return {type: actionType.SET_SHOW_MODAL_URL, flag}
}

export function showSurveyLink(link) {
    link = 'http://localhost:3000/' + link
    return {type: actionType.SHOW_SURVEY_LINK, link}
}

export function getSurveyUrl(data) {
    return function (dispatch) {
        surveyAjax.getSurveyUrl(data).then(function (res) {
            dispatch(showSurveyLink(res.data.dataReq.link))
            dispatch(setShowModalLink(true))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}

export function showDoSurvey(data) {
    return function (dispatch) {
        surveyAjax.getSurveyAnswer(data).then(function (res) {
            dispatch(showEditSurvey(res.data.dataReq))
        }, function (err) {
            alert('Error! Please try again')
        })
    }
}

export function postAnswer(data) {
    return function (dispatch) {
        surveyAjax.postAnswer(data).then(function (res) {
            alert('Thank you for completing the survey!')
        }, function (err) {
            alert('Error! Please try again')
        })
    }
}

export function showResult(data) {
    return {type: actionType.SHOW_RESULT, data}
}

export function getAnswer(data) {
    return function (dispatch) {
        surveyAjax.getAnswer(data).then(function (res) {
            dispatch(showResult(res.data.dataReq))
            dispatch(changeViewSurvey(3))
        }, function (err) {
            alert('Session Timeout')
            localStorage.clear()
        })
    }
}
