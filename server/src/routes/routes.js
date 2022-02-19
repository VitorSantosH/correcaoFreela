// config express 
const express = require('express');
const routes = express();

// bcrypt e jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authSecret } = require('../config/.env');
const verifyJWT = require('../config/verify')


// config schema
var rappibank = require('../schemas/rippbankSchema');

// config upload 
const upload = require("../../upload");
const fs = require('fs')


// Rotas

routes.post("/api/checkemail", async (request, response) => {
    try {
        const donordata = await rappibank.find({ email: request.body.email });

        response.status(201).json({ lengthdata: donordata.length });
    } catch (error) {
        response.status(400).json({ message: error });
    }
});


routes.post("/api/delrippbank", async (request, response) => {
    try {
        const donordata = await rappibank.deleteOne({ email: request.body.email });

        response.status(201).json({ lengthdata: donordata });
    } catch (error) {
        response.status(400).json({ message: error });
    }
});


/**
 * 
 * {
    "results": {
        "name": "admin",
        "email": "wytorh@gmail.com",
        "pass": "@admin_75",
        "isAdm": true,
        "_id": "62102ae332e21479d950f861"
    },
    "message": "saved"
}
 * 
 password: {
            type: String,
            required: true 
        }
 */

routes.post("/api/ripbankform", upload.any(), (req, response) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt)

        let data = { ...req.body, isAdm: false, pass: hash };
        console.log(data)



        data.ipSelectedFile = req.body.ipSelectedFileName;
        data.scSelectedFile = req.body.scSelectedFileName;
        data.filePicBackSide = req.body.backSideName;
        var rappiData = new rappibank(data);
        rappiData.save(function (err, room) {
            req.body.id = room._id;
            fs.writeFile(
                __dirname + "/public/uploads/" + req.body.email + "/newfile.txt",
                JSON.stringify(req.body),
                function (err) {
                    console.log("File is created successfully.");
                }
            );
        });
        response.send({
            results: rappiData,
            message: "saved",
        });
    } catch (error) {
        console.log("err", error);
        response.status(400).json({ message: error });
    }
});

routes.get("/api/rippbank/:id", async (request, response) => {
    try {
        const donordata = await rappibank.find({ _id: request.params.id });
        response.status(200).json(donordata);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});
routes.get("/api/rippbank", verifyJWT,  async (request, response) => {

    //console.log(request.headers.token)

    try {
        const donordata = await rappibank.find({});
        response.status(200).json(donordata);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

routes.get("/api/getInfo/:cnpj", async (request, response) => {
    const { cnpj } = request.params;
    try {
        const res = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);
        response.status(200).send(res.data);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

// rota de login
routes.post('/login', (req, res) => {

    console.log('post /user/login')

    let erros = [];

    if (!req.body.email) {
        erros.push({ texto: "Email inválido!" })
    }
    if (!req.body.pass) {
        erros.push({ texto: "Digite a senha" })
    }

    if (erros.length > 0) {
        res.send({ erro: erros })
        return
    }

    rappibank.find({ email: req.body.email }).lean().then((usuario) => {

        console.log(usuario)

        if (!usuario.length > 0) {
            res.send({ erro: [{ texto: "Usuário não existe" }] })
        } else {


            const batem = bcrypt.compareSync(req.body.pass, usuario[0].pass)
            const now = Math.floor(Date.now() / 1000)
            if (batem) {

                const payload = {
                    id: usuario[0]._id,
                    name: usuario[0].name,
                    admin: usuario[0].isAdm,
                    iat: now,
                    exp: now + (60 * 60 * 24 * 3)
                }

                const token = jwt.sign(payload, authSecret)

                res.send({ payload, token })
                return

            } else {
                res.send({ erro: [{ texto: 'Senha invalida!' }] })
                return
            }




        }

    }).catch((err) => {
        console.log(err)
    })


})


module.exports = routes;