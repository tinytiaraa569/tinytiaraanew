const mongoose  =require('mongoose')


const ContactusSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true ,'Please Enter Your Name']
    },
    email:{
        type:String,
        required:[true ,'Please Enter Your Email']
    },
    phonenumber:{
        type:String,
        required:[true ,'Please Enter Your Phonenumber']
    },
    message:{
        type:String,
        required:[true ,'Please Enter Your Message']
    },
      CreatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Contactus",ContactusSchema)