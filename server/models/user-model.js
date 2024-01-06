const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        require:true
    },
    email:{
        type : String,
        require:true
    },
    phone:{
        type : String,
        require:true
    },
    password:{
        type : String,
        require:true
    },
    gender:{
        type : String,
        require:true
    },
    hearAboutUs:{
        type : String,
        require:true
    },
    city:{
        type : String,
        require:true
    },
    state:{
        type : String,
        require:true
    }
})

//using pre-method for pwd hashing. 
//we can salt and for simple hashing, this is method-2
userSchema.pre('save',async function(next){
    // console.log("pre method" , this)
    const user = this;
    if(!user.isModified("password")){next();}
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound)
        user.password = hash_password
    } catch (error) {
        next(error)
    }
})

userSchema.methods.compare = async function(password){
   return  bcrypt.compare(password,this.password)
}

//json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
        {
            userId: this._id.toString(),
            email: this.email

        },
        process.env.JWT_SECRET_KEY,{expiresIn:"30d"}
        )
    } catch (error) {
        console.error(error)
    }
}


const User = new mongoose.model("User",userSchema)
module.exports = User