const log4 = require("log4js");
const logger = log4.getLogger("image.js");
logger.level = "all";

function getFilePath(file){
    const filePath = file.path;
    const fileSplit = filePath.split("/");
    return `${fileSplit[1]}/${fileSplit[2]}`;
}

module.exports = {
    getFilePath,
}