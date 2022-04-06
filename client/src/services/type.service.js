import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3330/api/';

class TypeService {
    getTypes() {
        return axios.get(API_URL + 'types');
    }

    getType(id) {
        return axios.get(API_URL + `type/${id}`);
    }
}

export default new TypeService();