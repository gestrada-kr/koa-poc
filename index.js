'use strict';

const Koa = require('koa');
const Router = require('@koa/router');
const logger = require('./middleware/logger');

const app = new Koa();
const router = new Router();

// Import another middleware
app.use(logger());
// Error handling
app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {message: err.message};
    }
});
// standalone handler
const handler = async (ctx) => {
    if (ctx.params.name === 'error') {
        throw {status: 500, message: "Oh no! Something went wrong"}
    }
    ctx.status = 201;
    ctx.body = `Hello ${ctx.params.name}!`;
};
// Routing to handler
router.get("/hello/:name", async (ctx, next) => {
    await handler(ctx);
    await next();
});
// Using router
app.use(router.routes());
// After handler middleware
app.use((ctx, next) => ctx.status = 200);
// Listening
app.listen(3000);