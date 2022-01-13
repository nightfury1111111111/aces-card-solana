const express = require("express");
const usersRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

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

module.exports = usersRoutes;