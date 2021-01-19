import Router from '@koa/router';

export const userRouter = new Router();

userRouter.post('/user', (ctx) => {
    ctx.body = { user: 'VIP' };
});
