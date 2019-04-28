/**
 * Allows connection to a different database depending on the environment
 */

let environments = {
	prod: {
		mongo: 'mongodb://epicare.fr:27017/epicare',
		logger: false
	},
	dev: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: true
	},
	test: {
		mongo: 'mongodb://epicare.fr:27017/epicare_test',
		logger: false
	}
}

let mode = process.env.NODE_ENV;
    env = environments[mode];

module.exports = env;