const mongoose  =require('mongoose')


const TtclubSchema = new mongoose.Schema({
    
    email:{
        type:String,
        required:[true ,'Please Enter Your Email']
    },
      CreatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Ttclub",TtclubSchema)