/// Getting the env and every databases
const Globals = require('../Globals');
const env = Globals.env;
const User = Globals.schemas.User;

/// Creating the App, using Koa
const koa = require('koa');
const app = new koa();

/// Adding control over requests
app.use(async (ctx, next) => {
	ctx.set('Access-Control-Allow-Origin', 'null');
	ctx.set('Access-Control-Allow-Credentials', 'true');
	await next();
});

/// Requires a bodyParser to get the body from each Request
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

/// Adding CORS security
const cors = require('@koa/cors');
app.use(cors());

/// Setting the logger if in development mode
const logger = require('koa-logger');
if (env.logger)	app.use(logger());

/// Creating the router
const koarouter = require('koa-router');
const router = new koarouter();

/// Setting the router
app.use(router.routes()).use(router.allowedMethods());

/// Creating default route
router.get('/', async (ctx) => {
	ctx.status = 200;
	return ctx.body = 'You are on Epicare\'s API';
});

/// Creating the server, setting default port to 8080
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, async () => {
	console.log('Server is now running on ' + PORT);
});

/// Requiring every other file, and sending the required databases
require('./server/auth')(router, User);
//require('./server/users')(router, User);

/// Exporting the server for the tests
module.exports = server;