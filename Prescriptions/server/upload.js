
/**
 * Requiring file system used for creating folder and writing in file
 * @type {any}
 */
const fs = require("fs");

/**
 * crypto used for hash algorithms
 * @type {any}
 */
const crypto = require('crypto');

async function Upload(router) {

    /**
     * Route to upload prescriptions
     */
    router.post("/upload", async ctx => {
        const file = ctx.request.files.img;
        const username = ctx.request.headers.username;

        if (!username) {
            ctx.status = 502;
            return ctx.body = "Error missing username.";
        } else if (!file) {
            ctx.status = 502;
            return ctx.body = "Error missing file prescription."
        }

        ctx.status = registerFile(file.path, username);
        if (ctx.status !== 500) {
            return ctx.body = "Error while getting your prescription, please try again later"
        }
        return ctx.body = "File uploaded";
    });

    let /**
     * function to register a file
     * @param filePath
     * @param username
     */
    registerFile = function (filePath, username) {
        // hash username for folder name
        const hashedUsername = crypto.createHash('sha1').update(username).digest('hex');
        const dirName = "./Prescriptions_files/";
        const dirPath = dirName + hashedUsername;
        // if directory does not exist, create it
        if (!fs.existsSync(dirPath)) {
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName)
            }
            fs.mkdirSync(dirPath);
        }
        // Get date to create a file with the date.
        const date = new Date();
        const formatted_date = date.getDay() + '-'
            + date.getMonth() + '-'
            + date.getFullYear() + '-'
            + date.getHours() + ':'
            + date.getMinutes() + ':'
            + date.getSeconds();
        // Create file path using date and dirpath
        const newFilePath = dirPath + "/" + formatted_date + ".png";
        // Read content of upload file
        const fileContent = fs.readFileSync(filePath);
        // Write content of uploaded file
        fs.writeFile(newFilePath, fileContent, function (err) {
            if (err) {
                return 502;
            } else {
                return 500;
            }
        });
        return 500;
    };
}

module.exports = Upload;