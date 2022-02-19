const util = require("util");
var encoder = new util.TextEncoder('utf-8');
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const mongoose = require('mongoose');
const ObjectId = require("mongodb").ObjectID;
var rappibank = require('./src/schemas/rippbankSchema');
const CONNECTION_URL = 'mongodb+srv://crypto7864:crypto1232@cluster0.k7bka.mongodb.net/rippbank?authSource=admin&replicaSet=atlas-runhlv-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
const DATABASE_NAME = "rippbank";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true });
const con = mongoose.connection;
const fs = require('fs');

let storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    console.log(req.body)
    if (!req.body.id) {
      !fs.existsSync(__basedir + "/public/uploads/" + req.body.email) && fs.mkdirSync(__basedir + "/public/uploads/" + req.body.email);
      req.body.file = file.originalname;
      cb(null, __basedir + "/public/uploads/" + req.body.email);

    } else {
      console.log(req.body);
      !fs.existsSync(__basedir + "/public/uploads/" + req.body.email) && fs.mkdirSync(__basedir + "/public/uploads/" + req.body.email);
      req.body.file = file.originalname;
      cb(null, __basedir + "/public/uploads/" + req.body.email);

      try {
        req.body.datesubmitted = new Date(Date.now()).toISOString();
        //await rappiData.save();
        rappibank.update({ _id: req.body.id }, req.body, function (err, room) {
          console.log(room);
          req.body.id = room._id;
          fs.writeFile(__basedir + '/public/uploads/' + req.body.email + '/newfile.txt', JSON.stringify(req.body), function (err) {
            console.log('File updated successfully.');
          });
        });

      } catch (error) {
        return ({ message: error });
      }
    }

  },
  filename: (req, file, cb) => {
    // console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });


module.exports = upload;