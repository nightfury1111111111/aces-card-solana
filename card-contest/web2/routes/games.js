/*
Games doc ref:
{
    gameId: {today's date as string} + {game type}
    gameType: "5card",
    entries: [
        {
            user: {wallet pubkey},
            hand: {NFT token account pubkey}[],
            handType: String,
            score: int that maps to hand type (rank)
        },
    ]
}
*/

const express = require("express");
const gamesRoutes = express.Router();

const { wildCards } = require('../utils/wildCards');
const { getBestHandByWallet } = require("../controller/games_controller");

const dbo = require("../db/conn");
const { fiveCardRank } = require("../utils/poker");

// Get all games (max. 10)
gamesRoutes.route("/games").get( (_req, res) => {
    let dbConnect = dbo.getDb();
    dbConnect
      .collection("games")
      .find({})
      .toArray( (err, result) => {
        if (err) throw err;
        let returnVal;
        if (result.length > 10) returnVal = result.slice(0,10);
        else returnVal = result;
        res.json(returnVal);
    });
});

// Get game by id
gamesRoutes.route("/games/:gameId").get( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { gameId: req.params.gameId };
    dbConnect
      .collection("games")
      .findOne(query, (err, result) => {
        if (err) throw err;
        if (result)
            res.json({ entries: result.entries.sort((a,b) => fiveCardRank(b,a)) });
        else
            res.json({entries: []});
    });
});

// Post new game entry
gamesRoutes.route("/games/play/:gameId").post( (req, res) => {
    let dbConnect = dbo.getDb();

    let gameQuery = { gameId: req.params.gameId };
    let userQuery = { user: req.body.user };

    let upsert = async (gameEntry, gameQuery, userQuery) => {
        let wildCardList = gameEntry?.wildCards ? gameEntry.wildCards : wildCards(4);

        let { hand, type, score } = await getBestHandByWallet(req.body.user, req.body.gameType, wildCardList);

        // Update game entry
        let gameEntryUpsert = {
            user: req.body.user,
            hand: hand,
            handType: type,
            score: score
        };
    
        let gameData =  {
            $setOnInsert: { 
                "gameId": req.params.gameId, 
                "gameType": req.body.gameType, 
                "wildCards": wildCardList
            },
            $push: { "entries": gameEntryUpsert }
        }

        // Update user entry
        let userEntry = {
            gameId: req.params.gameId,
            hand: hand,
            handType: type,
            score: score
        }

        let userData = {
            $setOnInsert: {
                user: req.params.user
            },
            $push: { "gameHistory": userEntry }
        }

        dbConnect
            .collection("users")
            .updateOne(userQuery, userData, { upsert: true }, (err, _) => {
                if (err) throw err;
        });
    
        dbConnect
            .collection("games")
            .updateOne(gameQuery, gameData, { upsert: true } , (err, _) => {
                if (err) throw err;
                res.json(userEntry);
        });

    }

    dbConnect
        .collection("games")
        .findOne(gameQuery, (err, result) => {
            if (err) throw err;
            upsert(result, gameQuery, userQuery);
        });
    
});

module.exports = gamesRoutes;