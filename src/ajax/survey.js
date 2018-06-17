import Ajax from './ajax'

class Survey extends Ajax {
    // Account
    register(data) {
        return this.ajax().post('/account/register', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    login(data) {
        return this.ajax().post('/account/signin', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    getUsernameByToken(data){
        return this.ajax().post('/account/token', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    // Survey
    getSurveyList(data) {
        return this.ajax().post('/survey/getAll', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    deleteSurvey(data){
        return this.ajax().post('/survey/delete', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    createSurvey(data){
        return this.ajax().post('/survey/create', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    publishSurvey(data){
        return this.ajax().post('/survey/publish', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    getDetailSurvey(data){
        return this.ajax().post('/survey/detail', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    saveSurvey(data){
        return this.ajax().post('/survey/edit', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    getSurveyUrl(data){
        return this.ajax().post('/survey/getLink', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    // Answer
    getSurveyAnswer(data){
        return this.ajax().post('/answer/getSurvey', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    postAnswer(data){
        return this.ajax().post('/answer/answerSurvey', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }

    getAnswer(data){
        return this.ajax().post('/survey/statistical', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }
}

const surveyAjax = new Survey()
export default surveyAjax
