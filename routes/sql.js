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
	    		}),
            connect_to_db: async function (sql_query, params)
            {
                let con = mysql.createConnection({
                    host     : 'epicare.fr',
                    user     : 'back',
                    password : 'n*5}?Y+S]92tGF,',
                    database : 'back'
                });

                con.connect((err)=> {
                    if (err){
                        console.log("Problem connecting to the DB!");
                        return;
                    }
                    console.log("Connected to the DB!");
                });

                var result
                await con.query(sql_query, params, (err, res, field) => {
                    result = res
                    console.log("----------------->" + res)
                });
                console.log("RESULT ======>" + result)
                return result
            }
        }
}
