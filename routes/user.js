/**
 *      Require
 *          Auth Functions (signin & login)
 *          Router to create route
 */
const Auth = require('./auth.js')
var Router = require('restify-router').Router

/**
 *      Creating Router
 */
const router = new Router()

/**
 *      Post Method SignUp
 *          Req : Email & Username & Password
 *          Res :
 *              success
 *                  True : User has been successfully created
 *                  False : An Error has occured (see bellow)
 *              username
 *                  true : Unvalid Username
 *                  false : Valid Username
 *              password
 *                  true : Unvalid Password
 *                  false : Valid Password
 *              email
 *                  true : Unvalid Email
 *                  false : Valid Email
 *              Mysql
 *                  true : An error has occured with mysql Database
 *                  false : No error from mysql Database
 */
router.post('/signup', (req, res, next) => {
    console.log("SignUP Post Method")
    // verif si body null
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    Auth.signup(info = {username, password, email}, res = res)
    next()
});

/**
 *      Post Method LogIn
 *          Req : Username & Password
 *          Res :
 *              success
 *                  true : User successfully LogIn
 *                  false : Wrong Username or Password
 */
router.post('/login', (req, res, next) => {
    console.log("LogIn Post Method")
    const username = req.body.username
    const password = req.body.password

    Auth.login(info = {username, password}, res = res)
    next()
});

/**
 *      Export the user Routes
 * @type {{router: *}}
 */
module.exports = {
    router
}
