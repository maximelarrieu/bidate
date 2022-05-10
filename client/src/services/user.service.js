import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3330/api/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'user');
    }
    getModeratorBoard() {
        return axios.get(API_URL + 'moderator', { headers: authHeader() });
    }
    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }

    getUsers() {
        return axios.get(API_URL + 'daters', { headers: authHeader() });
    }

    getUser(id) {
        return axios.get(API_URL + `dater/${id}`, { headers: authHeader()});
    }

    update(id, email) {
        return axios.get(API_URL + `user/${id}`, { email }, { headers: authHeader()})
    }

    setUserAddress(id, address) {
        return axios.patch(API_URL + `dater/${id}`, { address }, { headers: authHeader()})
    }
}

export default new UserService();