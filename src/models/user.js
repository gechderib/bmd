const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName:{type:String, required:true},
    username:{type: String, required:isDoc},
    password: {type: String, required:isDoc},
    frr:{type: String, required:isPatient, default:0},
    bedNum: {type: String, required:isPatient},
    roomum: {type: String, required: isPatient},
    age: {type: String, required: isPatient},
    booldType: {type: String, required: isPatient},
    emgPhoneNum:{type:String, required: isPatient},
    mobileNum: {type:String, required: isPatient},
    fluidType: {type:String, required: isPatient},
    address: {type: String,required: isPatient},
    gender: {type: String, required: isPatient},
    roles: {type:[String], default:["patient"]},
    addedBy:{type: mongoose.Schema.Types.ObjectId, ref:"User", default:null}
  },
  {
    timestamps: true,
  }
);
// "username":"geme",
// "password": "111111",

function isPatient() {
    if(this.roles.includes("patient")){
        return true
    }
    return false
}

function isDoc() {
    if(this.roles.includes("doctor")){
        return true
    }else{
        return false;
    }
}

const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel