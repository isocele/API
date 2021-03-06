/**
 * Http app to accept socketIO
 * Runs on a Koa app's callback
 * Runs on port 8081 by default
 */

/// Creating the App, using Koa
const Koa = require('koa');
const app = new Koa();

/// Creating the router
const koarouter = require('koa-router');
const router = new koarouter();

/// Setting the router
app.use(router.routes()).use(router.allowedMethods());

/// Creating default route
router.get('/', async (ctx) => {
	ctx.status = 200;
	return ctx.body = 'You are on Epicare\'s Chat service';
});

/// Mounting the http server on the Koa app, setting default port to 8081
const http = require('http').createServer(app.callback());
const PORT = process.env.PORT || 8081;

http.listen(PORT, () => {
    console.log('Listening on ' + PORT);
});

/// Requires the socket functions
require('./server/sockets')(http);
