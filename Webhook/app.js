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

const PORT = process.env.PORT || 8084;
app.listen(PORT);

/// Creating default route
router.post('/', async (ctx) => {
    console.log(ctx.body);
    ctx.status = 200;
    return ctx.body = 'You are on Epicare\'s prescriptions service';
});