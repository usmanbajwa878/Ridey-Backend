const {
    USER_EXISTS,
    USER_NOT_EXISTS,
    USER_SUCCESS_LOGIN,
    USER_SUCCESS_SIGNUP,
    SUCCESS_FALSE,
    SUCCESS_TRUE,
} = require('../Constants/Message');
const {
    FAILED,
    OK,
    UN_AUTH,
    SUCCESS
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { fileUpload } = require('../utils/fileUpload');





exports.fileUpload = async (req, res) => {
  
    try {
        const result = await fileUpload(req, res);
    }
    catch (error) {
        console.log(error)

    }
}



