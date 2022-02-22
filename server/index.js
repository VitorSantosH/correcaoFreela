// config express e filtros ( cors )
const express = require("express");
var app = express();
//const BodyParser = require("body-parser");
var cors = require("cors");


// config mongo
const mongoose = require("mongoose");
const CONNECTION_URL = "mongodb+srv://crypto7864:crypto1232@cluster0.k7bka.mongodb.net/rippbank?authSource=admin&replicaSet=atlas-runhlv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
const con = mongoose.connection;

// config index e morgan 
const serveIndex = require("serve-index");
const morgan = require("morgan");

// rotas 
const routes = require('./src/routes/routes');
app.use(morgan("dev"));
//app.use(BodyParser.json());
//app.use(BodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/ftp",
  express.static("public"),
  serveIndex("public", { icons: true })
);
app.use(routes);



// porta 
app.listen(5000, () => {
  try {
    con.on("open", () => {
      console.log("connected");
    });
  } catch (error) {
    console.log("Error: " + error);
  }
});


// variaveis provavelmente inuteis 
/**
 * const DATABASE_NAME = "rippbank";
 * const uploadFile = require("./upload");
  const ObjectId = require("mongodb").ObjectID;
  var database, collection;
  global.__basedir = __dirname;
 */