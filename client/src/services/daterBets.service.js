import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3330/api/';

class DaterBetsService {
    create(date_id, amount, day) {
        return axios.post(API_URL + `dater/bet/${date_id}/${day}`, amount, { headers: authHeader() } );
    }

    update(date_id, amount, day) {
        return axios.patch(API_URL + `dater/bet/${date_id}/${day}`,  amount, { headers: authHeader() } );
    }

    findAllByDate(date_id) {
        return axios.get(API_URL + `dater/bets/${date_id}`, { headers: authHeader() })
    }

    daterHasBets(date_id) {
        return axios.get(API_URL + `dater/bets/in/${date_id}`, { headers: authHeader() })
    }

    daterHasBetsToday(date_id, day) {
        return axios.get(API_URL + `dater/bets/in/${date_id}/today/${day}`, { headers: authHeader() })
    }
}

export default new DaterBetsService();