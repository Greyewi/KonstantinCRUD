const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();

app.use(cors());
app.use(koaBody({json: true}));

const notes = [];
let nextId = 1;

const router = new Router();

router.get('/notes', async (ctx, next) => {
    ctx.response.body = notes;
});

router.get('/note', async (ctx, next) => { // Получаем данные через GET параметры
    const query = ctx.request.query
    ctx.response.body = notes[query.id];
});

router.post('/notes', async(ctx, next) => { // Получаем данные через тело запроса
    const newNote = {...ctx.request.body, id: nextId++}
    notes.push(newNote);
    ctx.response.body = newNote;
});

router.delete('/notes/:id', async(ctx, next) => { // Получаем данные через URL параметры
    const noteId = Number(ctx.params.id);
    const index = notes.findIndex(o => o.id === noteId);
    if (index !== -1) {
        notes.splice(index, 1);
    }
    ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started on 7777 port'));