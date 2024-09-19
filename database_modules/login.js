const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const student_login_data = new mongoose.Schema({
    username:{
        type: String,
       
    },
    age:{
        type: Number
    },
    class:{
        type: String
    },
    email:{
        type: String,
        unique:true
    },
    userType:{
        type: String
    },
    password:{
        type:String
    },
    country:{
        type:String,
        required:true,
    },
    otp:{
        type: String,
    },
    isVerified:{
        type: Boolean
    },
    lastTimeOtp:{
        type: Date
    },
    message:[{
        person:{
            id:{
                type:String
            },
            name:{
                type:String
            },
            messages:[{
                you:{
                    type: String
                },
                him:{
                    type: String
                }

        }]
        }
}]
});
student_login_data.pre("save",async function(){
    this.password = await bcrypt.hash(this.password, 10);
    this.otp = await bcrypt.hash(this.otp, 10);
})
const student_login = new mongoose.model("student_login",student_login_data);
module.exports = student_login;