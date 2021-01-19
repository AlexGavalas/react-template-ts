import Koa from 'koa';

export const registerErrorHandler = (app: Koa): void => {
    app.use(async (ctx, next) => {
        try {
            await next();

            if (ctx.status === 404) ctx.throw(404);
        } catch (err) {
            ctx.status = err.status || 500;
            ctx.body = err.message;
            ctx.app.emit('error', err, ctx);
        }
    });

    app.on('error', (err) => {
        console.log('Server error', err.message);
    });
};
