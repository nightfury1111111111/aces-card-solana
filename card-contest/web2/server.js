const express = require("express");
const path = require("path");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5001;
console.log(port);

// Get driver connection
const dbo = require("./db/conn");

const app = express();
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Send client app
app.get("/", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.get("/play", (_req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})

// Set up API endpoints
app.use(require("./routes/users"));
app.use(require("./routes/games"));
 
// Start app
app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});