const {
    SUCCESS_FALSE,
    SUCCESS_TRUE,
    TRIP_ADDED_SUCCESS,
    TRIP_ADDED_FAILED,
    TRIP_FOUND_SUCCESS,
    TRIP_EMPTY,
    REQUEST_EMPTY,
    TRIP_COMPLETED_SUCCESS,
    TRIP_UPDATED_SUCCESS,
    TRIP_UPDATED_FAILED
} = require('../Constants/Message');

const {
    FAILED,
    OK,
    SUCCESS,
} = require('../Constants/StatusCode');
const { generateMessage, } = require('../utils/generateMessage');
const { createTripSchema, getDriverTrips, updateTripStatus, getUserTrips, getAllTrips, makeTripComplete,getSpecficTrip } = require('../utils/Trip');
const { createReqObject, findRequest, deleteRequest } = require('../utils/Request');
const { MakeDriverOffline } = require('../utils/Driver');




exports.AddTrip = async (req, res) => {
    try {
        const { isExists, data } = await findRequest(req);
       console.log("isExists",isExists)
        if (isExists) {
            const tripObj = await createTripSchema(req, data[0]);
         
            await tripObj.save();
           const deleteStatus =  await deleteRequest(data[0].requestId);
           console.log("deleteStatus",deleteStatus)
           await MakeDriverOffline(req.body.driverId);
            return res.status(OK).json(generateMessage(TRIP_ADDED_SUCCESS, OK, SUCCESS_TRUE, tripObj));
        } else {
            return res.status(FAILED).json(generateMessage(
                REQUEST_EMPTY,
                FAILED,
                SUCCESS_FALSE,
                null
            ));
        }
    }
    catch (error) {
        console.log(error)
        return res.status(FAILED).json(generateMessage(
            TRIP_ADDED_FAILED,
            FAILED,
            SUCCESS_FALSE,
            null
        ));
    }
}



exports.CompleteTrip = async (req, res) => {
    console.log(req.body)
    try {
       const response =  await makeTripComplete(req);
       console.log(response)
        if (response.nModified === 1) {
            return res.status(OK).json(generateMessage(TRIP_COMPLETED_SUCCESS, OK, SUCCESS_TRUE, null));
        } else {
            return res.status(FAILED).json(generateMessage(
                TRIP_UPDATED_FAILED,
                FAILED,
                SUCCESS_FALSE,
                null
            ));
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(
            TRIP_UPDATED_FAILED,
            FAILED,
            SUCCESS_FALSE,
            null
        ));
    }
}


exports.AcceptTrip = async (req, res) => {
    console.log(req.body)
    try {
       const response =  await updateTripStatus(req);
       console.log(response)
        if (response.nModified === 1) {
            return res.status(OK).json(generateMessage(TRIP_UPDATED_SUCCESS, OK, SUCCESS_TRUE, null));
        } else {
            return res.status(FAILED).json(generateMessage(
                TRIP_UPDATED_FAILED,
                FAILED,
                SUCCESS_FALSE,
                null
            ));
        }
    }
    catch (error) {
        return res.status(FAILED).json(generateMessage(
            TRIP_UPDATED_FAILED,
            FAILED,
            SUCCESS_FALSE,
            null
        ));
    }
}

exports.GetSpecficTrip =async (req,res)=>{
    const result = await getSpecficTrip(req);
    if (result) {
        return res.status(OK).json(generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, result))
    } else {
        return res.status(FAILED).json(generateMessage(TRIP_EMPTY, FAILED, SUCCESS_FALSE, null))
    }
}


exports.getDriverTrips = async (req, res) => {
    console.log("called")
    const result = await getDriverTrips(req);
    const { data } = result;
    console.log("data", data)
    if (data) {
        return res.status(OK).json(generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data))
    } else {
        return res.status(FAILED).json(generateMessage(TRIP_EMPTY, FAILED, SUCCESS_FALSE, null))
    }
}

exports.getUserTrips = async (req, res) => {
    const result = await getUserTrips(req);
    const { data } = result;
    if (data) {
        return res.status(OK).json(generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data))
    } else {
        return res.status(FAILED).json(generateMessage(TRIP_EMPTY, FAILED, SUCCESS_FALSE, null))
    }
}
exports.getAllTrips = async (req, res) => {
    const result = await getAllTrips(req);
    const { data } = result;
    if (data) {
        return res.status(OK).json(generateMessage(TRIP_FOUND_SUCCESS, SUCCESS, SUCCESS_TRUE, data))
    } else {
        return res.status(FAILED).json(generateMessage(TRIP_EMPTY, FAILED, SUCCESS_FALSE, null))
    }
}