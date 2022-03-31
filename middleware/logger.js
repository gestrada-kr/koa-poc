const pino = require('pino');

// Structured logger middleware
const logger = (opts, destination) => {
    // initialize logger once...
    const logger = pino(opts, destination);
    // Use a closure to capture the logger in the rest of the middleware
    return async (ctx, next) => {
        const start = performance.now();
        ctx.log = logger;
        await next();
        ctx.log.info({
            method: ctx.method,
            status: ctx.status,
            path: ctx.url.split('?')[0],
            query: ctx.query,
            params: ctx.params,
            elapsed: `${(performance.now() - start).toFixed(3)}ms`,
        });
    }
};


module.exports = logger;