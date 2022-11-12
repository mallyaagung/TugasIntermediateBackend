const multer = require('multer')
const createError = require('http-errors')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.png')
    }
})

const fileFiltered = (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length']);
    try {
        if (fileSize > 2048 * 1000) throw ('Image size is more than 2MB!')
        if ((!file.originalname.match(/\.(jpg|jpeg|png)$/))) throw ('You can only upload .png or .jpg file')
        cb(null, true);
    } catch (error) {
        cb(new createError(400, error))
    }
}


const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 2048 * 1000
    },
    fileFilter: fileFiltered
})



module.exports = upload