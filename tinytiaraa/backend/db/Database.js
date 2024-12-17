// const mongoose = require('mongoose')

// const connectDatabase = () =>{
//     mongoose.connect(process.env.DB_URL,{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     }).then((data)=>{
//         console.log(`Mongodb connected with server:${data.connection.host}`)

//     })
// }

// module.exports = connectDatabase;

const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL, {
        // Optional mongoose connection options
        // Remove useNewUrlParser and useUnifiedTopology
    }).then((data) => {
        console.log(`MongoDB connected to server: ${data.connection.host}`);
    }).catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });
};

module.exports = connectDatabase;