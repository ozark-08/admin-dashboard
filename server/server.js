// this is the file which is listened by the localhost
require("dotenv").config()
const express = require("express"); //importing express
const cors = require("cors")
const app = express()
const router = require("./router/auth-router") //importing auth-router.js
const connectdb = require("./utils/db")

//handling cors: connecting with the frontend
const corsOptions = {
    origin:"http://localhost:5173",
    methods:"GET,POST,PATCH,PUT,DELETE,HEAD",
    credentials : true,
}
app.use(cors(corsOptions))


app.use(express.json())
app.use("/api/auth", router) //redirected to auth-router.js

const port = 3000



//if connection starts with db then only start the server
connectdb().then(() =>{
    app.listen(port ,()=>{
        console.log(`Server is listening on port: ${port}`)
    })
})

