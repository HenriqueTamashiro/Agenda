const express = require('express');
const app = express();
require('dotenv').config()// necessita para utilizar o process.env



const mongoose = require('mongoose');// retorna uma promisse
mongoose.connect(process.env.DB_URL)
.then(()=>{
    app.emit('Online');
     console.log('DB carregado com sucesso!')
})
.catch((e)=> {
    console.log(e)
});

const session = require('express-session');//Reconhecimento de sessões
const mongo = require('connect-mongo');//Banco de Dados
const flash = require('connect-flash');// mensagens rápidas que não ficam salvas


const routes = require('./routes')
// const middleware = require('./src/middlewares/middleware') 
const {middlewareGlobal, middlewareSecundario, checkCSRF, csrfMiddleware} = require('./src/middlewares/middleware')
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');

app.use(helmet())
app.use(express.urlencoded({extended:true}));//se não houver esta tratativa, o req.body(url) será undefined
app.use(express.static(path.resolve(__dirname,'public')));
const sessionOpt = session({// Criação do cookie de sessão no DB e sua configuração
    secret: '23qer1t0acx3a65280394é1epmA643ndaí523',
    store: mongo.create({mongoUrl:process.env.DB_URL}),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60,
        httpOnly:true
    }
});


app.use(sessionOpt);
app.use(flash())
app.set('views', path.resolve(__dirname, 'src', 'views'));//pode ser o caminho relativo('./src/views')
app.set('view engine', 'ejs');

app.use(csrf());

//middlewares

app.use(middlewareGlobal);
app.use(checkCSRF);
app.use(csrfMiddleware);
app.use(routes);//criar as rotas em routes.js






app.on('Online', ()=>{
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
})

