// From: https://www.mongodb.com/languages/mern-stack-tutorial
const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "../config.env" });
const Db = process.env.ATLAS_URI || "mongodb+srv://mzperezous:Warwick10@aces-nft.kerih.mongodb.net/cardContest?retryWrites=true&w=majority";
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("cardContest");
        console.log("Successfully connected to MongoDB."); 
      }
      return callback(err);
         });
  },
 
  getDb: function () {
    return _db;
  },
};
