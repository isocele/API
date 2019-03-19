const sql = require('./sql')

/**
 *      SignUp Response for all SignUp call
 * @param _success      If User has SignIn (If false see why bellow)
 * @param _username     If Error has occured because of Username
 * @param _password     If Error has occured because of Password
 * @param _email        If Error has occured because of Email
 * @param _mysql        If Error has occured because of Mysql (User might already exist)
 * @returns {{password: boolean, success: boolean, mysql: boolean, email: boolean, username: boolean}}
 * @constructor
 */
function SignUpResponse(_success, _username = false, _password = false, _email = false, _mysql = false) {
    return {
        success: _success,
        username: _username,
        password: _password,
        email: _email,
        mysql: _mysql
    }
}
/**
 *      LogIn Response for all LogIn call
 * @param _success      If User has SignIn (If false see why bellow)
 * @param _user         If Error has occured because of Username or Password
 * @param _mysql        If Error has occured because of Mysql
 * @param _id           If success is true id is the user ID else -1
 * @returns {{success: boolean, id: (-1 if error / User ID if success), user: boolean, user: boolean}}
 * @constructor
 */
function LogInResponse(_success, _user = false, _mysql = false, _id = -1) {
    return {
        success: _success,
        user: _user,
        mysql: _mysql,
        id: _id
    }
}

module.exports = {
    /**
     *      Insert new user into mysql database
     * @param info (username, password, email)
     * @param res (SignUpResponse Function)
     */
    signup: function (info, res) {
        /**
         *      Check if username is Valid
         */
        if (!info.username || info.username.length < 4 || info.username.length > 15) {
            console.log("Unvalid username")
            res.send(SignUpResponse(false, true))
            return
        }
        /**
         *      Check if password is Valid
         */
        if (!info.password || info.password.length < 4 || info.password.length > 15) {
            console.log("Unvalid password")
            res.send(SignUpResponse(false, false, true))
            return
        }
        /**
         *      Check if email is Valid
         */
        if (!info.email) {
            console.log("Unvalid email")
            res.send(SignUpResponse(false, false, false, true))
            return
        }
        /**
         *      Try to create a new user in mysql database
         */
        const queryString = "INSERT INTO users (username, password, email, account_type) VALUES (?, ?, ?, 0)"
        sql.db.get.query(queryString, [info.username, info.password, info.email], function (error, rows, fields) {
            if (error) {
                console.log("Error : mysql")
                res.send(SignUpResponse(false, false, false, false, true))
                return
            } else {
                console.log("Succesfully added new user :" + info.username + " to databse")
            }
        });
        res.send(SignUpResponse(true))
    },

    /**
     *      LogIn User with DataBase
     * @param info (username, password)
     * @param res (LogInResponse Function)
     */
    login: function (info, res) {
        /**
         *      Check is Username & Password are both Valid
         */
        if (!info.username || !info.password) {
            console.log("Error LogIn : No username or Password")
            res.send(LogInResponse(false, true))
            return
        }
        /**
         *      Try to retrive user in DataBase & send Reponse
         */
        const queryString = "SELECT * FROM users WHERE username = ?";
        sql.db.get.query(queryString, [info.username], function (err, results, fields) {
            if (err) {
                error.mysql = 1;
                console.log("Error LogIn : mysql select fail.")
                res.send(LogInResponse(false, false, true))
            } else {
                if (results.length > 0) {
                    if (results[0].password == info.password) {
                        console.log("Success LogIn")
                        res.send(LogInResponse(true, false, false, results[0].id))
                    } else {
                        console.log("Error LogIn : Wrong Password")
                        res.send(LogInResponse(false, true))
                    }
                } else {
                    console.log("Error LogIn : Wrong Username")
                    res.send(LogInResponse(false, true))
                }
            }
        });
    }
};