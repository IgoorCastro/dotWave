// Servidor web .Wave
require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const express = require('express');
const path = require('path');
const app = express();
const multer = require('multer'); // upload de imagens para o server local
const cors = require('cors');
app.use(cors());
const upload = require('./multerConfig');
const fs = require('fs'); // Para lidar com as exclusões de arquivos do Db
const authenticateToken = require('./authenticateToken'); // Importa o middleware

const jwt = require('jsonwebtoken'); // controle de token para login
const bcrypt = require('bcrypt'); // criptografia de senha
const saltRounds = 10;
const { v4: uuidv4 } = require('uuid'); // controle de nome de arquivos

// -------- Utilizado para ler os dados do front --------
app.use(express.json());

// Defina o caminho para o diretório de arquivos estáticos
const staticPath = path.join(__dirname, 'assets'); // Caminho para o diretório "assets" no mesmo diretório do servidor
app.use(express.static(staticPath));

// Caminhos para os diretórios de armazenamento
const audioPath = path.join(__dirname, 'assets', 'music');
const samplePath = path.join(__dirname, 'assets', 'music', 'sample');
const coverPath = path.join(__dirname, 'assets', 'music', 'coverMusic');
const profileImagePath = path.join(__dirname, 'assets', 'profileImage');

// ---------- SQL -----------
const mysql = require("mysql2/promise");

// - Conexão -
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "dotwave_v1"
});

let counter = 1; 

