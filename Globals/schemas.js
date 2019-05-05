/// Connection to mongoose, depending on the environment
const env = require('./env');

const mongoose = require('mongoose');
mongoose.connect(env.mongo, {
    useNewUrlParser: true,
    useFindAndModify: false
});

/// Default user model, stocked on mongoose
const userSchema = mongoose.Schema({
	name: String,
	last_name: String,
	email: String,
	password: String,
	active: Boolean,
    token: String,
    refreshToken: String,
    type: String,
    contacts: Object
});

const chatSchema = mongoose.Schema({
	firstUser: Object,
	secondUser: Object,
	logs: Array
});

let User = mongoose.model('User', userSchema);
let Chat = mongoose.model('Chat', chatSchema);

module.exports = {
    User,
    Chat
};