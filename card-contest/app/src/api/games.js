import axios from 'axios';

export const getGameRankings = async (gameId) => {
    let res = await axios.get(`/games/${gameId}`);
    return res.data.entries;
}

export const playGame = async (pubkey, gameId) => {
    let res = await axios.post(`/games/play/${gameId}`, { gameType: gameId.substring(8), user: pubkey });
    return res.data;
}
