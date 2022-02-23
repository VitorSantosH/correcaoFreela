const multer = require('multer');
const path = require('path');
const crypto = require("crypto");
const fs = require('fs');


const multerConfig = {
 
    storage: multer.diskStorage({

        destination: (req, file, cb) => {


            const unico = req.body.cpf || req.body.cnpj;

            const pathFinal = path.resolve(__dirname, "..", '..', "tmp", 'uploads', unico)

            if(!fs.existsSync(pathFinal)) {
                fs.mkdirSync(pathFinal, err => {
                    if(err) return console.log(err)
    
                   return  console.log('deu certo');
                })
            }  

            
            cb(null, path.resolve(__dirname, "..", '..', "tmp", 'uploads', unico));
        },

        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) {
                    cb(err);
                }


                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);

            });
        },

    }),

    limits: {
        fileSize: 50 * 1024 * 1024 * 1024 ,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/gif",
            "file/txt",
            "file/doc",
            "file/docx",
            "file/pdf",
            "application/pdf",
            "/pdf"

        ];

       
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type"));
        }
    }
}

module.exports  = multerConfig 