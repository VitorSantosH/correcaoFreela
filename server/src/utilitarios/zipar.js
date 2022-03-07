
var Zip2 = require('machinepack-zip-2');

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
