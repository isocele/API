var Router = require('restify-router').Router
var fs = require('fs')

const router = new Router() //Router

/**
 * Upload route for order
 **/
router.post('/upload', (req, res, next) => {
	if (!req.body || !req.body.image || !req.body.username) {
		res.status(500)
		res.send('Error missing file')
		return next()
	}
	var uploaded_file_b64 = req.body.image
	var uploaded_file = Buffer.from(uploaded_file_b64,'base64');


	var username = req.body.username
	var extension = "jpg"
	var date = new Date() //Creating date for fileName
	var formatted_date = date.getDay() + '-'
		+ date.getMonth() + '-'
		+ date.getFullYear() + '-'
		+ date.getHours() + ':'
		+ date.getMinutes() + ':'
		+ date.getSeconds() + '.' + extension // Formatting date for fileName

// Reading fle
	var filepath = "order/" + username + formatted_date
	fs.writeFile(filepath, uploaded_file, (err) => {
		if (err) console.log("Error downloading file") // writing received file
	})
	res.status(200)
	res.send("Success")
	next() // next()
})

module.exports = {
	router
}
