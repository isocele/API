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

async function Download(router) {

    router.get("/download/:username", async ctx => {
        if (!ctx.params.username) {
            ctx.status = 502;
            return ctx.body = "Error missing Username"
        }
        const hashedUsername = crypto.createHash('sha1').update(ctx.params.username).digest('hex');
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
            ctx.status = 502;
            if (err.code === "ENOENT")
                return ctx.body = "User not found, or user has no active prescriptions";
            return ctx.body = err
        }
        ctx.status = 200;
        console.log(prescriptions);
        return ctx.body = prescriptions
    });

    router.get("/download/:username/:filename", async ctx => {
        if (!ctx.params.username || !ctx.params.filename) {
            ctx.status = 502;
            return ctx.body = "Error missing Username or filename"
        }

        const hashedUsername = crypto.createHash('sha1').update(ctx.params.username).digest('hex');
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