// config express e filtros ( cors )
const express = require("express");
var app = express();
//const BodyParser = require("body-parser");
var cors = require("cors");


// config mongo
const mongoose = require("mongoose");
const CONNECTION_URL = "mongodb+srv://ripiBanck:iPF4ya7cEX7PvXd@clusterripibanck.q8ryj.mongodb.net/ClusterRipiBanck?retryWrites=true&w=majority"
//"mongodb+srv://crypto7864:crypto1232@cluster0.k7bka.mongodb.net/rippbank?authSource=admin&replicaSet=atlas-runhlv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
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
app.use("/static", express.static("tmp/uploads"))
app.use(
  "/ftp",
  express.static("public"),
  serveIndex("public", { icons: true })
);
app.use('/', express.static('build'))
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

 /* var Zip2 = require('machinepack-zip-2');

 app.use('/download', (req, res) => {
    const file = `${__dirname}/upload-folder/dramaticpenguin.MOV`;
    res.download(file); // Set disposition and send it.
}) 



// Compactação dos arquivos e destino do .zip

Zip2.zip({

    sources: ["C:/Users/Pc/Documents/curso-react/claratur/src/uploads/138.478.886-76"],

    destination: 'C:/Users/Pc/Documents/curso-react/claratur/src/uploads/138.478.886-76.zip',

}).exec({

    // Um erro inesperado ocorreu na compactação.

    error: function (err) {

    },

    // Sucesso.

    success: function (result) {

    },
});

*/