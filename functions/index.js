const functions = require("firebase-functions");


const express=require("express");
const admin = require("firebase-admin");
const app = express();
admin.initializeApp({credential: admin.credential.cert("./permisions.json"), databaseURL: "https://approcano-default-rtdb.firebaseio.com"});

app.get("/hello", (req, res) => {
  res.status(200).json({message: "Hello from Firebase!"});
});

app.use(require("./routes/enviosroutes"));
exports.app=functions.https.onRequest(app);

