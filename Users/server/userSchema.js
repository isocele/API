/// Connection to mongoose, depending on the environment
const mongoose = require('mongoose');
mongoose.connect(env.mongo, {
	useNewUrlParser: true
});

/// Default user model, stocked on mongoose
const userSchema = mongoose.Schema({
	name: String,
	last_name: String,
	email: String,
	password: String,
	active: Boolean,
	token: String
});

/// Chat history model, containing the user's id and his logs
/* const historySchema = mongoose.Schema({
	userId: String,
	logs: [String]
}); */

let User = mongoose.model('User', userSchema);
//let History = mongoose.model('History', historySchema);

module.exports = User;