//this module is storing the route path which will be exported to the main file -> server.js that will actually route 
const express = require("express");
const router = express.Router()
// const {home,register} = require("../controllers/auth-controller") //importing auth-controller -> home,register routes
const authControllers = require("../controllers/auth-controller") 
router.route("/").get(authControllers.home)
router.route("/:id").get(authControllers.getUserById)
router.route("/update/:id").patch(authControllers.updateUserById)
router.route("/delete/:id").delete(authControllers.deleteUserById)
router.route("/register").post(authControllers.register)
router.route("/login").post(authControllers.login)

// router.get("/",(req,res)=>{
//     res.status(200).send("creating admin dashboard here using router.")
// })

module.exports = router;