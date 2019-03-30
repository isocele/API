/**
 *      Require
 *          Auth Functions (signin & login)
 *          Router to create route
 */
const Auth = require('./auth.js')
var Router = require('restify-router').Router
var sql = require('./sql')
var sha1 = require('sha1');

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
    if (!req.body || !req.body.username || !req.body.password)
    {
        res.status(500)
        res.send("Missing a field {body: {username: '', password: ''}}")
    }
    const username = req.body.username
    const password = req.body.password

    Auth.login(info = {username, password}, res = res)
    next()
});

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

async function generateToken(res, username) {
    var toke = username + getRandomArbitrary(100000, 9999999).toString()
    var tok = sha1(toke).substring(5, 30)

    var queryString = "insert into forgot_pass (email, token) values (?, ?)"
    sql.db.get.query(queryString, [username, tok], await function (error, result, fields) {
        if (error) {
            res.status(500)
            res.send('ERROR SQL')
        } else {
            console.log("Success adding token to DB")
            res.status(200)
            res.send({token: tok})
        }
    });
}

router.get('/forgot_password', async (req, res, next) => {
    if (!req.query.email) {
        res.status(500)
        res.send("Error missing email")
        return next()
    }

    var queryString = "select email from users where email=?"
    sql.db.get.query(queryString, [req.query.email], await function (error, result, fields) {
        if (error || result.length === 0) {
            res.status(501)
            res.send('This email does not exist')
        } else {
            generateToken(res, result[0].email)
        }
    });
})

/**
 *      Export the user Routes
 * @type {{router: *}}
 */
module.exports = {
    router
}
