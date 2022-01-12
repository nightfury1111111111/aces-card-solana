import axios from 'axios';

const getGameRankings = async (gameId) => {
    return axios
            .get(`/games/${gameId}`)
            .then(response => response.data.entries.sort( (a, b) =>  (a.score - b.score) ))
            .catch(err => console.log(err));
}

const getRecentGamesByUser = async (pubkey) => {
    return axios
            .get(`/games/mygames/${pubkey}`)
            .then(response => response.data)
            .catch(err => console.log(err));
}

const playGame = async (pubkey, gameId) => {
    return axios
            .post(`/games/play/${gameId}}`, { gameType: gameId.substring(8), user: pubkey }) // gameId = `MMDDYYYY${gameType}`
            .then(response => response.data)
            .catch(err => console.log(err));
}

exports.getRecentGamesByUser = getRecentGamesByUser;
exports.playGame = playGame;
exports.getGameRankings = getGameRankings;