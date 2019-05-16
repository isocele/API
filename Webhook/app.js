/**
 * Koa
 * @type {module.Application|*}
 */
const Koa = require("koa");
const koaRouter = require("koa-router");
const koaBody = require("koa-body");
const bodyParser = require('koa-bodyparser');

const router = new koaRouter();

/**
 * Creating koa app
 * @type {module.Application}
 */
const app = new Koa();

app.use(koaBody({ multipart: true }));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(bodyParser());

const PORT = process.env.PORT || 8084;
app.listen(PORT);

/// Creating default route
router.post('/', async (ctx) => {
    ctx.status = 200;
    let exec = require('child_process').exec;

    exec('./reload.sh',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
});

router.get('/', async (ctx) => {
    ctx.status = 200;
    return ctx.body = 'You are on Epicare\'s prescriptions service';
});