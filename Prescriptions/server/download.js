/*
**
* crypto used for hash algorithms
* @type {any}
*/
const crypto = require('crypto');

/**
 * Requiring file system used for creating folder and writing in file
 * @type {any}
 */
const fs = require("fs");

/**
 * Koa-send used to serve static files
 * @type {any}
 */
const send = require('koa-send');

const Globals = require('../../Globals');
const User = Globals.schemas.User;


/**
 * TEST TOKEN: 24ff7e0d839a877695857e9739437f68e9868731
 * @param router
 * @returns {Promise<void>}
 * @constructor
 */
async function Download(router) {

    router.get("/download", async ctx => {
        if (!ctx.query.token) {
            ctx.status = 400;
            return ctx.body = "Error: Missing parameters."
        }

        let currentUser = undefined;
        const token = ctx.query.token;
        /// Checks whether or not the user exists. If he doesn't, disconnect
        await User.findOne({ token: token }, (err, user) => {
            if (err || !user)
                ctx.status = 502;
            else
                currentUser = { name: user.name, email: user.email, id: user._id };
        });

        console.log(currentUser);

        if (!currentUser)
            return ctx.body = "Error: Unknown user.";

        const hashedUsername = crypto.createHash('sha1').update(currentUser.name).digest('hex');
        const folderName = "./Prescriptions_files/" + hashedUsername;

        let prescriptions = {"Files": []};
        try {
            fs.readdirSync(folderName).forEach(file => {
                const extension = file.substring(file.lastIndexOf('.'), file.length);
                if (extension === ".png" || extension === ".jpg") {
                    prescriptions.Files.push({
                        name : file,
                        extension : extension
                    });
                }
            });
        } catch (err) {
            ctx.status = 200;
            if (err.code === "ENOENT")
                return ctx.body = "User has no active prescriptions";
            return ctx.body = err
        }
        ctx.status = 200;
        return ctx.body = prescriptions
    });

    router.get("/download/:filename", async ctx => {
        if (!ctx.params.filename) {
            ctx.status = 502;
            return ctx.body = "Error missing filename or token"
        }

        let currentUser = undefined;
        const token = ctx.query.token;
        /// Checks whether or not the user exists. If he doesn't, disconnect
        await User.findOne({ token: token }, (err, user) => {
            if (err || !user)
                ctx.status = 502;
            else
                currentUser = { name: user.name, email: user.email, id: user._id };
        });

        if (!currentUser)
            return ctx.body = "Invalid token";

        const hashedUsername = crypto.createHash('sha1').update(currentUser.name).digest('hex');
        const folderName = "./Prescriptions_files/" + hashedUsername;
        const filePath = folderName + "/" + ctx.params.filename;

        if (!fs.existsSync(filePath)) {
            ctx.status = 502;
            return ctx.body = "File not found, please try again"
        }
        await send(ctx, filePath);
        ctx.status = 200;
        return ctx.body
    })

}

module.exports = Download;