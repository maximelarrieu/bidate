import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3330/api/';

class HunterBetsService {
    create(dater_id, date_id, amount, day) {
        return axios.post(API_URL + `hunter/bet/${dater_id}/date/${date_id}/${day}`, amount, { headers: authHeader() } );
    }

    update(dater_id, date_id, amount, day) {
        return axios.patch(API_URL + `hunter/bet/${dater_id}/date/${date_id}/${day}`, amount, { headers: authHeader() } );
    }

    findAllByDate(date_id) {
        return axios.get(API_URL + `hunter/bets/${date_id}`, { headers: authHeader() })
    }

    findAllMineByDate(date_id) {
        return axios.get(API_URL + `hunter/my/bets/by/${date_id}`, { headers: authHeader() })
    }

    findAllMine() {
        return axios.get(API_URL + `hunter/my/bets/`, { headers: authHeader() })
    }

    hunterHasBetOnDate(date_id, dater_id) {
        return axios.get(API_URL + `hunter/bets/in/${date_id}/for/${dater_id}`, { headers: authHeader() })
    }

    hunterHasBetsOnDaterToday(date_id, dater_id, day) {
        return axios.get(API_URL + `hunter/bets/in/${date_id}/for/${dater_id}/today/${day}`, { headers: authHeader() })
    }
}

export default new HunterBetsService();