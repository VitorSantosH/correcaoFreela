const jwt = require('jsonwebtoken');
const { authSecret } = require("../config/.env");
const bcrypt = require("bcryptjs");

function verifyJWT(req, res, next) { // Verifica token

   
    
   console.log(req.headers.token)
    const token = JSON.parse(req.headers.token); // converter de json para literal

   

    jwt.verify(token, authSecret, (err, decoded) => {

        if (err) console.log(err);
        if (err) return res.status(400).send(`ERRO: ${err}`);

        if (decoded.admin == false) return res.status(400).send("Erro, autorização negada!")
        req.userId = decoded.id

        next();

    })
}


module.exports = verifyJWT;