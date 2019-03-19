var mysql = require('mysql');

module.exports = {
    name: 'rest-api',
    hostname : 'http://localhost',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db: {
            get : mysql.createConnection({
	    			host     : 'epicare.fr',
	    			user     : 'back',
	    			password : 'n*5}?Y+S]92tGF,',
	    			database : 'back'
	    		})
        }
}
