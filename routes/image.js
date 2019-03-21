var Router = require('restify-router').Router
var fs = require('fs')
const serveStatic = require('serve-static-restify')

const router = new Router()

router.get('/orders/:username', (req, res, next) => {
	const order_folder = 'order/'
	var regex = req.params.username + "(.*)\\w+"
	var files = []
	fs.readdirSync(order_folder).forEach(file => {
		var match = file.match(regex)
		if (match) {
			var fileName = order_folder + match[0]
			files.push(fileName)
		}
	})
	if (files.length === 0){
		res.status(500)
		res.send('Nothing')
		return next()
	}
	res.status(200)
	res.send(files)
	return next()
})

router.get("/order/:file", (req, res, next) => {
	var fileName = "./order/" + req.params.file
	fs.readFile(fileName, function(err, file) {
		if (err) {
			res.status(500)
			res.send("Error while getting image")
			return next()
		}
		res.status(200)
		res.write(file)
		res.end()
		return next()
	})
})

module.exports = {
	router
}
