const { FILE_UPLOAD_FAILED, FILE_UPLOAD_SUCCESS, SUCCESS_TRUE, SUCCESS_FALSE } = require('../Constants/Message');
const { FAILED, SUCCESS, } = require('../Constants/StatusCode');
const { generateMessage } = require('./generateMessage');
const Streamifier = require('streamifier');
const Cloudinary = require('cloudinary');


Cloudinary.v2.config({
    cloud_name: 'dx8xcafmu',
    api_key: '754631223834792',
    api_secret: 'txryzLg-q8AE9c5nr7_1D9h1140'

});

//USING BUFFER

exports.fileUpload = async (req, res) => {
    const uniqueName = new Date();
    console.log("fileData",req.file);
    const image = Cloudinary.v2.uploader.upload_stream({
        public_id: `files/${uniqueName}`,
        tags: `files`,
        folder: 'files'
    }, 
    function (err, result) {
        if (err) {
            console.log(err)
            return res.status(FAILED).json(generateMessage(FILE_UPLOAD_FAILED, FAILED, SUCCESS_FALSE, null));
        }
        else {
            const file = {
                Name: result.original_filename,
                Size: result.bytes / 1000,
                Date: result.created_at,
                Url: result.url
            }

            return res.status(SUCCESS).json(generateMessage(FILE_UPLOAD_SUCCESS, SUCCESS, SUCCESS_TRUE, file));
        }
    }
    );
    Streamifier.createReadStream(req.file.buffer).pipe(image)
}


