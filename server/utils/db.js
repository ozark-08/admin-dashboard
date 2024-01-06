const mongoose = require("mongoose")

const URI = process.env.MONGODB_URI
// mongoose.connect(uri)

const connectdb = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connection Succcessful")
    } catch (error) {
        console.log(error)
       console.error("database connection failed") 
       process.exit(0)
    }
}

module.exports = connectdb