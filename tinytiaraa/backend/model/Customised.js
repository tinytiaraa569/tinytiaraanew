const mongoose  =require('mongoose')


const CustomisedSchema = new mongoose.Schema({
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
    budget:{
        type:String,
        // required:[true ,'Please Enter Your budget']
    },
    address:{
        type:String,
        // required:[true ,'Please Enter Your address']
    },
    images:[
        {
            type:String
        }
    ],
      CreatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Customisation",CustomisedSchema)