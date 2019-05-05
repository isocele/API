/**
 * Koa
 * @type {module.Application|*}
 */
const Koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const router = new koaRouter();

/**
 * Creating koa app
 * @type {module.Application}
 */
const app = new Koa();

app.use(koaBody({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(8080);

/// Creating default route
router.get('/', async (ctx) => {
    ctx.status = 200;
    return ctx.body = 'You are on Epicare\'s prescriptions service';
});

require('./server/upload')(router);
require('./server/download')(router);