// Rota de login
app.post('/signin', async (req, res) => {
    const request = req.body;
    console.log('>> /signin\nreq.body: ', request);

    if (request) {
        try {
            const SQL = 'SELECT * FROM usuario WHERE usu_nomeExb = ? OR usu_email = ?';
            const result = await db.query(SQL, [request.nomeUsuario, request.nomeUsuario]);
            if (result[0].length === 0)
                return res.status(401).json({ message: 'Usuário não encontrado' });

            const usuario = result[0];
            usuario[0].usu_image = `http://localhost:3006/profileImage/${path.basename(usuario[0].usu_image)}`;

            bcrypt.compare(request.senha, usuario[0].usu_senha, (err, isMatch) => {
                if (err) {
                    console.log('err: ', err);
                    return res.status(500).json({ message: 'Erro no servidor' });
                }
                if (isMatch) {
                    // Gerando o token JWT
                    const token = jwt.sign({ id: usuario[0].usu_id, username: usuario[0].usu_nomeExb }, process.env.SECRET_KEY, { expiresIn: '1h' });

                    return res.status(200).json({ message: 'Bem-vindo', token, usuario });
                } else {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
            });
        } catch (error) {
            console.error('Erro no SELECT: ', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
});

// Rota de cadastro
app.post('/signup', upload.single('imagem'), (req, res) => {
    const request = req.body;
    const file = req.file;
    console.log('file: ', file);
    console.log('>> /signup\nreq.body: ', request);

    if (request) {
        console.log('\n>Iniciando cadastro de ', request.nome);
        console.log('\n>Alterando caminho da imagem');
        const profileImage = file ? file.filename : null;
        const profileImageDestination = profileImage ? `${profileImagePath}\\${profileImage}` : null;
        console.log('profileImagePath: ', profileImageDestination);

        let SQL = 'INSERT INTO usuario (usu_nome, usu_nomeExb, usu_nomeContato, usu_image, usu_email, usu_senha, usu_telefone) VALUES (?, ?, ?, ?, ?, ?, ?)';
        bcrypt.hash(request.senha, saltRounds, async (err, hash) => {
            if (err)
                console.log('\nbcrypt erro ->\n', err);

            try {
                const insertResult = await db.query(SQL, [request.nome + ' ' + request.sobrenome, request.nomeDeExibicao, request.nomeDeUsuario, profileImageDestination, request.email, hash, request.telefone, '']);
                if (insertResult) {
                    res.send('>Usuario enviado e dados salvos com sucesso.');
                    console.log('\n>Usuario cadastrado com sucesso');
                } else {
                    console.error('>Erro ao tenta cadastrar um novo usuario');
                    return res.status(500).send('>Erro ao tenta cadastrar um novo usuario');
                }
            } catch (er) {
                console.error('>Erro ao tentar concluir o INSERT\n\n--> error: ', er);
                return res.status(500).send('>Erro ao tentar concluir o INSERT');
            }
        });
    }
});

// Rota para upload de arquivos
app.post('/addMusic', authenticateToken, upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'sample1', maxCount: 1 },
    { name: 'sample2', maxCount: 1 },
    { name: 'sample3', maxCount: 1 },
    { name: 'sample4', maxCount: 1 },
    { name: 'capa', maxCount: 1 }
]), async (req, res) => {
    console.log('\n--> addMusic/');
    const files = req.files;
    const body = req.body;

    if (!files || !body) return res.status(400).send('Preencha todos os campos do formulário!');

    // -- Configuração do upload do arquivo de audio --
    const audioFile = files.audio ? files.audio[0] : null;
    const capaFile = files.capa ? files.capa[0] : null;

    // -- Configuração do upload do arquivo de audio --
    console.log('>Configurando os arquivos para o insert...');
    const audioExtension = files.audio[0].originalname.split('.').pop(); // Gera o nome do arquivo de áudio usando o padrão especificado
    const audioFileName = audioFile ? `${audioPath}\\${audioFile.filename}` : null; // Z:\\SSD 2024\\5 Sem FATEC\\Tcc\\dotWave\\server\    
    const capaFileName = capaFile ? `${coverPath}\\${capaFile.filename}` : null; // Gera o nome do arquivo de capa usando o padrão especificado
    const profileImageFile = files.profileImage ? files.profileImage[0] : null;
    console.log('>Fim da configuração\n');

    const SQL = "INSERT INTO musica VALUES (0, ?, ?, ?, ?, ?, ?, ?, 1, ?)";

    try {
        console.log('>Inserindo musica...');
        const [result] = await db.query(SQL, [body.autor, body.producao, body.composicao, body.titulo, audioFileName, body.valor, capaFileName, body.usu_id]);
        console.log('>Musica inserida\n');

        const musicId = result.insertId;
        const sampleFiles = [];
        const sampleType = ['Vocal', 'Percussão', 'Baixo', 'Synth/ Piano'];
  
        console.log('>Preparando o insert das samples...\n');
        Object.values(files).forEach((fileArray, i) => {
            fileArray.forEach((file, index) => {
                console.log(index + 1, ' - ', file.originalname);
                const fieldName = file.fieldname; // salvar o fieldName para test
                let sampleIndex = fieldName.replace('sample', '');
                sampleIndex--;
                if (fieldName.startsWith('sample')) { // verificar se o arquivo começa com sample
                    console.log('Sample encontrada: ', file.originalname);
                    file.fieldname = sampleType[sampleIndex];
                    sampleFiles.push(file); // salva na lista de samples para o insert
                }
            });
        });
        
        if (sampleFiles.length > 0) {
            console.log('>Inserindo sample(s)');
            const sampleSQL = "INSERT INTO sample (sam_audio, sam_tipo, mus_id) VALUES ?";
            const sampleValues = sampleFiles.map((sample, index) => [sample.path, sample.fieldname, musicId]); // corrigir o sam_tipo!!
            // console.log('sampleValues: ', sampleValues);

            await db.query(sampleSQL, [sampleValues]);            
        }else
            console.log('>Nenhuma arquivo de sample encontrado!');

        console.log('Musica enviada com sucesso :)');
        res.send('Arquivo enviado e dados salvos com sucesso.');
        counter++;
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao salvar a música no banco de dados.');
    }
});

// função para retornar um usuario (usar no userProfile)
app.get("/getUser", async (req, res) => {
    console.log('\n\n/getUser\n');
    const { username, usu_id } = req.query;
    console.log('>username: ', username);

    // console.log('username recebido:', username);

    if(username){
        try{
            console.log('\nIniciando busca por username...');
            let SQL = "SELECT * FROM usuario WHERE usu_nomeExb = ?";
    
            const result = await db.query(SQL, [username]);
            if (result.length === 0)
                return res.status(401).json({ message: 'Usuário não encontrado' });
            console.log('Busca completa\n');
    
            const user = result[0];
            if(user.length > 0){
                user[0].usu_image = `http://localhost:3006/profileImage/${path.basename(user[0].usu_image)}`;
            }
            res.send(user);
        }catch(er){
            console.error('\n>>Erro em /getUser\nErro: ', er)
        }
    }else{
        try{ // buscar oir ID
            console.log('\nIniciando busca por id...');
            let SQL = "SELECT * FROM usuario WHERE usu_id = ?";
    
            const result = await db.query(SQL, [usu_id]);
            if (result.length === 0)
                return res.status(401).json({ message: 'Usuário não encontrado' });
            console.log('Busca completa\n');
            
    
            const user = result[0];
            if(user.length > 0){
                console.log('\n>user\n', user);
                user[0].usu_image = `http://localhost:3006/profileImage/${path.basename(user[0].usu_image)}`;
            }
            
            res.send(user);
        }catch(er){
            console.error('\n>>Erro em /getUser\nErro: ', er)
        }
    }
    console.log('--------------------------\n\n\n');
});

app.get("/getSampleList", async (req, res) => {
    console.log('\n/getSampleList');
  const { musicId } = req.query;

  try {
    const SQL = "SELECT sam_audio, sam_tipo, mus_id FROM sample WHERE mus_id = ?";
    const result = await db.query(SQL, [musicId]);

    if (result.length === 0) {
      return res.status(401).json({ message: 'Lista de samples não encontrada' });
    }

    // Modifica os links para o áudio das amostras
    result[0].forEach(sample => {
        console.log('Alterando os links para o áudio das amostras');
      if (sample.sam_audio) {
        console.log('Link: ', sample.sam_audio);
        sample.sam_audio = `http://localhost:3006/music/sample/${path.basename(sample.sam_audio)}`;
        console.log('Link atualizado: ', sample.sam_audio);
      }
    });

    res.status(200).json(result); // Retorna os dados como JSON
  } catch (error) {
    console.error('Erro ao buscar lista de samples:', error);
    res.status(500).json({ message: 'Erro ao buscar lista de samples' });
  }
});


app.get("/getMusicList", async (req, res) => {
    const { user_id } = req.query;
    // console.log('user_id: ', user_id);
    let musicList = null;
    let sample = null;

    // Query para musicas
    let SQL = "SELECT * FROM musica WHERE usu_id = ?";

    try {
        const result = await db.query(SQL, [user_id]);

        if (result) {
            if (result.length === 0) {
                res.status(404).send("Music not found");
                return;
            }
            
            // tratando os o destino
            result[0].forEach(element => {
                element.mus_capa = `http://localhost:3006/music/coverMusic/${path.basename(element.mus_capa)}`;
                element.mus_audio = `http://localhost:3006/music/${path.basename(element.mus_audio)}`;
            });
            if(result.length > 0)
                res.send(result[0]);
            else{
                res.send(null);
            }
                
        }
    } catch (er) {
        console.error(`--> erro: ${er}`);
    }
});

app.get("/exbNameTest", async (req, res) => { // Rota para teste no nome de exibição do usuario para cadastro
    console.log('\n/exbNameTest\n');

    const {exbName} = req.query;
    console.log('\n>Nome de exibição para teste: ', exbName);   
   
    console.log('\n\n>Iniciando teste...');
    try {
        let SQL = "SELECT usu_nome FROM usuario WHERE usu_nomeExb = ?";
        const testResult = await db.query(SQL, [exbName]);
        console.log('>Teste concluido');

        if(testResult[0].length > 0){ // caso encontrar algum usuario
            console.log('\nUsuario com mesmo nome encontrado');
            res.send(true);
        }else{
            console.log('\nNenhum usuario com mesmo nome encontrado');
            res.send(false);
        }
    } catch (er) {
        console.error('\n\n--->erro: ', er)
    }
    
    
});

app.get("/usernameTest", async (req, res) => {
    console.log('\n/usernameTest\n');
    
    const {username} = req.query;
    console.log('\n>Nome de exibição para teste: ', username);   
   
    console.log('\n\n>Iniciando teste...');
    try {
        let SQL = "SELECT usu_nome FROM usuario WHERE usu_nomeContato = ?";
        const testResult = await db.query(SQL, [username]);
        console.log('>Teste concluido');

        if(testResult[0].length > 0){ // caso encontrar algum usuario
            console.log('\nUsuario com mesmo @ encontrado');
            res.send(true);
        }else{
            console.log('\nNenhum usuario com mesmo @ encontrado');
            res.send(false);
        }
    } catch (er) {
        console.error('\n\n--->erro: ', er)
    }
});

app.get("/phoneNumberTest", async (req, res) => {
    console.log('\n/phoneNumberTest\n');
    
    const {phoneNumber} = req.query;
    console.log('\n>Número de telefone para teste: ', phoneNumber);   
   
    console.log('\n\n>Iniciando teste...');
    try {
        let SQL = "SELECT usu_nome FROM usuario WHERE usu_telefone = ?";
        const testResult = await db.query(SQL, [phoneNumber]);
        console.log('>Teste concluido');

        if(testResult[0].length > 0){ // caso encontrar algum usuario
            console.log('\nNúmero de telefone já utilizado');
            res.send(true);
        }else{
            console.log('\nNenhum usuario com mesmo telefone encontrado');
            res.send(false);
        }
    } catch (er) {
        console.error('\n\n--->erro: ', er)
    }
});

app.delete("/delete/:mus_id", authenticateToken, async (req, res) => {
    const { mus_id } = req.params;
    console.log('\n\n--> /delete \n');
    console.log('mus_id: ', mus_id);

    try {
        // query para delete dos arquivos de sample no servidor
        let getFileNamesQuery = "SELECT sam_audio FROM sample WHERE mus_id = ?";
        const sampleFileNames = await db.query(getFileNamesQuery, [mus_id]);
        // console.log('-->sampleFileNames: \n', sampleFileNames);
        for (const sampleFileName of sampleFileNames[0]) { // verificar e apagar as samples 
            const { sam_audio } = sampleFileName;
            if (sam_audio) {
                const sampleFilePath = path.join(sam_audio);
                fs.unlinkSync(sampleFilePath);
                console.log("Deletando arquivo de sample: ", sampleFilePath);
            }
        }
        
        let SQL = "DELETE FROM sample WHERE mus_id = ?";
        await db.query(SQL, [mus_id]);

        // query para 
        getFileNamesQuery = "SELECT mus_audio, mus_capa FROM musica WHERE mus_id = ?";
        const musicFileNames = await db.query(getFileNamesQuery, [mus_id]);
        // console.log('--> musicFileNames: \n', musicFileNames);
        for (const musicFileName of musicFileNames) {
            const { mus_audio, mus_capa } = musicFileName[0];
            if (mus_audio) {
                const audioFilePath = path.join(mus_audio);
                fs.unlinkSync(audioFilePath);
                console.log("\n-Deleted audio file:", audioFilePath);
            }
            if (mus_capa) {
                console.log('\n(TEST) --> mus_capa: ', mus_capa);
                const coverFilePath = path.join(mus_capa);
                fs.unlinkSync(coverFilePath);
                console.log("-Deleted cover file:", coverFilePath);
            }
        }

        SQL = "DELETE FROM musica WHERE mus_id = ?";
        await db.query(SQL, [mus_id]);
        res.status(200).send("Música deletada com sucesso");
    } catch (error) {
        console.error("Erro ao deletar música:", error);
        res.status(500).send("Erro interno do servidor ao deletar música");
    }
});

app.put("/editMusic", authenticateToken, upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'sample1', maxCount: 1 },
    { name: 'sample2', maxCount: 1 },
    { name: 'sample3', maxCount: 1 },
    { name: 'sample4', maxCount: 1 },
    { name: 'capa', maxCount: 1 }
]), async (req, res) => {
    console.log('\n\n/editMusic');
    const body = req.body;
    const files = req.files;
    if (!body || !files) return res.status(400).send('Preencha todos os campos do formulário!');

    try {
        // console.log('\n\n>>body\n', body);
        // console.log('\n\n>>files\n', files);
        const capaFile = files.capa ? files.capa[0] : null;
        
        // Caminhos dos arquivos de áudio e capa
        const audioFile = files.audio ? files.audio[0] : null;
        const audioFileName = audioFile ? `${audioFile.destination}\\${audioFile.filename}` : null;
        const capaFileName = capaFile ? `${capaFile.destination}\\${capaFile.filename}` : null;
      
        // Inicialização da SQL dinâmica e do array de parâmetros
        let SQL = "UPDATE musica SET";
        let params = [];
      
        // Construção da SQL dinâmica e do array de parâmetros
        for (let key in body) {            
          if (key !== "usu_token" && key !== "mus_id" && key !== "capa" && key !== "audio" && body[key] !== undefined && body[key]) {
            SQL += ` mus_${key} = ?,`;
            params.push(body[key]); // Adiciona o valor do campo ao array de parâmetros
          }
        }
      
        // Adiciona campos de arquivos (audio e capa) à SQL e ao array de parâmetros
        if (audioFileName || audioFileName !== null) {
          SQL += ` mus_audio = ?,`;
          params.push(audioFileName);

          // Apagar o arquivo atual do server
          const currentFIle = await db.query("SELECT mus_audio FROM musica WHERE mus_id = ?", [body.mus_id]);
          if(currentFIle){
            console.log('>Deletando arquivo de audio: ', currentFIle[0][0]);
            const fileToDelete = currentFIle[0][0].mus_audio;
            fs.unlinkSync(fileToDelete);
            console.log('>Arquivo deletado\n');
          }
        }
      
        if (capaFileName || capaFileName !== null) {
          SQL += ` mus_capa = ?,`;
          params.push(capaFileName);
          
          // Apagar o arquivo atual do server
          const currentFIle = await db.query("SELECT mus_capa FROM musica WHERE mus_id = ?", [body.mus_id]);
          if(currentFIle){
            console.log('>Deletando arquivo de audio: ', currentFIle[0][0]);
            const fileToDelete = currentFIle[0][0].mus_capa;
            fs.unlinkSync(fileToDelete);
            console.log('>Arquivo deletado\n');
          }
        }
      
        SQL = SQL.slice(0, -1); // Remove a última vírgula da query SQL, se houver
        SQL += " WHERE mus_id = ?";
        params.push(body.mus_id); // Adiciona o mus_id ao final do array de parâmetros      
        // console.log('SQL: ', SQL);
        // console.log('Array: ', params);
      
        // Executar a query no banco de dados
        const resp = await db.query(SQL, params);
        console.log('>Tabela musica atualizada..\n');
      
        // Verificar se a sample foi alterada para apagar o arquivo original do server
        const sampleRequire = [];
        const sampleFiles = [];
        for (const key in files) {
          sampleRequire.push(files[key][0]); // Guarda as informações do arquivo da sample nova
        }
      
        if (sampleRequire.length > 0) {
          const sampleType = ['Vocal', 'Percussão', 'Baixo', 'Synth/ Piano'];
          console.log('>Preparando o insert das samples...');
          sampleRequire.forEach((file, index) => {
            console.log(index + 1, ' - ', file.originalname);
            const fieldName = file.fieldname; // Salvar o fieldName para teste
            let sampleIndex = fieldName.replace('sample', '');
            sampleIndex--;
            if (fieldName.startsWith('sample')) { // Verificar se o arquivo começa com sample
              file.fieldname = sampleType[sampleIndex];
              // sampleType.splice(0, 1); // Remove o primeiro item
              sampleFiles.push(file); // Salva na lista de samples para o insert
            }
          });
          console.log('>Sample(s) preparadas');
      
          let originalSampleList = await db.query("SELECT sam_audio, sam_tipo FROM sample WHERE mus_id = ?", body.mus_id);
          originalSampleList = originalSampleList[0].map(sample => sample);
      
          // Alterar destino da sample -> atualizar Db -> remover arquivo do server
          sampleFiles.map(item => {
            let isUpdate = false;
            console.log('\n>Verificando sample:\n', item.originalname);
            console.log('\n>Destino:\n', item.path);
            console.log('\n\n>Alterando destino');
            item.destination = `${samplePath}\\${item.filename}`; // Alterando destino
      
            // Alterando no banco de dados e apagando os arquivos antigos de sample do servidor e 
            if (originalSampleList.length > 0) { // Verificar se há alguma sample do mesmo tipo cadastrado
              originalSampleList.map(sample => {
                if (sample.sam_tipo === item.fieldname) {
                  console.log('\n>Sample do mesmo tipo encontrada\nIniciando UPDATE...');
                  const updateResult = db.query("UPDATE sample SET sam_audio = ? WHERE sam_tipo = ? AND mus_id = ?", [item.destination, item.fieldname, body.mus_id]);
                  console.log('>Apagando arquivo: ', sample.sam_audio);
                  fs.unlinkSync(sample.sam_audio);
                  isUpdate = true;
                  console.log('UPDATE concluído');
                  return;
                }
              });
      
              if (!isUpdate) {
                console.log('>Nenhuma sample do mesmo tipo encontrada.\n>Iniciando INSERT da nova sample...');
                const insertResult = db.query("INSERT INTO sample (sam_audio, sam_tipo, mus_id) VALUES (?, ?, ?)", [item.destination, item.fieldname, body.mus_id]);
                console.log('INSERT concluído');
              }
            } else {
              // Caso não tenha nenhuma sample registrada no banco
              console.log('>Nenhuma sample encontrada no banco.\n>Iniciando INSERT da nova sample...');
              const insertResult = db.query("INSERT INTO sample (sam_audio, sam_tipo, mus_id) VALUES (?, ?, ?)", [item.destination, item.fieldname, body.mus_id]);
              console.log('INSERT concluído');
            }
          });
          console.log('\n>Update concluído!');
        }
      } catch (er) {
        console.error('>>Erro ao tentar editar música\n-->Erro: ', er);
      }
      

    // console.log('files\n', files);
    // console.log('body\n', body);
});

