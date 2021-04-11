const Request = require('../Models/Request/Request.js');
const mongoose = require('mongoose');


exports.createReqObject = (req) => {
    const request = new Request({
        requestId: mongoose.Types.ObjectId(),
        userId: req.body.userId,
        distance: req.body.distance,
        status: req.body.status,
        source: req.body.source,
        destination: req.body.destination,
        date: req.body.date,
        user: req.body.user,
    });
    return request;
}

exports.deleteRequest = async (id) => {
    let status = false;
    console.log("deleteId IN REQUEST",id)
    const data = await Request.findOneAndDelete({ requestId: id });
   
    status = true;
    return status;
}


exports.findRequest = async (req) => {
    let isExists = false;
    const data = await Request.find({ userId: req.body.userId });
    if (data.length > 0) {
        isExists = true;
    }
    return { isExists, data };
}

exports.getAllRequests = async (req) => {
    let isExists = false;
    const data = await Request.find({});
    if (data.length > 0) {
        isExists = true;
    }
    return { isExists, data };
}