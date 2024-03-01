//import
const router=require('express').Router();
const express=require("express");

const userController=require('../controllers/userControllers.js');

const {authGuard,authGuardAdmin, requireSignIn } = require('../middleware/authGuard.js');
const upload=require("../middleware/uploads.js")


//all the routes for the user
router.post('/create', userController.createUser);
router.post('/login',userController.loginUser);

// router.post("/uploadImage", upload, userController.uploadImage);

//get all users
router.get("/get_users",userController.getUsers)

//single user 
router.get("/get_user/:id", userController.getSingleUser)

//update product
router.put("/update_user/:id",authGuard,authGuardAdmin, userController.editProfile)

router.get('/my_profile', authGuard, userController.getMyProfile);

// Update the profile of the logged-in user
router.put('/update_my_profile', authGuard, userController.updateMyProfile);

//Forgot Password
router.post('/forgot-password', userController.forgotPassword);

//Reset Password
router.get('/reset-password/:id/:token', userController.resetPassword)

//New Password 
router.post('/reset-password/:id/:token', userController.setNewPassword)

//export
module.exports=router;