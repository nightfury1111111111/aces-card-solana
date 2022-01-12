import axios from 'axios';

export const userLogin = async (pubkey) => {
    return axios
            .post(`/users/login`, { user: pubkey }, { headers: { 'Content-Type': 'application/json' } })
            .then(response => console.log(response))
            .catch(err => console.log(err));
}
