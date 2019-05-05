
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

const User = require('../../Globals').schemas.User;

async function Upload(router) {

    /**
     * Route to upload prescriptions
     */
    router.post("/upload", async ctx => {
        const file = ctx.request.files.img;

        let currentUser = undefined;
        const token = ctx.query.token;
        /// Checks whether or not the user exists. If he doesn't, disconnect
        await User.findOne({ token: token }, (err, user) => {
            if (err || !user)
                ctx.status = 400;
            else
                currentUser = { name: user.name, email: user.email, id: user._id };
        });

        if (!currentUser)
            return ctx.body = "Error: Invalid token.";

        const username = currentUser.name;

        if (!file) {
            ctx.status = 400;
            return ctx.body = "Error: Missing file."
        }

        // Register the file uploaded
        ctx.status = registerFile(file.path, username);
        if (ctx.status !== 200) {
            return ctx.body = "Error: Disk full."
        }
        return ctx.body = "OK: File uploaded.";
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
        // Create file path using date and dirPath
        const newFilePath = dirPath + "/" + formatted_date + ".png";
        // Read content of upload file
        const fileContent = fs.readFileSync(filePath);
        let status = 200;
        // Write content of uploaded file
        fs.writeFile(newFilePath, fileContent, function (err) {
            if (err) {
                status = 502;
            }
        });
        return status;
    };
}

module.exports = Upload;