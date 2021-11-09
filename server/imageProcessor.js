// TODO Write and export a function to perform 
//   the required image processing task(s)
const sharp = require("sharp");
const fs = require("fs");
const ApiError = require("./ApiError");


async function imageProcessor({uni, color, size}) {
    let path = __dirname + "/../assets/" + uni;
    size = parseInt(size);
    try{
        fs.existsSync(path);
    } catch(err) {
        throw new ApiError(400, "We do not have logos for this university");
    }

    path += "/" + color + ".png";
    
    try{
        fs.existsSync(path);
    } catch(err) {
        throw new ApiError(400, "We do not have a logo in this color.");
    }

    if (size < 20 || size > 500) {
        throw new ApiError(400, "We can not support this image size.");
    }

    //open file
    const buffer = sharp(path)
        .resize(size)
        .toBuffer()
        .then()
        .catch(() => { throw new ApiError(400, "We can not support " + uni + "/" + color + "/" + size);});
    return buffer;
}

module.exports = imageProcessor;