/**
 * Allows connection to a different database depending on the environment
 */

let environments = {
	prod: {
		mongo: 'mongodb://epicare.fr:27017/epicare',
		logger: false,
		socketOrigins: '*:*' /// I should set something like [chat.epicare.fr]
	},
	dev: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: true,
		socketOrigins: '*:*'
	},
	test: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: false,
		socketOrigins: '*:*'
	}
}

let mode = process.env.NODE_ENV;
    env = environments[mode];

module.exports = env;