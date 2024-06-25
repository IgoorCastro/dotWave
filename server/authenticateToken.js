
const jwt = require('jsonwebtoken');

require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Espera que o token esteja no formato "Bearer TOKEN"
    if (token == null) return res.sendStatus(401); // Se o token não estiver presente, retorna "Não autorizado"

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403); // Se o token for inválido, retorna "Proibido"
        req.user = user;
        console.log('\n\n >> Usuario autenticado <<');
        next(); // Se o token for válido, prossegue para a próxima função
    });
};

module.exports = authenticateToken;
