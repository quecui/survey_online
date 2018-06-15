import Ajax from './ajax'

class Survey extends Ajax {
    login(data) {
        return this.ajax().post('/signin', JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
    }
}

const surveyAjax = new Survey()
export default surveyAjax
