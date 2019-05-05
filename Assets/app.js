/**
 * Basic express app to serve static files, available on assets.epicare.fr
 * Runs on port 8084 by default
 * Files must be in the public directory
 */

/// Creating the App, using Koa
const koa = require('koa');
const app = new koa();

/// Adding CORS security
const cors = require('@koa/cors');
app.use(cors());

/// Adding control over requests
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'null');
	ctx.set('Access-Control-Allow-Credentials', 'true');
	await next();
});

/// Creating the router
const koarouter = require('koa-router');
const router = new koarouter();

/// Setting the router
app.use(router.routes()).use(router.allowedMethods());

/// Creating default route
router.get('/', async (ctx) => {
	ctx.status = 200;
	return ctx.body = 'You are on Epicare\'s Assets service';
});

/// Requires Koa-static, allowing to serve static files
const serve = require('koa-static');
app.use(serve(__dirname + '/public/'));

/// Creating the server, setting default port to 8083
const PORT = process.env.PORT || 8083;
const server = app.listen(PORT, async () => {
	console.log('Server is now running on ' + PORT);
});

module.exports = server;