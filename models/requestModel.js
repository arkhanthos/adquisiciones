const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    requestId: {
        type: String,
        unique: true,
        require: true
    },
    requestMethod: [{
        requestVia: String,
        requestTrackingId: String
    }],
    applicant:[{
        applicant: String,
		applicantRut: String,
		applicantEmail: String,
		applicantPhone: String,
		applicantPosition: String
    }],
    createDate: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    costCenterApplicant: [{
        costCenterCode: Number,
        costCenterName: String 
    }],
    implement:[{
        product: String,
        amount: Number
    }],
    update: [{
        updateDate: String,
        updateUser: String,
        updateState: String,
        updateDescription: String,
        file: String
    }],
    quotation:[{
        provider: String,
        price: Number,
        quotationFile: String
    }]
});

module.exports = mongoose.model("RequestModel", requestSchema);