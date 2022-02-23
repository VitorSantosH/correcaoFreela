const fs = require('fs');



const criarDir = (name) => {
    const diretorioName = crypto.randomBytes(16, (err, hash) => {
        if (err) {
            return { erro: err };
        }

        const fileName = `${hash.toString('hex')}-${name}`;

        cb(null, fileName);

    });

    if (diretorioName.erro) return diretorioName;

    if (!fs.existsSync(__dirname, "..", '..', "tmp", 'uploads', `${diretorioName}`)) {

        fs.mkdirSync(__dirname, "..", '..', "tmp", 'uploads', `${diretorioName}`)

        return (__dirname, "..", '..', "tmp", 'uploads', `${diretorioName}`)
    } else {
        
        return {erro : diretorioName}
    }


}

module.exports = criarDir;