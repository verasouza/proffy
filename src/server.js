const {pageLanding, pageStudy, pageGiveClasses, saveClasses, pageSucess} = require('./pages')

const express = require('express');
const server = express();
const nunjucks = require('nunjucks');

//configurar nunjucks
nunjucks.configure('src/views', {
    express:server,
    noCache: true,
})


server
.use(express.urlencoded({extended: true}))
//configurar arquivos estaticos(css, scripts, imagens)
.use(express.static("public"))
//rotas da aplicação
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .get("/sucess", pageSucess)
    .listen(5000)