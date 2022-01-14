const express = require("express");
const usersRoutes = express.Router();

const { getGameCards } = require('../utils/wildCards');
const { getAcesTokens } = require("../db/query");
const { fiveCardRank } = require('../utils/poker');

const dbo = require("../db/conn");

// Login/create user
usersRoutes.route("/users/login").post( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { user: req.body.user };
    let newData = {
        $setOnInsert: { 
            "user": query.user, 
            "gameHistory": []
        },
    };

    dbConnect
        .collection("users")
        .updateOne(query, newData, { upsert: true }, (err, result) => {
            if (err) throw err;
            res.json(result.data);
        });
});

// Get recent games by user
usersRoutes.route("/users/history/:user").get( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { user: req.params.user };
    try {
        dbConnect
            .collection("users")
            .findOne(query, (err1, result1) => {
                if (err1) throw err1;
                let history = result1.gameHistory.slice(0,15);
                let response = { games: [], entries: [], bestEntries: [] }
                // Aggregate entry history
                for (let i = 0; i < history.length; i++) {
                    let index = games.indexOf(history[i].gameId);
                    let entry = { hand: history[i].hand, handType: history[i].handType, score: history[i].score };
                    if (index === -1) {
                        response.games.push(history[i].gameId);
                        response.entries.push([entry]);
                    }
                    else {
                        response.entries[index].push(entry);
                    }
                }
                // Dedup history by gameId, finding best entry in each
                for (let i = 0; i < response.games.length; i++) {
                    response.bestEntries.push(response.entries[i].sort((a,b) => fiveCardRank(b,a))[0]);
                }
                let gameQuery = { user: { $in: response.games.slice(0,5)}};
                dbConnect
                    .collection("games")
                    .find(gameQuery)
                    .toArray( (err2, result2) => {
                        if (err2) throw err2;
                        let fullGames = result2;
                        let final = { games: [], ranks: [], totals: [] };
                    })
                res.json( { games: response.games, entries: response.bestEntries} );
            })
    } catch {
        let result = {};
        res.json(result);
    }
})

// Get (best) game entry by gameId
usersRoutes.route("/users/history/:user-:gameId").get( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { user: req.params.user };
    dbConnect
        .collection("users")
        .findOne(query, (err, result) => {
            if (err) throw err;
            let entries = [];
            if (result.gameHistory.length > 0) {
                for (let i=0; i<result.gameHistory.length; i++)
                    if (result.gameHistory[i].gameId === req.params.gameId) {
                        entries.push(result.gameHistory[i]);
                    }

                res.json(entries.sort((a,b) => fiveCardRank(b,a))[0]);

            }
            else {
                res.json({});
            }

        })
});

// Get available cards for a specific game
usersRoutes.route("/users/cards/:user-:gameId").get( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { gameId: req.params.gameId };
    dbConnect
        .collection("games")
        .findOne(query, (err, result) => {
            if (err) throw err;
            let wildCards = result?.wildCards ? result.wildCards : [];
            getAcesTokens(req.params.user)
                .then( response => {
                    res.json({ cards: getGameCards(response, wildCards) })
                });
        });
});

module.exports = usersRoutes;