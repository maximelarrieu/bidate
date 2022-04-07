import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3330/api/';

class DateService {
    create(data) {
        return axios.post(API_URL + 'date', data, { headers: authHeader() });
    }

    findAll() {
        return axios.get(API_URL + 'dates', { headers: authHeader() })
    }

    findAllByDater(id) {
        return axios.get(API_URL + `dates/${id}`, { headers: authHeader() })
    }

    getCurrentDate(id) {
        return axios.get(API_URL + `date/current/${id}`, { headers: authHeader() });
    }

    isEnded(id) {
        return axios.patch(API_URL + `date/${id}`, { headers: authHeader() })
    }
}

export default new DateService();