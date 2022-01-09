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
const { getBestHandByWallet } = require("../controller/games_controller");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

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
    let { hand, type, score } = getBestHandByWallet(req.body.user, req.body.gameType);
    let newEntry = {
        user: req.body.user,
        hand: hand,
        handType: type,
        score: score
    };

    let newData =  {
        $set: { "gameId": req.params.gameId, "gameType": req.body.gameType },
        $push: { "entries": newEntry }
    }

    dbConnect
        .collection("games")
        .updateOne(query, newData, { upsert: true } , (err, result) => {
            if (err) throw err;
            res.json(result);
    });

});

module.exports = gamesRoutes;