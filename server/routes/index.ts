import Koa from 'koa';

import { userRouter } from './user';

export const setupRoutes = (app: Koa): void => {
    app.use(userRouter.routes()).use(userRouter.allowedMethods());
};
