const { Router } = require('express');
const { uploadController } = require('../controllers/upload');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({storage})

const route = Router();

route.post('/', upload.array('', 2), uploadController);

module.exports = route
