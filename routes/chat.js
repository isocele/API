var Router = require('restify-router').Router
var fs = require('fs')
const sql = require('./sql')


const router = new Router() //Router

/**
 * Upload route for order
 **/
router.post('/send_message', (req, res, next) => {
	console.log(req.body)

	if (!req.body || !req.body.target) {
		res.send("Missing target (field 'target')")
		return next()
	}

	if (!req.body.message) {
		res.send("Message cannot be empty (field 'message')")
		return next()
	}

	if (!req.body.sender) {
		res.send("Who the fuck sent this?! (field 'sender')")
		return next()
	}
	var target = req.body.target
	var sender = req.body.sender
	var message = req.body.message

	const queryString = "INSERT INTO messages (sender, target, message) VALUES (?, ?, ?)"
	sql.db.get.query(queryString, [sender, target, message], function (error, rows, fields) {
		if (error) {
			console.log(error)
			return
		} else {
			console.log("Succesfully sent you message ! Yay !")
		}
	});
	res.send("Message sent")
	next()
});

router.get('/get_message/:username',(req, res, next) => {
	var username = req.params.username

	const queryString = "SELECT * FROM (SELECT * FROM messages WHERE target=? ORDER BY id DESC LIMIT 10) sub ORDER BY id ASC"

	sql.db.get.query(queryString, [username], function (err, result, fields) {
		if (err) {
			console.log(err)
			return next()
		} else {
			res.send(result)
		}
	})
})

module.exports = {
	router
}
