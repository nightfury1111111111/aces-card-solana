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

// This will help us connect to the database
const dbo = require("../db/conn");
const { wildCards } = require('../utils/wildCards');
const { getBestHandByWallet } = require("../controller/games_controller");

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
        res.json(result);
    });
});

// Get recent games by user ID
gamesRoutes.route("/games/mygames/:user").get( (req, res) => {
    let dbConnect = dbo.getDb();
    dbConnect
      .collection("games")
      .find({})
      .toArray( (err, result) => {
          if (err) throw err;
          res.json(result.filter( (game) => {
            for (let i=0; i < game.entries.length; i++) {
                if (game.entries[i].user === req.params.user) return true;
            }
          }));
      })
});

// Post new game entry
gamesRoutes.route("/games/play/:gameId").post( (req, res) => {
    let dbConnect = dbo.getDb();

    let query = { gameId: req.params.gameId };

    let upsert = async (gameEntry, query) => {
        let wildCardList = gameEntry?.wildCards ? gameEntry.wildCards : wildCards(Math.floor(Math.random() * 3 + 4));

        let { hand, type, score } = await getBestHandByWallet(req.body.user, req.body.gameType, wildCardList);

        let newEntry = {
            user: req.body.user,
            hand: hand,
            handType: type,
            score: score
        };
    
        let newData =  {
            $setOnInsert: { 
                "gameId": req.params.gameId, 
                "gameType": req.body.gameType, 
                "wildCards": wildCardList
            },
            $push: { "entries": newEntry }
        }
    
        dbConnect
            .collection("games")
            .updateOne(query, newData, { upsert: true } , (err, result) => {
                if (err) throw err;
                res.json(result);
        });
    }

    dbConnect
        .collection("games")
        .findOne(query, (err, result) => {
            if (err) throw err;
            upsert(result, query);
        });
    
});

module.exports = gamesRoutes;