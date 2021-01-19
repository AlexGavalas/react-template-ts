import 'dotenv/config';

import Koa from 'koa';
import serve from 'koa-static';
import bodyParser from 'koa-bodyparser';

import { setupRoutes } from './routes';
import { registerErrorHandler } from './util/error-handler';

const app = new Koa();

app.use(bodyParser());

registerErrorHandler(app);

if (process.env.NODE_ENV === 'production') {
    app.use(serve('dist'));
}

setupRoutes(app);

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
