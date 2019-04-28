const restify = require('restify')

const upload = require('./routes/upload')
const image = require('./routes/image')

var Router = require('restify-router').Router
var routerInstance = new Router()

const server = restify.createServer({
	name: 'Epicare',
	version: '0.0.1',
	accept: ['image/png', 'image/jpg']
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

function respond(req, res, next) {
	res.send(req.params)
	next()
}

upload.router.applyRoutes(server)
image.router.applyRoutes(server)

server.listen(8082, function () {
	console.log('%s listening at %s', server.name, server.url)
})

module.exports = server
