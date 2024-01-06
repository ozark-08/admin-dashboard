/*controllers store the endpoint logic and then can be exported 
to be used by the routers that will actually route the endpoints*/

const User = require("../models/user-model")
const bcrypt = require("bcrypt")

//home page logic || admin page logic
const home = async(req,res)=>{
    try {
        const users = await User.find({},{password:0}) 
        console.log(users)
        if(!users || users.length===0){
         return res.status(404).json({message : "No Users Found"});
        }
        return res.status(200).json(users)
     } catch (error) {
        next(error)
     }

    // try {
    //     res
    //     .status(200)
    //     .send("creating admin dashboard here using router and controllers.")
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).send({msg:"page not found"})
    // }
}


//register page logic
const register = async(req,res)=>{
    try {
        console.log(req.body)
        const{username,email,password,phone,gender,city,state,hearAboutUs} = req.body
        const userExits = await User.findOne({email:email})

        //if email exists then do not create yet another entry in the db
        if(userExits){
            return res.status(400).json({msg:"email already exists"})
        }

        /* // hashing the password if user does not exist
        const saltRound = 10;
        const hash_password = await bcrypt.hash(password,saltRound)
        const userCreated = await User.create({username,email,password:hash_password,phone,gender,city,state,hearAboutUs})*/
        const userCreated = await User.create({
            username,
            email,
            password,
            phone,
            gender,
            city,
            state,
            hearAboutUs
        })
        res
        .status(201)
        .json({
            message: "registration successful", 
            token: await userCreated.generateToken(),
            userId : userCreated._id.toString()
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("internal server error")
    }
}

//login page logic
const login = async(req,res)=>{
    try {
        const{email,password} = req.body
        const userExist = await User.findOne({email})
        console.log(userExist)

        if(!userExist){
            return res.status(400).json({message :"Invalid credentials"})
        }

        //if user exist -> compare pwd
        const ispwdValid = await userExist.compare(password)
        if(ispwdValid){
        res
        .status(200)
        .json({
            message: "Login successful", 
            token: await userExist.generateToken(),
            userId : userExist._id.toString()
        })
        }else{
            res.status(401).json({message:"Invalid email or password"})
        }
    } catch (error) {
        res.status(500).jsone("Internal server error")
    }
}

//single user logic - adminBoard
const getUserById = async(req,res,next) =>{
    try {
       const id = req.params.id //id passed in the url
       const singleUserData = await User.findOne({_id:id},{password:0})
       console.log(singleUserData)
    //    const singleUserData = await User.findOne({_id:id},{password:0})
       return res.status(200).json(singleUserData)
    } catch (error) {
        next(error);
    }
}

const updateUserById = async(req,res,next)=>{
    try {
        const id = req.params.id
        const updatedUserData = req.body
        console.log(updatedUserData)
        const updatedUser = await User.updateOne({_id:id},{
            $set:updatedUserData,
        })
        return res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

//delete user logic - adminBoard
const deleteUserById = async(req,res) =>{
    try {
       const id = req.params.id 
       await User.deleteOne({_id:id})
       return res.status(200).json({message : "User deleted Succesfully"})
    } catch (error) {
        next(error);
    }

}

module.exports = {home, register,login,deleteUserById,getUserById,updateUserById}