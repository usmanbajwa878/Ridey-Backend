const express = require('express');
const router = express.Router();
const { fileUpload } = require('../Routes/FileUpload');
const { FILE_UPLOAD_UPLOAD } = require('../Constants/Routes');
const multer = require('../utils/multer');


exports.FILE_UPLOAD = router.post(FILE_UPLOAD_UPLOAD,
    multer.single('file'),
     fileUpload);

