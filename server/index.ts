import 'dotenv/config';

import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';

const app = new Koa();

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});

app.use(bodyParser());

if (process.env.NODE_ENV === 'production') {
    app.use(serve('dist'));
}
const router = new Router();

router.post('/test', (ctx) => {
    ctx.body = ctx.request.body;
});

app.on('error', (err) => {
    console.log('Server error', err.message);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
