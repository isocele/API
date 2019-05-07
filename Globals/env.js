/**
 * Allows connection to a different database depending on the environment
 */

let environments = {
	prod: {
		mongo: 'mongodb://epicare.fr:27017/epicare',
		logger: false,
        mail: true,
        socketOrigins: '*:*' /// I should set something like [chat.epicare.fr]
	},
	dev: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: true,
        mail: false,
        socketOrigins: '*:*'
	},
	test: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: false,
        mail: false,
        socketOrigins: '*:*'
	}
}

let mode = process.env.NODE_ENV;
let env = environments[mode];

module.exports = env;