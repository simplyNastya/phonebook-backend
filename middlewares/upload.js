const multer = require('multer')
const path = require('path')

const tempDir = path.resolve('tmp')

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniquePrefix}_${file.originalname}`)
    }
})

const filetypeWhitelist = ['image/jpeg', 'image/png']

const fileFilter = (req, file, cb) => {
    const { mimetype } = file
    if (filetypeWhitelist.includes(mimetype)) {
        cb(null, true)
    } else {
        cb({message: 'Invalid format. Allow only .png or .jpg'}, false)
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter,
})

module.exports = upload;