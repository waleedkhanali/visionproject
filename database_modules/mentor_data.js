const mongoose = require("mongoose");
const mentor_schema = new mongoose.Schema({
    mentor_username:{
        type: String,
        require: true
    },
    mentor_profile:{
        type: String,
        require: true,
        default: "https://i.ibb.co/qMgN46K/download-1.png"
    },
    mentor_email:{
        type: String,
        require: true,
        unique:true
    },
    mentor_verified:{
        type: String,
        require: true
    },
    mentor_document:{
        type: String,
        require: true
    },
    mentor_education:{
        type: String,
        require: true
    },
    mentor_university:{
        type: String,
        require: true
    },
    mentor_work:{
        type: String,
        require: true
    },
    mentor_id:{
        type: String,
        require: true
    },
    mentor_about:{
        type: String,
        require: true
    },
    mentor_phone:{
        type: String,
        require: true,
        unique:true 
    },
    mentor_experience:{
        type: String,
        require: true
    },
    mentor_attachments:{
        type: String,
        require: true
    },
    mentor_skills:{
        type: String,
        require: true
    },
    mentor_status:{
        type: String,
        default: "unverified"
    }
});
const mentor_info = new mongoose.model("mentor_info",mentor_schema);
module.exports = mentor_info;