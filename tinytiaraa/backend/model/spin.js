
const mongoose  =require('mongoose')


const SpinSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
      },
      mobile: {
        type: String,
        required: true,
      },
      couponCode: {
        type: String,
        required: true, // Assuming every user must have a coupon code when submitting
      },
      CreatedAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("Spin",SpinSchema)