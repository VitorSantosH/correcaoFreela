// config express 
const express = require('express');
const routes = express();

// bcrypt e jwt
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authSecret } = require('../config/.env');
const verifyJWT = require('../utilitarios/verify');
const multerConfig = require('../utilitarios/multerConfig');
const multer = require('multer');
const path = require('path');



//const formidable = require('formidable')
const Zip2 = require('machinepack-zip-2');

// config schema
var rappibank = require('../schemas/rippbankSchema');

// config upload 
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


routes.post("/api/delrippbank", verifyJWT,  async (req, res) => {

    

    try {
        const donordata = await rappibank.deleteOne({ cpf: req.body.cpf });

        res.status(201).json({ lengthdata: donordata });
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error });
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



routes.post('/api/ripbankform', multer(multerConfig).array('files', 8), (req, res) => {



    try {

        // criando hash da senha "pass"
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt)


        let data = { ...req.body, isAdm: false, pass: hash };

        if (req.files) {
            data.file = req.files.map(file => {
                if (file) {
                    return file.name
                }
            })
        }

        // criando path
        const unico = req.body.cpf || req.body.cnpj;
        const pathFinal = path.resolve(__dirname, "..", '..', "tmp", 'uploads', unico)

        // salvando path onde ficarão arquivos do usuario
        data.destinoArquivos = pathFinal


        rappibank.create(data, function (err, salvo) {
            if (err) return res.status(404).send('erro ao criar conta')

            return res.send(salvo)
        })


    } catch (error) {

        console.log(error)
        return res.send('Erro: ' + error);

    }




})

routes.post('/adm/create', verifyJWT , (req, res) => {



    try {

        // criando hash da senha "pass"
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.pass, salt)


        let data = { ...req.body, isAdm: true, pass: hash };


        // criando path
        const unico = req.body.cpf || req.body.cnpj;
        const pathFinal = path.resolve(__dirname, "..", '..', "tmp", 'uploads', unico)

        // salvando path onde ficarão arquivos do usuario
        data.destinoArquivos = pathFinal


        rappibank.create(data, function (err, salvo) {
            if (err) return res.status(404).send('erro ao criar conta')

            return res.send(salvo)
        })


    } catch (error) {

        console.log(error)
        return res.send('Erro: ' + error);

    }


})

/*

routes.post("/api/ripbankform", (req, response) => {

    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        console.log(err)
        console.log(fields.pass)
        console.log(files)

        try {


            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(fields.pass, salt)

            let data = { ...req.fields, isAdm: false, pass: hash };

            console.log(data)

            // data.ipSelectedFile = req.body.fileIdPic;
            // data.scSelectedFile = req.body.scSelectedFileName;

            const imgIP = fs.readFileSync(files.fileIdPic.filepath, (err, data) => {
                if (err) return console.log(err)
                return data
            })

            data.ipSelectedFile = 'data:image/jpeg;base64,' + imgIP.toString('base64')



            const imgSc = fs.readFileSync(files.filePicBackSide.filepath, (err, data) => {
                if (err) return console.log(err)
                return data
            })

            data.scSelectedFile = 'data:image/jpeg;base64,' + imgSc.toString('base64')

            data.filePicBackSide = req.body.backSideName;
            var rappiData = new rappibank(data);

            rappiData.save(function (err, room) {
                req.body.id = room._id;



            });

            response.send({
                results: rappiData,
                message: "saved",
            });
        } catch (error) {
            console.log("err", error);
            response.status(400).json({ message: error });
        }

    })


});

*/


routes.get("/api/rippbank/:id", async (request, response) => {
    try {
        const donordata = await rappibank.find({ _id: request.params.id });
        response.status(200).json(donordata);
    } catch (error) {
        response.status(404).json({ message: error.message });
    }
});

routes.get("/api/rippbank", verifyJWT , async (request, response) => {


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
                    email: usuario[0].email,
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

routes.post('/downloads', (req, res) => {

    console.log(req.body.cpf)
    rappibank.find({ cpf: req.body.cpf })
        .lean()
        .then(users => {

            const user = users[0]
            var erro = false
            var retorno
            console.log(user)

            const unico = user.cpf || user.cnpj;
            const pathTxt = path.resolve(__dirname, "..", '..', "tmp", 'uploads', unico, `${user.name}dados.txt`)
            const dadosUser = ` Nome: ${user.name} \n E-mail: ${user.email} \n CPF: ${user.cpf} \n CNPJ: ${user.cnpj}`


            fs.writeFileSync(pathTxt, dadosUser, err => {

                if (err) return console.log(err)

                return console.log('deu certo');
            })


            Zip2.zip({
                sources: [`${user.destinoArquivos}`],
                destination: `${user.destinoArquivos}.zip`,
            }).exec({


                // Um erro inesperado ocorreu na compactação.
                error: function (err) {
                    return erro = err
                },

                // Sucesso.
                success: function (result) {
                    return retorno = result
                },

            });

            return res.send(`${user.cpf || user.cnpj}.zip`);


        })
        .catch(err => {
            console.log('catch')
            console.log(err)
        })


})


module.exports = routes;