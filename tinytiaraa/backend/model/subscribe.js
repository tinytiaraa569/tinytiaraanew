const mongoose  =require('mongoose')


const SubscribeSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:[true ,'Please Enter Your Email']
    },
    phonenumber:{
        type:Number,
        required:[true ,'Please Enter Your Number']
    },
      CreatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Subscribe",SubscribeSchema)