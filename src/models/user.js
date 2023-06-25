const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullName:{type:String, required:true},
    username:{type: String, required:isDoc},
    password: {type: String, required:isDoc},
    maxFrr:{type: String, required:isPatient, default:0},
    minFrr:{type: String, required:isPatient, default:0},
    bedNum: {type: String, required:isPatient},
    roomum: {type: String, required: isPatient},
    age: {type: String, required: isPatient},
    booldType: {type: String, required: isPatient},
    emgPhoneNum:{type:String, required: isPatient},
    mobileNum: {type:String, required: isPatient},
    fluidType: {type:String, required: isPatient},
    address: {type: String,required: isPatient},
    gender: {type: String, required: isPatient},
    sensorData : {type: String, required: isPatient, default:0},
    density: {type: String, required: isPatient, default:0},
    volume: {type: String, required: isPatient, default:0},
    volumeThreshold:{type: String, required:isPatient, default:0},
    density: {type: String, required: isPatient, default:0},
    roles: {type:[String], default:["patient"]},
    status:{type: Boolean, default:false},
    addedBy:{type: mongoose.Schema.Types.ObjectId, ref:"User", default:null}
  },
  {
    timestamps: true,
  }
);

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