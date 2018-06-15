import axios from 'axios'
import {blockUI, unBlockUI} from "../utils/form";

class Ajax {
    constructor () {
        this.apiHost = 'http://localhost:4000'
    }

    ajax (loading = true) {
        return axios.create({
            baseURL: this.apiHost,
            transformRequest: [function (data) {
                if (loading) {
                    blockUI()
                }
                return data;
            }],
            transformResponse: [function (data) {
                if (loading) {
                    unBlockUI()
                }
                return data;
            }],
            responseType: 'json',
            crossDomain: true
        })
    }
}

export default Ajax

