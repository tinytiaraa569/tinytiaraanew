const mongoose  =require('mongoose')


const eventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true ,'Please Enter event Product Name']
    },
    skuid:{
        type:String,
        required:[true ,'Please Enter event Product sku id']
    },
    description:{
        type:String,
        required:[true ,'Please Enter event Product Description']
    },
    category:{
        type:String,
        required:[true ,'Please Enter event Product category']
    },
    subcategory:{
        type:String,
        required:[true ,'Please Enter event Product Subcategory']
    },
    tags:{
        type:String,
        required:[true ,'Please Enter event Product tags']
    },
    originalPrice:{
        type:Number,
        
    },
    discountPrice:{
        type:Number,
        required:[true ,'Please Enter event Product Price']
    },
    stock:{
        type:Number,
        required:[true ,'Please Enter event Product Stocks']
    },
    images:[
        {
            type:String
        }
    ],
    shopId:{
        type:String,
        required:true
    },
    sold_out:{
        type:Number,
        default: 0,
    },
      CreatedAt:{
        type:Date,
        default:Date.now()
    },
    start_Date :{
        type:Date,
        required:true
    },
    finish_Date :{
        type:Date,
        required:true
    },
    status:{
        type:String,
        default:"Running"
    }
})

module.exports = mongoose.model("Event",eventSchema)