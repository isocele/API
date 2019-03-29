var Router = require('restify-router').Router
var fs = require('fs')
const sql = require('./sql')


const router = new Router() //Router

/**
 * Upload route for order
 **/
router.post('/send_message', async (req, res, next) => {

	if (!req.body || !req.body.target) {
		res.status(500)
		res.send("Missing target (field 'target')")
		return next()
	}

	if (!req.body.message) {
		res.status(500)
		res.send("Message cannot be empty (field 'message')")
		return next()
	}

	if (!req.body.sender) {
		res.status(500)
		res.send("Who sent this? (field 'sender')")
		return next()
	}
	var target = req.body.target
	var sender = req.body.sender
	var message = req.body.message

	const queryString = "INSERT INTO messages (sender, target, message) VALUES (?, ?, ?)"
	await sql.db.get.query(queryString, [sender, target, message], function (error, rows, fields) {
		if (error) {
			console.log(error)
			res.status(500)
			res.send('SQL ERROR')
			return next()
		} else {
			res.status(203)
			res.send("Message sent")
			console.log("Succesfully sent you message ! Yay !")
			return next()
		}
	})
});

router.get('/get_message/:username',async (req, res, next) => {
	var username = req.params.username

	const queryString = "SELECT * FROM (SELECT * FROM messages WHERE target=? ORDER BY id DESC LIMIT 10) sub ORDER BY id ASC"

	await sql.db.get.query(queryString, [username], function (err, result, fields) {
		if (err || result.length <= 0) {
			res.status(500)
			res.send("Error")
			return next()
		} else {
			res.status(200)
			res.send(result)
		}
	})
})

module.exports = {
	router
}
