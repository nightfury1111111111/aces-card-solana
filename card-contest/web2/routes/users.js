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

// Get games by user
usersRoutes.route("/users/history/:user").get( (req, res) => {
    let dbConnect = dbo.getDb();
    let query = { user: req.params.user };
    try {
        dbConnect
        .collection("users")
        .findOne(query, (userErr, userResult) => {
            if (userErr) throw userErr;

            dbConnect
                .collection("games")
                .find({})
                .toArray( (gamesErr, gamesResult) => {
                    if (gamesErr) throw gamesErr;
                    let userGames = userResult.gameHistory.map(games => games.gameId);
                    let games = gamesResult.filter( game => {
                        for (let i = 0; i < game.entries.length; i++)
                            if (game.entries[i].user === req.params.user) return true;
                        return false;
                    });
                    
                    let gameIds = games.map(entry => entry.gameId);
                    let ranks = games.map(entry => 
                        entry.entries
                            .sort((a,b) => fiveCardRank(a.hand,b.hand))
                            .map(e => e.user).indexOf(req.params.user) + 1
                    );
                    let totals = games.map(entry => entry.entries.length);

                    res.json({ games: gameIds, ranks: ranks, totals: totals});
                });
        });
    } catch {
        res.json({});
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
                res.json(entries.sort((a,b) => fiveCardRank(a.hand,b.hand))[0]);

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

            let wildCards = result?.entries?.filter(entry => entry.user === req.params.user).sort((a, b) => fiveCardRank(a.hand, b.hand))[0]?.wildCards || [];
            getAcesTokens(req.params.user)
                .then( response => {
                    res.json({ cards: getGameCards(response, wildCards) })
                });
        });
});

module.exports = usersRoutes;