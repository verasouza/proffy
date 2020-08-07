const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

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
    .listen(5000)