app.put("/editMidia", authenticateToken, async (req, res) => {
    console.log('\n\n/editMidia\n');
    const body = req.body.midiaForm; // formulario de ProfileEdit
    const usu_id = req.body.usu_id;
    console.log('body:\n', body);

    console.log('>>Iniciando update de midia(s)..');
    if(body){
        try{
            let SQL = "UPDATE usuario SET usu_instagram = ?, usu_x = ?, usu_youtube = ?, usu_soundcloud = ?, usu_spotify = ? WHERE usu_id = ?";
            const result = await db.query(SQL, [body.instagram, body.x, body.youtube, body.soundcloud, body.spotify, usu_id]);
            console.log('>>Update feito com sucesso!\n\n');
        }catch(er){
            console.error('\n>>Erro no update de midia(s)!!\n\nErro: ', er);
        }
    }
});

app.put("/editProfile", authenticateToken, upload.fields([
    { name: 'imagem', maxCount: 1 }
]), async (req, res) => {
    console.log('\n\n/editProfile\n');
    const files = req.files;
    const body = req.body;

    // verificar se a um arquivo > apagar o arquivo antigo do servidor > atualizar tabela do db
    if(files.imagem){
        try{
            let SQL = "SELECT usu_image FROM usuario WHERE usu_id = ?";
            const selectResult = await db.query(SQL, [body.usu_id]);

            if(selectResult[0][0]){
                console.log('selectResult: ', selectResult[0][0]);
                const deleteImagePath = selectResult[0][0].usu_image;
                console.log('\n>Apagando arquivo de imagem: ', deleteImagePath);
                if(deleteImagePath){
                    fs.unlinkSync(deleteImagePath);
                    console.log('>Arquivo deletado');
                }else
                    console.log('>Nenhuma imagem encontrada');
                
            }

            const imageDestination = `${files.imagem[0].destination}\\${files.imagem[0].filename}`
            // console.log('imageDestination: ', imageDestination);
            files.imagem[0].destination = imageDestination;
            SQL = "UPDATE usuario SET usu_image = ? WHERE usu_id = ?";
            console.log('\n>Atualizando imagem');
            const updateResult = await db.query(SQL, [files.imagem[0].destination, body.usu_id]);
            console.log('Atualização completa');
            
        }catch(er){
            res.status(500).send("Erro no update do arquivo");
            console.error('\n\n>Erro no Select\nErro: ', er);
        }        
    }

    try{
        let SQL = "UPDATE usuario SET usu_nomeExb = ?, usu_sobre = ? WHERE usu_id = ?";
        console.log('Atualizando dados');
        const updateResult = await db.query(SQL, [body.username, body.about, body.usu_id]);
        console.log('Atualização completa');
    }catch(er){
        res.status(500).send("Erro no update dos dados");
        console.error('\n\n>Erro no Update\nErro: ', er);
    }

    res.status(200).send("Edição completa");
})

// Porta que o servidor ira ouvir
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`SERVER PORT: ${PORT}`);
});

// app.get = requisição para pegar valores
// app.post = requisição para enviar valores
// app.delete = requisição para deletar valores
