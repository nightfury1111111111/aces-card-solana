import axios from 'axios';

export const userLogin = async (pubkey) => {
    let res = await axios.post(`/users/login`, { user: pubkey }, { headers: { 'Content-Type': 'application/json' } });
    return res.data;
}

export const getRecentGames = async (pubkey) => {
    let res = await axios.get(`/users/history/${pubkey}`);
    return res.data;
}

export const getGameEntry = async (pubkey, gameId) => {
    let res = await axios.get(`/users/history/${pubkey}-${gameId}`);
    return res.data;
}

export const getAvailableCards = async (pubkey, gameId) => {
    let res = await axios.get(`/users/cards/${pubkey}-${gameId}`);
    return res.data.cards;
}