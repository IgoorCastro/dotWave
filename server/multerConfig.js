// multerConfig.js

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Caminhos para os diretórios de armazenamento
const audioPath = path.join(__dirname, 'assets', 'music');
const samplePath = path.join(__dirname, 'assets', 'music', 'sample');
const coverPath = path.join(__dirname, 'assets', 'music', 'coverMusic');
const profileImagePath = path.join(__dirname, 'assets', 'profileImage'); 

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // cria um destino para cada fieldname
        if (file.fieldname === 'capa') {
            cb(null, coverPath);
        } else if (file.fieldname.startsWith('sample')) {
            cb(null, samplePath);
        } else if (file.fieldname === 'audio') {
            cb(null, audioPath);
        } else if (file.fieldname === 'imagem') {
            console.log('\n\n~~Multer: adicionando imagem\n\nfile:\n', file);
            cb(null, profileImagePath); // Adicionei o armazenamento para imagens de perfil
        } else {
            cb(new Error('Invalid field name'), false);
        }    
    },
    filename: function (req, file, cb) { // corrigi o nome dos arquivos
        const uuid = (file) => { // gerar nome de arquivo unico
            const fileExtension = path.extname(file.originalname);
            return `${uuidv4()}${fileExtension}`;
        }
        cb(null, uuid(file));
    }
});

const upload = multer({ storage: storage });
module.exports = upload;
